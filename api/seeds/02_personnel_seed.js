/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personnel').del()
  await knex('personnel').insert([
    {id: 6681492806, first_name: 'Jeff', last_name: 'Noland', rank: 'SGT', mos: '35G', email: 'jnol.mil@mail.mil', status: 'TDY', location: {"city_base": "Fort Bragg", "country": "USA"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 4},
    {id: 3019335596, first_name: 'Riyaad', last_name: 'Mohamed', rank: 'SSG', mos: '35T', email: 'rmoh.mil@mail.mil', status: 'TDY', location: {"city_base": "Fort Bragg", "country": "USA"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 2},
    {id: 4326311559, first_name: 'Katrina', last_name: 'Hill', rank: 'CW2', mos: '350G', email: 'khil.mil@mail.mil', status: 'TDY', location: {"city_base": "Fort Bragg", "country": "USA"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 3},
    {id: 7833432990, first_name: 'Justin', last_name: 'King', rank: 'CW2', mos: '351L', email: 'jkin.mil@mail.mil', status: 'TDY', location: {"city_base": "Fort Bragg", "country": "USA"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 4},
    {id: 9743601646, first_name: 'Richard', last_name: 'Creager', rank: 'PV2', mos: '35F', email: 'rcre.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-04-15', deployment_end: '2024-04-15', is_archived: false, team_id: 5},
    {id: 8830137804, first_name: 'John', last_name: 'Smith', rank: 'CPT', mos: '35D', email: 'jsmi.mil@mail.mil', status: 'Leave', location: {"city_base": "Fort Gordon", "country": "USA"}, deployment_start: '2023-04-15', deployment_end: '2024-04-15', is_archived: false, team_id: 6},
    {id: 7836607649, first_name: 'Jacob', last_name: 'Henderson', rank: 'SGT', mos: '35M', email: 'jhen.mil@mail.mil', status: 'Other', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-04-15', deployment_end: '2023-06-01', is_archived: false, team_id: 7},
    {id: 7784849638, first_name: 'Sarah', last_name: 'Jennings', rank: 'SPC', mos: '35F', email: 'sjen.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2024-01-15', is_archived: false, team_id: 8},
    {id: 6080768420, first_name: 'Chris', last_name: 'Bryant', rank: 'WO1', mos: '353T', email: 'cbry.mil@mail.mil', status: 'TDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 9},
    {id: 8647230346, first_name: 'Rachel', last_name: 'Jones', rank: 'LTC', mos: '35D', email: 'rjon.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2024-01-15', is_archived: false, team_id: 10},
    {id: 3568531311, first_name: 'Rebecca', last_name: 'Thompson', rank: 'PFC', mos: '35N', email: 'rtho.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2024-01-15', is_archived: false, team_id: 11},
    {id: 2205511447, first_name: 'Tyler', last_name: 'Yancey', rank: 'SFC', mos: '35G', email: 'tyan.mil@mail.mil', status: 'PDY', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, deployment_start: '2023-02-01', deployment_end: '2024-02-01', is_archived: false, team_id: 12},
    {id: 6526895698, first_name: 'Robin', last_name: 'Dawson', rank: 'MSG', mos: '35X', email: 'rdaw.mil@mail.mil', status: 'PDY', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, deployment_start: '2023-02-01', deployment_end: '2024-02-01', is_archived: false, team_id: 13},
    {id: 3972436400, first_name: 'George', last_name: 'Lockhart', rank: 'PV2', mos: '35F', email: 'gloc.mil@mail.mil', status: 'PDY', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, deployment_start: '2023-06-22', deployment_end: '2023-06-01', is_archived: false, team_id: 14},
    {id: 7111211194, first_name: 'Harry', last_name: 'Washington', rank: 'SGT', mos: '35S', email: 'hwas.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-06-22', deployment_end: '2023-06-01', is_archived: false, team_id: 15},
    {id: 5924199454, first_name: 'Ashley', last_name: 'Dawn', rank: 'CW3', mos: '351M', email: 'adaw.mil@mail.mil', status: 'Other', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-06-22', deployment_end: '2023-06-01', is_archived: false, team_id: 16},
    {id: 9249065476, first_name: 'Amber', last_name: 'Scheel', rank: 'PV2', mos: '35P', email: 'asch.mil@mail.mil', status: 'Leave', location: {"city_base": "Fort Gordon", "country": "USA"}, deployment_start: '2023-06-22', deployment_end: '2023-06-01', is_archived: false, team_id: 7},
    {id: 6949078998, first_name: 'Delores', last_name: 'Saban', rank: '1LT', mos: '35D', email: 'dsab.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-06-22', deployment_end: '2023-08-01', is_archived: false, team_id: 17},
    {id: 4986081961, first_name: 'Mark', last_name: 'Whitson', rank: 'SPC', mos: '35M', email: 'mwhi.mil@mail.mil', status: 'PDY', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, deployment_start: '2023-06-22', deployment_end: '2023-08-01', is_archived: false, team_id: 3},
    {id: 9280888019, first_name: 'Harold', last_name: 'Bedford', rank: '2LT', mos: '35D', email: 'hbed.mil@mail.mil', status: 'PDY', location: {"city_base": "King Abdullah II Air Base", "country": "Jordan"}, deployment_start: '2023-06-22', deployment_end: '2023-08-01', is_archived: false, team_id: 4},
    {id: 4882967412, first_name: 'Lexie', last_name: 'Thiel', rank: 'CPL', mos: '35T', email: 'lthi.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-01', is_archived: false, team_id: 5},
    {id: 5194045106, first_name: 'Taya', last_name: 'Gutkowski', rank: 'SGT', mos: '35N', email: 'tgut.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 6},
    {id: 6728214006, first_name: 'Ismael', last_name: 'Friesen', rank: 'MAJ', mos: '35D', email: 'ifri.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-01', is_archived: false, team_id: 7},
    {id: 5157189093, first_name: 'Deshaun', last_name: 'Boyer', rank: 'SPC', mos: '35N', email: 'dboy.mil@mail.mil', status: 'TDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 8},
    {id: 1150074693, first_name: 'Willa', last_name: 'Gulgowski', rank: 'PFC', mos: '35G', email: 'wgul.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 9},
    {id: 3196520460, first_name: 'Myrtle', last_name: 'McGlynn', rank: 'SFC', mos: '35F', email: 'mmcg.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 10},
    {id: 1228374693, first_name: 'Erika', last_name: 'Denesik', rank: 'MSG', mos: '35X', email: 'eden.mil@mail.mil', status: 'Other', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 11},
    {id: 3532707026, first_name: 'Zella', last_name: 'Rosenbaum', rank: 'CSM', mos: '35X', email: 'zros.mil@mail.mil', status: 'Leave', location: {"city_base": "Fort Gordon", "country": "USA"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 12},
    {id: 4346117557, first_name: 'Damaris', last_name: 'Cole', rank: 'SFC', mos: '35M', email: 'dcol.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 13},
    {id: 8755364380, first_name: 'Lea', last_name: 'Mraz', rank: 'SSG', mos: '35T', email: 'lmra.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 14},
    {id: 5157482093, first_name: 'Brycen', last_name: 'Farrell', rank: '1SG', mos: '35X', email: 'bfar.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 15},
    {id: 1158311193, first_name: 'Mandy', last_name: 'Hall', rank: 'SPC', mos: '35S', email: 'mhal.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 16},
    {id: 1157374693, first_name: 'Gino', last_name: 'Johnson', rank: 'PFC', mos: '35S', email: 'gjoh.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 17},
    {id: 5157489093, first_name: 'Samantha', last_name: 'Douglas', rank: 'CPT', mos: '35D', email: 'sdou.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 2},
    {id: 2201503713, first_name: 'Brycen', last_name: 'Trotter', rank: 'SFC', mos: '35G', email: 'btro.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 3},
    {id: 2281511113, first_name: 'Noemy', last_name: 'Aims', rank: 'SSG', mos: '35F', email: 'naim.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Partriot Army Base", "country": "Kuwait"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 4},
    {id: 8206419429, first_name: 'Reilly', last_name: 'Lupi', rank: 'CW4', mos: '351l', email: 'rlup.mil@mail.mil', status: 'Other', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 5},
    {id: 4698879002, first_name: 'Deonte', last_name: 'Mosley', rank: 'SSG', mos: '35P', email: 'dmos.mil@mail.mil', status: 'Leave', location: {"city_base": "Fort Gordon", "country": "USA"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 6},
    {id: 8236419425, first_name: 'Ernesto', last_name: 'Eady', rank: 'SFC', mos: '35M', email: 'eead.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 7},
    {id: 8226419429, first_name: 'Franklin', last_name: 'Wright', rank: 'CPL', mos: '35M', email: 'fwri.mil@mail.mil', status: 'TDY', location: {"city_base": "H-4 Air Base", "country": "Kuwait"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 8},
    {id: 8661997322, first_name: 'Theodore', last_name: 'Williams', rank: 'WO1', mos: '352S', email: 'twil.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-03-07', deployment_end: '2023-07-12', is_archived: false, team_id: 9},
    {id: 4098879292, first_name: 'Fernando', last_name: 'Lee', rank: 'CPL', mos: '35M', email: 'flee.mil@mail.mil', status: 'PDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-07-12', is_archived: false, team_id: 10},
    {id: 8226409429, first_name: 'William', last_name: 'Langston', rank: 'PFC', mos: '35T', email: 'wlan.mil@mail.mil', status: 'TDY', location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 12},
    {id: 4968793536, first_name: 'Lara', last_name: 'Gilmore', rank: 'SPC', mos: '35G', email: 'lgil.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 13},
    {id: 4962794236, first_name: 'Katie', last_name: 'Jonston', rank: 'SPC', mos: '35N', email: 'kjon.mil@mail.mil', status: 'Other', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-06-01', is_archived: false, team_id: 14},
    {id: 4698870292, first_name: 'Kevin', last_name: 'Hillburd', rank: 'SGT', mos: '35M', email: 'khil2.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-02', is_archived: false, team_id: 15},
    {id: 1158387693, first_name: 'Steve', last_name: 'Wankson', rank: 'PFC', mos: '35F', email: 'swan.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-02', is_archived: false, team_id: 16},
    {id: 4928794536, first_name: 'Stacy', last_name: 'Sunny', rank: '1LT', mos: '35D', email: 'ssun.mil@mail.mil', status: 'PDY',  location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-02', is_archived: false, team_id: 17},
    {id: 6834452905, first_name: 'Christine', last_name: 'Jones', rank: 'CPT', mos: '35D', email: 'cjon.mil@mail.mil', status: 'PDY',  location: {"city_base": "Camp Arifjan", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-02', is_archived: false, team_id: 2},
    {id: 3757582574, first_name: 'Nick', last_name: 'Henry', rank: '1SG', mos: '35X', email: 'nhen.mil@mail.mil', status: 'PDY', location: {"city_base": "Air Base Ali Al Salem", "country": "Kuwait"}, deployment_start: '2023-01-15', deployment_end: '2023-08-02', is_archived: false, team_id: 3}
  ]);
};