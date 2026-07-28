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
}

export const companyService = new CompanyService();