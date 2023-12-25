const format = require("pg-format");
const db = require("../index.js");

const seed = ({ userData, lawyerData, caseData, courtData, chatData }) => {
  return (
    db
      // .query(`DROP TABLE IF EXISTS chats;`)

      // .then(() => {
      // return db
      .query(`DROP TABLE IF EXISTS court_magistrates CASCADE;`)
      .then(() => db.query(`DROP TABLE IF EXISTS court_ushers CASCADE;`))
      .then(() => db.query(`DROP TABLE IF EXISTS court_cases CASCADE;`))
      .then(() => db.query(`DROP TABLE IF EXISTS courts CASCADE;`))
      .then(() => db.query(`DROP TABLE IF EXISTS cases CASCADE;`))
      .then(() => db.query(`DROP TABLE IF EXISTS lawyers CASCADE;`))
      .then(() => db.query(`DROP TABLE IF EXISTS users CASCADE;`))

      .then(() => {
        const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_id VARCHAR PRIMARY KEY,
        name VARCHAR,
        role VARCHAR 
        
      );`);
        const lawyersTablePromise = db.query(`
      CREATE TABLE lawyers (
        lawyer_id VARCHAR PRIMARY KEY,
        name VARCHAR,
        company VARCHAR,
        role VARCHAR 
        
      );`);

        return Promise.all([lawyersTablePromise, usersTablePromise]);
      })

      .then(() => {
        return db.query(`
    CREATE TABLE cases (
      case_id VARCHAR PRIMARY KEY,
      defendant  VARCHAR NOT NULL,
      defense_lawyer VARCHAR NOT NULL,
      prosecution_lawyer VARCHAR NOT NULL,
      witnesses VARCHAR,
      set_start_time TIME NOT NULL,
      actual_start_time TIME NOT NULL,
      end_time TIME NOT NULL
    );`);
      })

      .then(() => {
        return db.query(`
      CREATE TABLE courts (
    room_number SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT NOW(),
        type VARCHAR NOT NULL,
        usher VARCHAR[] NOT NULL REFERENCES users(user_id),
        clerk VARCHAR NOT NULL REFERENCES users(user_id),
        magistrate VARCHAR[] NOT NULL REFERENCES users(user_id),
       cases VARCHAR[] NOT NULL REFERENCES cases(case_id)
    
       `);
      })
      .then(() => {
        return db.query(`CREATE TABLE court_cases (
        court_room_number SERIAL REFERENCES courts(room_number),
        case_id VARCHAR REFERENCES cases(case_id),
        PRIMARY KEY (court_room_number, case_id)
      );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE court_ushers (
            court_room_number SERIAL REFERENCES courts(room_number),
            usher_user_id VARCHAR REFERENCES users(user_id),
            PRIMARY KEY (court_room_number, usher_user_id)
          );`);
      })

      .then(() => {
        return db.query(`CREATE TABLE court_magistrates (
                court_room_number SERIAL REFERENCES courts(room_number),
                magistrate_user_id VARCHAR REFERENCES users(user_id),
                PRIMARY KEY (court_room_number, magistrate_user_id)
              );
              `);
      })
      // .then(() => {
      //   return db.query(`
      //   CREATE TABLE chats (
      //     comment_id SERIAL PRIMARY KEY,
      //   message VARCHAR,
      //  room_number INT REFERENCES courts(room_number) NOT NULL,
      //             created_at TIMESTAMP DEFAULT NOW()
      //   );`);
      // })
      .then(() => {
        const insertUsersQueryStr = format(
          "INSERT INTO users (user_id, name, role) VALUES %L;",
          userData.map(({ user_id, name, role }) => [user_id, name, role])
        );
        const usersPromise = db.query(insertUsersQueryStr);

        const insertLawyersQueryStr = format(
          "INSERT INTO lawyers (lawyer_id, name, company, role) VALUES %L;",
          lawyerData.map(({ lawyer_id, name, company, role }) => [
            lawyer_id,
            name,
            company,
            role,
          ])
        );
        const lawyersPromise = db.query(insertLawyersQueryStr);

        return Promise.all([lawyersPromise, usersPromise]);
      })
      .then(() => {
        const insertCasesQueryStr = format(
          "INSERT INTO cases (case_id, defendant, defense_lawyer, prosecution_lawyer ,witnesses ,set_start_time,actual_start_time, end_time) VALUES %L RETURNING *;",
          caseData.map(
            ({
              case_id,
              defendant,
              defense_lawyer,
              prosecution_lawyer,
              witnesses,
              set_start_time,
              actual_start_time,
              end_time,
            }) => [
              case_id,
              defendant,
              defense_lawyer,
              prosecution_lawyer,
              witnesses,
              set_start_time,
              actual_start_time,
              end_time,
            ]
          )
        );

        return db.query(insertCasesQueryStr);
      })
      .then(() => {
        const insertCourtsQueryStr = format(
          "INSERT INTO courts (room_number, date, type, usher, clerk, magistrate, cases) VALUES %L;",
          courtData.map(
            ({ room_number, date, type, usher, clerk, magistrate, cases }) => [
              room_number,
              date,
              type,
              usher,
              clerk,
              magistrate,
              cases,
            ]
          )
        );
        return db.query(insertCourtsQueryStr);
      })
  );
  // .then(() => {
  //   const insertChatsQueryStr = format(
  //     "INSERT INTO chats (comment_id, message, room_number, created_at) VALUES %L;",
  //     chatData.map(({ comment_id, message, room_number, created_at }) => [
  //       comment_id,
  //       message,
  //       room_number,
  //       created_at,
  //     ])
  //   );
  //   return db.query(insertChatsQueryStr);
  // });
};

module.exports = seed;
