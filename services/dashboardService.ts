import { database } from "@/database/database";
import { DashboardStatistics } from "@/types/Dashboard";

export class DashboardService {
  getStatistics(): DashboardStatistics {
    const totalCompanies =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM companies;
        `
      )?.total ?? 0;

    const totalEmployees =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM employees;
        `
      )?.total ?? 0;

    const activeEmployees =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM employees
        WHERE active = 1;
        `
      )?.total ?? 0;

    const inactiveEmployees =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM employees
        WHERE active = 0;
        `
      )?.total ?? 0;

    const totalScales =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM scales;
        `
      )?.total ?? 0;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const todayScales =
      database.getFirstSync<{ total: number }>(
        `
        SELECT COUNT(*) AS total
        FROM scales
        WHERE work_date = ?;
        `,
        [today]
      )?.total ?? 0;

    return {
      totalCompanies,
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalScales,
      todayScales,
    };
  }
}

export const dashboardService = new DashboardService();