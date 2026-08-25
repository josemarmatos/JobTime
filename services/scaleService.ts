import { database } from "@/database/database";
import { Scale } from "@/types/Scale";

export type ScaleListItem = Scale & {
  employee_name: string;
  company_name: string;
};

export class ScaleService {
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time
      .split(":")
      .map(Number);

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
      AND work_date BETWEEN date(?, '-1 day')
                        AND date(?, '+1 day');
    `,
    [
      employeeId,
      workDate,
      workDate,
    ]
  );

  const baseDate = new Date(
    `${workDate}T00:00:00Z`
  );

  const newStart =
    this.timeToMinutes(startTime);

  const newEnd =
    this.timeToMinutes(endTime);

  const newEndMinutes =
    newEnd > newStart
      ? newEnd
      : newEnd + 24 * 60;

  const newStartAbsolute =
    newStart;

  const newEndAbsolute =
    newEndMinutes;

  for (const scale of scales) {
    if (
      ignoreScaleId &&
      scale.id === ignoreScaleId
    ) {
      continue;
    }

    const scaleDate = new Date(
      `${scale.work_date}T00:00:00Z`
    );

    const dayDifference =
      Math.round(
        (scaleDate.getTime() -
          baseDate.getTime()) /
          (24 * 60 * 60 * 1000)
      );

    const existingStart =
      this.timeToMinutes(
        scale.start_time
      );

    const existingEnd =
      this.timeToMinutes(
        scale.end_time
      );

    const existingStartAbsolute =
      dayDifference * 24 * 60 +
      existingStart;

    const existingEndAbsolute =
      dayDifference * 24 * 60 +
      (
        existingEnd > existingStart
          ? existingEnd
          : existingEnd + 24 * 60
      );

    const overlap =
      newStartAbsolute <
        existingEndAbsolute &&
      newEndAbsolute >
        existingStartAbsolute;

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
    const scale =
      database.getFirstSync<Scale>(
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
    const scale = this.findById(id);

    if (!scale) {
      throw new Error(
        "Escala não encontrada."
      );
    }

    if (
      scale.status === "completed" ||
      scale.status === "cancelled"
    ) {
      throw new Error(
        "Escalas concluídas ou canceladas não podem ser excluídas."
      );
    }

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