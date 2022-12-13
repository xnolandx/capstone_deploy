import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import "../styling/personnel.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap-table-next";
import { Pen, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Personnel = () => {
  //Justin's Original Functionality States:
  const ctx = useContext(GlobalContext);

  //TABLE HEADERS
  const columns = [
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#5A5A5A", color: "white" };
      },
      rowStyle: (row, rowIndex) => {
        return { color: "white" };
      },
    },
    {
      dataField: "first_name",
      text: "First Name",
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "rank",
      text: "Rank",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "5%", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "mos",
      text: "MOS",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "70px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },

    {
      dataField: "email",
      text: "Email address",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "300px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "team_name",
      text: "Team",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "location.city_base",
      text: "City",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },

    {
      dataField: "location.country",
      text: "Country",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "deployment_start",
      text: "Deployment Start",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "deployment_end",
      text: "Deployment End",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
    {
      dataField: "id",
      text: "",
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="table-buttons">
            <Button variant="secondary" onClick={() => handleEditShow(cell)}>
              <Pen />
            </Button>
            <Button variant="danger" onClick={() => handleShowWarning(cell)}>
              <Trash3 />
            </Button>
          </div>
        );
      },
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#5A5A5A", color: "white" };
      },
    },
  ];

  ////DATA HANDLERS////

  //Call this to refresh the table
  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  //Open "Personnel" form
  const handleShow = () => ctx.setShow(true);

  //ctx.set state for the "Add personnel" form
  const handleFormData = (event) => {
    let newData = { ...ctx.formData };
    newData[event.target.id] = event.target.value;
    ctx.setFormData(newData);
  };

  //Close "Add personnel" form
  const handleClose = () => {
    ctx.setValidated(false);
    ctx.setShow(false);
    ctx.setFormData({});
  };

  //ctx.set Add State
  const handleAdd = () => {
    ctx.setIsAdd(true);
    ctx.setValidated(false);
    handleShow();
  };

  const formValidate = () => {
    if (Object.keys(ctx.formData).length === 0) {
      return false;
    }
    if (!ctx.formData.first_name || ctx.formData.first_name === "") {
      return false;
    }
    if (!ctx.formData.last_name || ctx.formData.last_name === "") {
      return false;
    }
    if (!ctx.formData.rank || ctx.formData.rank.length !== 3) {
      return false;
    }
    if (
      !ctx.formData.mos ||
      ctx.formData.mos.length < 3 ||
      ctx.formData.mos.length > 4
    ) {
      return false;
    }
    if (!ctx.formData.dep_start) {
      return false;
    }
    if (!ctx.formData.dep_end) {
      return false;
    }
    if (!ctx.formData.contact) {
      return false;
    }
    return true;
  };

  //EDIT existing person within database
  const handleEditShow = async (fieldId) => {
    ctx.setIsAdd(false);
    try {
      let response = await fetch(`http://localhost:8081/personnel/${fieldId}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          let dataSlice = data.map((item) => {
            if (item.dep_start) {
              item.dep_start = item.dep_start.slice(0, 10);
            }
            if (item.dep_end) {
              item.dep_end = item.dep_end.slice(0, 10);
            }
            return item;
          });
          ctx.setFormData(dataSlice[0]);
        });
      handleShow();
    } catch (error) {}
  };

  //ADD new personnel / EDIT existing personnel
  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      if (ctx.form.checkValidity() === false || formValidate() === false) {
        event.preventDefault();
        event.stopPropagation();
        ctx.setValidated(true);
      } else {
        ctx.setValidated(true);
        event.preventDefault();
        let response = await fetch(
          ctx.isAdd
            ? "http://localhost:8081/personnel"
            : `http://localhost:8081/personnel/${ctx.formData.id}`,
          {
            method: ctx.isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ctx.formData),
          }
        );
        ctx.setFormData({});
        console.log("FILTER: " + ctx.filteredData);
        handleClose();
        toggleRefresh();
        if (response.status !== 201) {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE person from database
  const handleDelete = async () => {
    try {
      let response = await fetch(
        `http://localhost:8081/personnel/${ctx.deleteValue}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toggleRefresh();
      handleCloseWarning();
      if (response.status !== 202) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE Confirmation Warnings
  const handleCloseWarning = () => {
    ctx.setShowWarning(false);
    ctx.setDeleteValue("");
  };

  const handleShowWarning = (rowId) => {
    ctx.setShowWarning(true);
    ctx.setDeleteValue(rowId);
  };

  //// Search Functions////

  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    ctx.setSearchTerm(event.target.value);
  };

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.personnelData.forEach((person) => {
      let personnelDataString = JSON.stringify(person);
      if (
        personnelDataString.toLowerCase().includes(ctx.searchTerm.toLowerCase())
      ) {
        if (
          searchArray.filter((item) => {
            return item.id === person.id;
          }).length === 0
        ) {
          searchArray.push(person);
        }
      }
      ctx.setFilteredData(searchArray);
    });
  }, [ctx.searchTerm]);

  return (
    <>
      <h1 className="header-text">Deployed Personnel</h1>
      <div className="nav-buttons">
        <Button className="add-mission" variant="success" onClick={handleAdd}>
          Add Personnel
        </Button>
        <Link className="homepage-button-personnel" to="/">
          <Button variant="primary" className="homepage-button">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="mainsearch">
        <input
          className="text-search-bar"
          type="text"
          placeholder="Search Personnel"
          onChange={(event) => {
            handleSearch(event);
          }}
          value={ctx.searchTerm}
        />
      </div>

      <Modal
        show={ctx.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add/Edit Personnel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={ctx.validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="last_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.last_name}
                  required
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="first_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.first_name}
                  required
                  type="text"
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Rank</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="rank"
                    onChange={(e) => handleFormData(e)}
                    value={ctx.formData.rank}
                    className="formRank"
                    type="text"
                    minLength={"3"}
                    maxLength={"3"}
                    placeholder="RNK"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a three-letter rank.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>MOS</Form.Label>
                <Form.Control
                  id="mos"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.mos}
                  className="formMOS"
                  type="text"
                  minLength={"3"}
                  maxLength={"4"}
                  placeholder="MOS"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter an MOS.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Team #</Form.Label>
                <Form.Select
                  id="team_id"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.team_id}
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  {ctx.teamData.map((team) => {
                    return (
                      <option value={team.id} key={team.id}>
                        {team.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a team #
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  id="contact"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.contact}
                  type="email"
                  placeholder="email@address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment Start Date</Form.Label>
                <Form.Control
                  id="dep_start"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.dep_start}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment Start Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment End Date</Form.Label>
                <Form.Control
                  id="dep_end"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.dep_end}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment End Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="table-div">
        <BootstrapTable
          keyField="id"
          data={ctx.filteredData}
          columns={columns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
        />
      </div>
      <Modal
        show={ctx.showWarning}
        onHide={handleCloseWarning}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>CONFIRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete this entry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              handleDelete();
              ctx.setSearchTerm("");
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Personnel;

// {
//   dataField: "email",
//   text: "Email",
//   formatter: (cell, row, rowIndex, extraData) => (
//     <div className='link-to' key={rowIndex} >
//       <Link to={`/teams/${row['team_id']}`} onClick={() =>
//       ctx.teamData.forEach(team => {
//         if (row['team_id'] === team.id) {
//           ctx.setClickedTeam(team)
//         }
//       })}>
//         {row.team_name}  </Link>
//     </div>
//       ),
//   sort: true,
//   headerStyle: (column, colIndex) => {
//     return { width: "100px", backgroundColor: '#5A5A5A', color:'white' };
//   }
// },

// // async FETCH TEAM TABLE DATA (needed to render team names)
// useEffect(() => {
//   const fetchData = async () => {
//     try{
//       const response = await fetch("http://localhost:8081/teams")
//       const data = await response.json()
//       ctx.setTeamData(data)
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   fetchData()
// }, [ctx.refresh])

// // async FETCH PERSONNEL TABLE DATA
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:8081/personnel")
//       const data = await response.json()
//       let dataSlice = data.map(item => {
//         if (item.dep_start) {
//           item.dep_start = item.dep_start.slice(0, 10);
//         } if (item.dep_end) {
//           item.dep_end = item.dep_end.slice(0, 10);
//         }
//         return item;
//       })
//       ctx.setPersonnelData(dataSlice);
//       // ctx.setFilteredData(dataSlice);
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   fetchData()
// }, [ctx.refresh])

// //Creates new "team_name" column in personnel table being rendered
// useEffect(() => {
//   let withTeamNames = ctx.personnelData.map(person => {
//     ctx.teamData.forEach(team => {
//       if (person.team_id === team.id) {
//         person.team_name = team.name
//       }
//     })
//     return person;
//   })
//   ctx.setFilteredData(withTeamNames)
// }, [ctx.personnelData])