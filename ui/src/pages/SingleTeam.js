import React, {
  useCallback,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { toPoint } from "mgrs";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SingleTeamMap from "../components/SingleTeamMap";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import config from './config'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap-table-next";
import { Pen, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const SingleTeam = () => {
  const ctx = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  const [missions, setMissions] = useState([]);
  const [upcomingMissions, setUpcomingMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  let teamName = ctx.clickedTeam.team_name;
  let teamPersonnelArray = [];
  let teamMissionsArray = [];
  let upcomingMissionsArray = [];
  // scrolls screen to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ctx.clickedTeam]);

  let coordinates = {};
  let zoom;

  useEffect(() => {
    toggleRefresh();
  }, []);

  if (ctx.clickedTeam.location.country === "Kuwait") {
    coordinates = { lat: 29.34562355852184, lng: 47.67637238617149 };
    zoom = 8;
  } else if (ctx.clickedTeam.location.country === "Jordan") {
    coordinates = { lat: 31.00994216931093, lng: 36.6326645727253 };
    zoom = 7;
  } else if (ctx.clickedTeam.location.country === "USA") {
    coordinates = { lat: 33.411867719890346, lng: -82.04860551242295 };
    zoom = 10;
  } else if (ctx.clickedTeam.location.country === "Qatar") {
    coordinates = { lat: 25.3048552165822, lng: 51.20092464221381 };
    zoom = 9;
  } else if (ctx.clickedTeam.location.country === "Iraq") {
    coordinates = { lat: 33.510153781888555, lng: 43.382197021092345 };
    zoom = 6;
  } else if (ctx.clickedTeam.location.country === "Saudi Arabia") {
    coordinates = { lat: 24.309466707622047, lng: 45.79604776134829 };
    zoom = 5;
  } else {
    coordinates = { lat: 48.8566, lng: 2.3522 };
    zoom = 9;
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    let teamMarkersArray = [];
    ctx.dashboard.forEach((mission) => {
      if (mission.team === ctx.clickedTeam.id) {
        ctx.missions.forEach((otherMission) => {
          if (
            otherMission.status !== "Complete" &&
            otherMission.status !== "Cancelled"
          )
            if (mission.title === otherMission.name) {
              if (otherMission.status === "Active") {
                teamMarkersArray.push({
                  id: mission.title,
                  marker_status: "active",
                  lat: mission.coords[1],
                  lng: mission.coords[0],
                });
              }
            }
        });
      }
      ctx.dashboard.forEach((mission) => {
        upcomingMissions.forEach((upcomingMission) => {
          // console.log(mission)
          if (mission.title === upcomingMission.name) {
            teamMarkersArray.push({
              id: mission.title,
              marker_status: "upcoming",
              lat: mission.coords[1],
              lng: mission.coords[0],
            });
          }
        });
      });
    }, ctx.setTeamMarkers(teamMarkersArray));
  }, [ctx.dashboard, ctx.missions]);

  //console.log(ctx.teamMarkers)

  /* calendar tools */
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  // calls Justin's mission fetch function
  useEffect(() => {
    missionsFetch();
  }, []);
  //grabbing calendar data from Missions table and formatting it
  const missionsFetch = async () => {
    setLoading(true);
    let missionCalendarArray = [];
    await fetch (ApiUrl + `/missions`)
      .then((res) => res.json())
      .then((data) =>
        data.map((event) => {
          if (event.team_id === ctx.clickedTeam.id) {
            let startDate = calendarFormat(event.start_date);
            let endDate = calendarFormat(event.end_date);
            let missionCalendarObject = {
              title: event.name,
              start: new Date(startDate.year, startDate.month, startDate.day),
              // the end date must be one day past the desired range as that is the day the event "stops"
              end: new Date(endDate.year, endDate.month, endDate.day + 1),
              coords: toPoint(event.location.mgrs),
              team: event.team_id,
            };
            missionCalendarArray.push(missionCalendarObject);
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
    ctx.setDashboard(missionCalendarArray);
    setLoading(false);
  };
  // the database days are zero based, the Calendar object days are 1 based
  const calendarFormat = (string) => {
    let dateHandler = new Date(string);
    return {
      year: dateHandler.getFullYear(),
      month: dateHandler.getMonth(),
      // add one to the day to convert the format
      day: dateHandler.getDate() + 1,
    };
  };
  /* iterates through the personnel state variable and pushes all personnel that are on the clicked team
to the teamPersonnel array. Then sets the members state variable with that array. Fires when the personnel state variable changes. */
  useEffect(() => {
    ctx.personnel.forEach((person) => {
      if (person.team_name === teamName) {
        teamPersonnelArray.push(person);
      }
      setMembers(teamPersonnelArray);
    });
  }, [ctx.personnel]);
  /* iterates over the missions state variable and pushes missions with the team_id of the clicked team to the teamMissionArray.
Then sets the missions state variable with that array. Fires when the missions state variable changes. */
  useEffect(() => {
    ctx.missions.forEach((mission, index) => {
      if (mission.team_id === ctx.clickedTeam.id) {
        if (mission.status !== "Complete" && mission.status !== "Cancelled") {
          teamMissionsArray.push(mission);
        }
      }
      setMissions(teamMissionsArray);
    });
  }, [ctx.missions, ctx.clickedTeam]);
  //console.log(missions)

  // all this is for the upcoming missions data
  //next 24 hours
  let oneDayDate = new Date();
  oneDayDate.setTime(oneDayDate.getTime() + 86400000);
  //next 48 hours
  let twoDayDate = new Date();
  twoDayDate.setTime(oneDayDate.getTime() + 86400000);
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };
  const formatDate = (date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };
  useEffect(() => {
    ctx.setOneDayDate(formatDate(oneDayDate));
    ctx.setTwoDayDate(formatDate(twoDayDate));
  }, []);
  useEffect(() => {
    missions.forEach((mission, index) => {
      if (
        mission.start_date === ctx.oneDayDate ||
        mission.start_date === ctx.twoDayDate
      ) {
        upcomingMissionsArray.push(mission);
      }
      setUpcomingMissions(upcomingMissionsArray);
    });
  }, [ctx.dashboard]);
  /* renders the personnel list of the members of the clicked team */
  const renderTeamMembers = (member, index) => {
    return (
      <div className="team-members" key={index}>
        {" "}
        {`${member.rank} ${member.last_name}, ${member.first_name} (${member.mos})`}{" "}
      </div>
    );
  };

  /* renders ongoing missions assigned to the clicked team */
  const renderTeamMissions = (mission, index) => {
    if (mission.status === "Active") {
      return (
        <li className="team-active-missions" key={index}>
          <span>
            <Link
              onClick={() => {
                ctx.setClickedMission(mission);
              }}
              className="team-mission-link"
              to={`/missions/${mission.id}`}
            >{`${mission.start_date} - ${mission.name}`}</Link>
          </span>
        </li>
      );
    }
  };

  /* renders upcoming missions assigned to the clicked team */
  const renderUpcomingMissions = (mission, index) => {
    return (
      <li className="team-upcoming-missions" key={index}>
        <span>
          <Link
            onClick={() => {
              ctx.setClickedMission(mission);
            }}
            className="team-mission-link"
            to={`/missions/${mission.id}`}
          >{`${mission.start_date} - ${mission.name}`}</Link>
        </span>
      </li>
    );
  };

  const handleStatusChange = async (event) => {
    let newData = { ...ctx.clickedTeam };
    newData[event.target.id] = event.target.value;
    ctx.setClickedTeam(newData);
    try {
      let response = await fetch(
        (ApiUrl + `/teams/${ctx.clickedTeam.id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      if (response.status !== 201) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
    toggleRefresh();
  };

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  return (
    <>
      <h1 className="team-name-center">{ctx.clickedTeam.team_name}</h1>

      <div className="single-team-container">
        <div className="team-admin-container">
          <div className="team-personnel-status">
            Personnel Status:{" "}
            <Form.Group as={Col} md="4">
              <Form.Select
                className="single-personnel-dropdown"
                md="3"
                id="personnel_status"
                style={{
                  backgroundColor: `${ctx.clickedTeam.personnel_status}`,
                }}
                onChange={(e) => handleStatusChange(e)}
                value={ctx.clickedTeam.personnel_status}
                aria-label="Default select example"
              >
                <option>Green</option>
                <option>Yellow</option>
                <option>Red</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="team-equipment-status">
            Equipment Status:
            <Form.Group as={Col} md="4">
              <Form.Select
                md="3"
                id="equipment_status"
                style={{
                  backgroundColor: `${ctx.clickedTeam.equipment_status}`,
                }}
                onChange={(e) => handleStatusChange(e)}
                value={ctx.clickedTeam.equipment_status || ""}
                aria-label="Default select example"
              >
                <option>Green</option>
                <option>Yellow</option>
                <option>Red</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="team-comms-status">
            Comms Status:
            <Form.Group as={Col} md="4">
              <Form.Select
                md="3"
                id="comms_status"
                style={{ backgroundColor: `${ctx.clickedTeam.comms_status}` }}
                onChange={(e) => handleStatusChange(e)}
                value={ctx.clickedTeam.comms_status || ""}
                aria-label="Default select example"
              >
                <option>Green</option>
                <option>Yellow</option>
                <option>Red</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="team-calendar">
          <Calendar
            localizer={localizer}
            events={ctx.dashboard}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "1fr", width: "1fr" }}
          />
        </div>

        <div className="single-team-mapp">
          <b className="single-map-header">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</b>
          <SingleTeamMap coordinates={coordinates} zoom={zoom} />
        </div>

        <div className="team-personnel-container">
          <h3>Team Personnel</h3>
          {members.length > 0 ? (
            <div className="team-members">
              {[...members].map(renderTeamMembers)}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="team-upcoming-container">
          <h3>Upcoming Missions</h3>
          {upcomingMissions.length > 0 ? (
            <ul className="not-team-missions">
              {[...upcomingMissions].map(renderUpcomingMissions)}
            </ul>
          ) : (
            <div className="none">
              <div></div>
            </div>
          )}
        </div>

        <div className="team-all-missions-container">
          <h3>Ongoing Missions</h3>
          {missions.length > 0 ? (
            <ul>{[...missions].map(renderTeamMissions)}</ul>
          ) : (
            <div className="none">
              <div></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleTeam;
