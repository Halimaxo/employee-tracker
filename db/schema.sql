DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;
CREATE TABLE department (
    id INT NOT NULL primary key auto_increment, 
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL primary key auto_increment,
    title VARCHAR(30) NOT NULL, 
    salary decimal NOT NULL,
    department_id INT NOT NULL,
    foreign key (department_id) references department(id)
);

CREATE TABLE employee (
    id INT NOT NULL primary key auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee(id)
);