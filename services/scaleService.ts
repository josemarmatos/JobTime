import { database } from "@/database/database";
import { Scale } from "@/types/Scale";

export type ScaleListItem = Scale & {
  employee_name: string;
  company_name: string;
};

export class ScaleService {
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  }

  hasConflict(
    employeeId: number,
    workDate: string,
    startTime: string,
    endTime: string,
    ignoreScaleId?: number
  ): boolean {
    const scales = database.getAllSync<Scale>(
      `
      SELECT *
      FROM scales
      WHERE employee_id = ?
        AND work_date = ?;
      `,
      [employeeId, workDate]
    );

    const newStart = this.timeToMinutes(startTime);
    const newEnd = this.timeToMinutes(endTime);

    for (const scale of scales) {
      if (
        ignoreScaleId &&
        scale.id === ignoreScaleId
      ) {
        continue;
      }

      const existingStart =
        this.timeToMinutes(scale.start_time);

      const existingEnd =
        this.timeToMinutes(scale.end_time);

      const overlap =
        newStart < existingEnd &&
        newEnd > existingStart;

      if (overlap) {
        return true;
      }
    }

    return false;
  }

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

  updateStatus(
    id: number,
    status:
      | "scheduled"
      | "completed"
      | "cancelled"
  ): void {
    database.runSync(
      `
      UPDATE scales
      SET
        status = ?,
        updated_at = ?
      WHERE id = ?;
      `,
      [
        status,
        new Date().toISOString(),
        id,
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

export const scaleService =
  new ScaleService();