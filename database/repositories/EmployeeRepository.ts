import { database } from "@/database/database";
import { CreateEmployeeDTO } from "@/types/CreateEmployeeDTO";
import { Employee } from "@/types/Employee";
import { UpdateEmployeeDTO } from "@/types/UpdateEmployeeDTO";

export type EmployeeListItem = Employee & {
  company_name: string;
};

export class EmployeeRepository {
  create(employee: CreateEmployeeDTO): void {
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

  listActive(): Employee[] {
    return database.getAllSync<Employee>(`
      SELECT *
      FROM employees
      WHERE active = 1
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
    const employee =
      database.getFirstSync<Employee>(
        `
        SELECT *
        FROM employees
        WHERE id = ?;
        `,
        [id]
      );

    return employee ?? null;
  }

  update(employee: UpdateEmployeeDTO): void {
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
        employee.id,
      ]
    );
  }

  updateStatus(
    id: number,
    active: number
  ): void {
    database.runSync(
      `
      UPDATE employees
      SET active = ?
      WHERE id = ?;
      `,
      [active, id]
    );
  }

  delete(id: number): void {
    const employee =
      this.findById(id);

    if (!employee) {
      throw new Error(
        "Funcionário não encontrado."
      );
    }

    const scaleCount =
      database.getFirstSync<{
        total: number;
      }>(
        `
        SELECT COUNT(*) AS total
        FROM scales
        WHERE employee_id = ?;
        `,
        [id]
      )?.total ?? 0;

    if (scaleCount > 0) {
      throw new Error(
        "Este funcionário possui escalas vinculadas e não pode ser excluído. Inative o funcionário para preservar o histórico."
      );
    }

    database.runSync(
      `
      DELETE FROM employees
      WHERE id = ?;
      `,
      [id]
    );
  }
}

export const employeeRepository =
  new EmployeeRepository();