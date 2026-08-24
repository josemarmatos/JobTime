import { database } from "@/database/database";
import { Company } from "@/types/Company";
import { CreateCompanyDTO } from "@/types/CreateCompanyDTO";
import { UpdateCompanyDTO } from "@/types/UpdateCompanyDTO";

export class CompanyRepository {
  create(company: CreateCompanyDTO): void {
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

  existsByCnpj(
    cnpj: string,
    excludeId?: number
  ): boolean {
    const normalizedCnpj =
      cnpj.replace(/\D/g, "");

    if (excludeId !== undefined) {
      const result =
        database.getFirstSync<{
          count: number;
        }>(
          `
          SELECT COUNT(*) as count
          FROM companies
          WHERE cnpj = ?
            AND id != ?;
          `,
          [normalizedCnpj, excludeId]
        );

      return (result?.count ?? 0) > 0;
    }

    const result =
      database.getFirstSync<{
        count: number;
      }>(
        `
        SELECT COUNT(*) as count
        FROM companies
        WHERE cnpj = ?;
        `,
        [normalizedCnpj]
      );

    return (result?.count ?? 0) > 0;
  }

  list(): Company[] {
    return database.getAllSync<Company>(`
      SELECT *
      FROM companies
      ORDER BY name;
    `);
  }

  findById(id: number): Company | null {
    const company =
      database.getFirstSync<Company>(
        `
        SELECT *
        FROM companies
        WHERE id = ?;
        `,
        [id]
      );

    return company ?? null;
  }

  update(company: UpdateCompanyDTO): void {
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
        company.id,
      ]
    );
  }

  updateStatus(
    id: number,
    active: number
  ): void {
    database.runSync(
      `
      UPDATE companies
      SET active = ?
      WHERE id = ?;
      `,
      [active, id]
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

export const companyRepository =
  new CompanyRepository();