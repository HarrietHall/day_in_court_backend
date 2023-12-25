const cors = require("cors");
const express = require("express");
const app = express();
const db = require("./db/index");
const seed = require("./db/seeds/seed");
app.use(cors());

// const {
//   handlePsqlErrors,
//   handleCustomErrors,
//   handleServerErrors,
// } = require("./errors/errors");

const {
  getEndpointData,
  // getAllCourts,
  getCourtByNumber,
  getAllUsers,
  getUserById,
  getAllLawyers,
  getLawyersById,
  getAllCases,
  getCaseById,
  postCourt,
  postUser,
  postCase,
  postLawyer,
  patchCourt,
  deleteCourt,
} = require("./controllers/app.controllers");

app.use(express.json());

app.get("/api", getEndpointData);
// app.get("/api/courts", getAllCourts);
app.get("/api/courts/:room_number", getCourtByNumber);
app.get("/api/users", getAllUsers);
app.get("/api/users/:user_id", getUserById);
app.get("/api/lawyers", getAllLawyers);
app.get("/api/lawyers/lawyers_id", getLawyersById);
app.get("/api/cases", getAllCases),
  app.get("/api/cases/:case_id", getCaseById),
  app.post("/api/court/:room_number", postCourt);
app.post("/api/users/:user_id", postUser);
app.post("/api/cases/:case_id", postCase);
app.post("/api/lawyers/:lawyer_id", postLawyer);
app.patch("/api/court/:room_number", patchCourt);

app.delete("/api/courts/:room_number", deleteCourt);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
// app.use(handlePsqlErrors);
// app.use(handleCustomErrors);
// app.use(handleServerErrors);

module.exports = app;
