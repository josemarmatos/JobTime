export type ScaleStatus =
  | "scheduled"
  | "completed"
  | "cancelled";

export interface Scale {
  id?: number;

  employee_id: number;

  work_date: string;

  start_time: string;

  end_time: string;

  shift_name: string;

  status: ScaleStatus;

  notes?: string;

  created_at: string;

  updated_at?: string;
}