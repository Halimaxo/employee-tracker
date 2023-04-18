INSERT INTO department (department_name)
VALUES ("Preventitive Medicine"), ("OBGYN"), ("Emergency Department"), ("Family Medicine"), ("Pharmacy"), ("Surgery");

INSERT INTO role (title, salary, department_id)
VALUES ("Physician", 200000, 1), ("Doctor", 300000, 2), ("Nurse", 85000, 3), ("PA", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Halima", "Shuchi", 1, NULL), ("Abdullah", "Al-Hilfi", 2, 1), ("Omar", "H", 3, 1);


