const db = require("../db/index.js");

// exports.selectAllCourts = (room_number) => {

//     let query =
//       "SELECT courts.room_number, court.date, court.type, court.usher, court.clerk, court.magistrates, court.cases FROM court LEFT JOIN usher ON court.room_number = users.users_id ";
//       // "SELECT courts.room_number, court.date, court.type, court.usher, court.clerk, court.magistrates, court.cases FROM court LEFT JOIN usher ON court.room_number = users.users_id ";

//     return db.query(query).then(({ rows }) => {
//       if (!rows.length) {
//         return Promise.reject({ status: 404, msg: "Not Found" });
//       }
//       return rows;
//     });
// };

exports.selectCourtByNumber = async (room_number) => {
  let query =
    "SELECT courts.room_number, court.date, court.type, court.usher, court.clerk, court.magistrates, court.cases FROM courts WHERE courts.room_number = $1";

  return db.query(query, [room_number]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows;
  });
};

exports.selectAllUsers = () => {};

exports.selectUserById = () => {};

exports.selectAllLawyers = () => {};

exports.selectLawyerById = () => {};

exports.selectAllCases = () => {};

exports.selectCaseById = () => {
  // const caseId = req.params.caseId;
  // const caseData = getCaseByIdFromDatabase(caseId);
  // if (caseData) {
  //   res.status(200).json({ case: caseData });
  // } else {
  //   res.status(404).json({ error: 'Case not found' });
  // }
};

exports.insertCourt = () => {};
exports.insertUser = () => {};
exports.insertCase = () => {};
exports.insertLawyer = () => {};

exports.updateCourt = () => {};

exports.removeCourt = () => {};
