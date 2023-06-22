const mysql2 = require("mysql2");

const inquierer = require("inquirer");

const connection = mysql2.createConnection(
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

const questions = [
  {
    type: "list",
    name: "userChoice",
    message: "What would you like to select?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  },
];

function init() {
  inquierer.prompt(questions).then(function (data) {
    if (data.userChoice === "View all departments") {
      //Add department
      viewAllDepartments();
    } else if (data.userChoice === "View all roles") {
      viewAllRoles();
    } else if (data.userChoice === "View all employees") {
      viewAllEmployees();
    } else if (data.userChoice === "Add a department") {
      addDepartment();
    } else if (data.userChoice === "Add a role") {
      addARole();
    } else if (data.userChoice === "Add an employee") {
      addEmployee();
      //ask for first name last name and manager id and role id
    } else if (data.userChoice === "Update an employee role") {
      updateEmployee();
    } else {
    }
  });
}

function viewAllDepartments() {
  const sql = "select * from department";
  connection.query(sql, (error, results) => {
    console.table(results);
    init();
  });
}

function viewAllRoles() {
  const sql = "select * from role";
  connection.query(sql, (error, results) => {
    console.table(results);
    init();
  });
}

function viewAllEmployees() {
  const sql = "select * from employee";
  connection.query(sql, (error, results) => {
    console.table(results);
    init();
  });
}

function addDepartment() {
  inquierer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What would you like to name your department?",
      },
    ])
    .then(function (data) {
      const sql = "insert into department(department_name) values(?)";
      connection.query(sql, data.departmentName, (error, results) => {
        console.log("Department has been added!");
        init();
      });
    });
}

function addARole() {
  inquierer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department for the role?",
      },
    ])
    .then(function (data) {
      const sql = `insert into role (title, salary, department_id) values('${data.title}', '${data.salary}', '${data.department_id}')`;
      connection.query(sql, (error, results) => {
        console.log("Role has been added!");
        if (error) {
          console.log(error);
        }
        init();
      });
    });
}

function addEmployee() {
  inquierer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID for this employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager ID for this employee?",
      },
    ])
    .then(function (data) {
      const sql = `insert into employee (first_name, last_name, role_id, manager_id) values('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}')`;
      connection.query(sql, (error, results) => {
        console.log("Employee has been added!");
        if (error) {
          console.log(error);
        }
        init();
      });
    });
}

function updateEmployee() {
  inquierer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "What is the ID of the employee you are updating?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the new role ID for the employee?",
      },
    ])
    .then(function (data) {
      const sql = "update employee set role_id=? where id=? ";
      console.log(data);
      connection.query(
        sql,
        [data.role_id, data.employeeId],
        (error, results) => {
          console.log("Employee updated!");
          init();
        }
      );
    });
}
init();
