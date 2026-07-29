import { database } from "@/database/database";
import { Scale } from "@/types/Scale";

export type ScaleListItem = Scale & {
  employee_name: string;
  company_name: string;
};

export class ScaleService {
  create(scale: Scale): void {
    database.runSync(
      `
      INSERT INTO scales (
        employee_id,
        work_date,
        start_time,
        end_time,
        shift_name,
        status,
        notes,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        scale.employee_id,
        scale.work_date,
        scale.start_time,
        scale.end_time,
        scale.shift_name,
        scale.status,
        scale.notes ?? null,
        scale.created_at,
        scale.updated_at ?? null,
      ]
    );
  }

  list(): Scale[] {
    return database.getAllSync<Scale>(`
      SELECT *
      FROM scales
      ORDER BY work_date, start_time;
    `);
  }

  listWithEmployee(): ScaleListItem[] {
    return database.getAllSync<ScaleListItem>(`
      SELECT
        scales.*,
        employees.name AS employee_name,
        companies.name AS company_name
      FROM scales
      INNER JOIN employees
        ON employees.id = scales.employee_id
      INNER JOIN companies
        ON companies.id = employees.company_id
      ORDER BY
        scales.work_date,
        scales.start_time;
    `);
  }

  findById(id: number): Scale | null {
    const scale = database.getFirstSync<Scale>(
      `
      SELECT *
      FROM scales
      WHERE id = ?;
      `,
      [id]
    );

    return scale ?? null;
  }

  update(scale: Scale): void {
    database.runSync(
      `
      UPDATE scales
      SET
        employee_id = ?,
        work_date = ?,
        start_time = ?,
        end_time = ?,
        shift_name = ?,
        status = ?,
        notes = ?,
        updated_at = ?
      WHERE id = ?;
      `,
      [
        scale.employee_id,
        scale.work_date,
        scale.start_time,
        scale.end_time,
        scale.shift_name,
        scale.status,
        scale.notes ?? null,
        scale.updated_at ?? null,
        scale.id!,
      ]
    );
  }

  delete(id: number): void {
    database.runSync(
      `
      DELETE FROM scales
      WHERE id = ?;
      `,
      [id]
    );
  }
}

export const scaleService = new ScaleService();