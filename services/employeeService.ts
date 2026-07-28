import { database } from "@/database/database";
import { Employee } from "@/types/Employee";

export type EmployeeListItem = Employee & {
  company_name: string;
};

export class EmployeeService {
  create(employee: Employee): void {
    database.runSync(
      `
      INSERT INTO employees (
        company_id,
        name,
        cpf,
        phone,
        email,
        role,
        admission_date,
        birth_date,
        active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        employee.company_id,
        employee.name,
        employee.cpf,
        employee.phone,
        employee.email,
        employee.role,
        employee.admission_date,
        employee.birth_date,
        employee.active,
      ]
    );
  }

  list(): Employee[] {
    return database.getAllSync<Employee>(`
      SELECT *
      FROM employees
      ORDER BY name;
    `);
  }

  listWithCompany(): EmployeeListItem[] {
    return database.getAllSync<EmployeeListItem>(`
      SELECT
        employees.*,
        companies.name AS company_name
      FROM employees
      INNER JOIN companies
        ON companies.id = employees.company_id
      ORDER BY employees.name;
    `);
  }

  findById(id: number): Employee | null {
    const employee = database.getFirstSync<Employee>(
      `
      SELECT *
      FROM employees
      WHERE id = ?;
      `,
      [id]
    );

    return employee ?? null;
  }

  update(employee: Employee): void {
    database.runSync(
      `
      UPDATE employees
      SET
        company_id = ?,
        name = ?,
        cpf = ?,
        phone = ?,
        email = ?,
        role = ?,
        admission_date = ?,
        birth_date = ?,
        active = ?
      WHERE id = ?;
      `,
      [
        employee.company_id,
        employee.name,
        employee.cpf,
        employee.phone,
        employee.email,
        employee.role,
        employee.admission_date,
        employee.birth_date,
        employee.active,
        employee.id!,
      ]
    );
  }

  delete(id: number): void {
    database.runSync(
      `
      DELETE FROM employees
      WHERE id = ?;
      `,
      [id]
    );
  }
}

export const employeeService = new EmployeeService();