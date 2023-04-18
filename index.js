const mysql2 = require("mysql2");

const inquierer = require("inquirer");

mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "tracker_db",
  },
  console.log("connected to database")
);

// ask multiple questions similar to read me
// choices
// ask user choices
