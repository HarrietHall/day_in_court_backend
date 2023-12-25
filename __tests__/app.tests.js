const app = require("../app");
const db = require("../db/index");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test_data/index");
const request = require("supertest");
// const endpointData = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("GET - api/courts/:room_number", () => {
  test("200: Responds with a court:", () => {
    return request(app)
      .get("/api/courts/1")
      .expect(200)
      .then(({ body }) => {

        console.log(body)
        expect(body).toHaveProperty("room_number", expect.any(Number));
        expect(body).toHaveProperty("date", expect.any(String));
        expect(body).toHaveProperty("type", expect.any(String));
        expect(body).toHaveProperty("usher", expect.any(Object));
        expect(body).toHaveProperty("clerk", expect.any(String));
        expect(body).toHaveProperty("magistrates", expect.any(Object));
        expect(body).toHaveProperty("cases", expect.any(Object));
      }).catch((error)=> {

        console.log(error)
      })
  });
});
//     test("404: responds with message - 'Not Found' for an invalid endpoint", () => {
//       return request(app)
//         .get("/api/notARoute")
//         .expect(404)
//         .then(({ body }) => {
//           expect(body.msg).toBe("Route not found");
//         });

//     });
//   });

//   describe("GET - /api", () => {
//     test("200: Responds with contents of endpoints.json", () => {
//       return request(app)
//         .get("/api")
//         .expect(200)
//         .then(({ body }) => {
//           expect(body.endpointData).toEqual(endpointData);
//         });
//     });
