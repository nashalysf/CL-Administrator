-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");
INSERT INTO department (name)
VALUE ("Services");

-- ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 135000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 185000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("HR", 100000, 5);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Doe", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Smith", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Marie","Lee",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Natalia", "Colon", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jim", "Melby", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jane", "Doe", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("George", "Tucker", 2, 7);

-- MANAGERS SEEDS -------
INSERT INTO managers (first_name, last_name, role_id, department_id)
VALUE ("Gabriel", "Rivera", 1, 2);
INSERT INTO managers (first_name, last_name, role_id, department_id)
VALUE ("George", "Tucker", 2, 7);