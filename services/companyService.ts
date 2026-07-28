import { database } from "@/database/database";
import { Company } from "@/types/Company";

export class CompanyService {
  create(company: Company): void {
    database.runSync(
      `
      INSERT INTO companies (
        name,
        cnpj,
        phone,
        email,
        manager
      )
      VALUES (?, ?, ?, ?, ?);
      `,
      [
        company.name,
        company.cnpj,
        company.phone,
        company.email,
        company.manager,
      ]
    );
  }

  list(): Company[] {
    return database.getAllSync<Company>(`
      SELECT *
      FROM companies
      ORDER BY name;
    `);
  }

  findById(id: number): Company | null {
    const company = database.getFirstSync<Company>(
      `
      SELECT *
      FROM companies
      WHERE id = ?;
      `,
      [id]
    );

    return company ?? null;
  }

  update(company: Company): void {
    database.runSync(
      `
      UPDATE companies
      SET
        name = ?,
        cnpj = ?,
        phone = ?,
        email = ?,
        manager = ?
      WHERE id = ?;
      `,
      [
        company.name,
        company.cnpj,
        company.phone,
        company.email,
        company.manager,
        company.id!,
      ]
    );
  }

  delete(id: number): void {
    database.runSync(
      `
      DELETE FROM companies
      WHERE id = ?;
      `,
      [id]
    );
  }
}

export const companyService = new CompanyService();