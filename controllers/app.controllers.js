const {
  selectAllCourts,
  selectCourtByNumber,
  selectAllUsers,
  selectUserById,
  selectAllLawyers,
  selectLawyerById,
  selectAllCases,
  selectCaseById,
  insertCourt,
  insertUser,
  insertCase,
  insertLawyer,
  updateCourt,
  removeCourt,
} = require();

exports.getEndpointData = (req, res, next) => {};

// exports.getAllCourts = (req, res, next) => {
//     const { room_number } = req.params;
//   selectAllCourts(room_number)
//     .then((court) => {
//       res.status(200).send({ court});
//     })
//     .catch(next);
// };

exports.getCourtByNumber = (req, res, next) => {
    console.log('here')
  const { room_number } = req.params;
  selectCourtByNumber(room_number)
    .then((court) => {
      res.status(200).send({ court });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAllUsers = (req, res, next) => {};

exports.getUserById = (req, res, next) => {};

exports.getAllLawyers = (req, res, next) => {};

exports.getLawyersById = (req, res, next) => {};

exports.getAllCases = (req, res, next) => {};

exports.getCaseById = (req, res, next) => {
  //   const caseId = req.params.caseId;
  //   const caseData = getCaseByIdFromDatabase(caseId);
  //   if (caseData) {
  //     res.status(200).json({ case: caseData });
  //   } else {
  //     res.status(404).json({ error: 'Case not found' });
  //   }
};

exports.postCourt = (req, res, next) => {};
exports.postUser = (req, res, next) => {};
exports.postCase = (req, res, next) => {};
exports.postLawyer = (req, res, next) => {};

exports.patchCourt = (req, res, next) => {};

exports.deleteCourt = (req, res, next) => {};
