import {
  isRequired,
} from "./validation";

type ScaleForm = {
  employee_id: number;
  work_date: string;
  start_time: string;
  end_time: string;
  shift_name: string;
};

function isValidDate(
  value: string
): boolean {
  if (
    !/^\d{2}\/\d{2}\/\d{4}$/.test(
      value
    )
  ) {
    return false;
  }

  const [
    day,
    month,
    year,
  ] = value
    .split("/")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  return (
    date.getFullYear() === year &&
    date.getMonth() ===
      month - 1 &&
    date.getDate() === day
  );
}

function isValidTime(
  value: string
): boolean {
  if (
    !/^\d{2}:\d{2}$/.test(
      value
    )
  ) {
    return false;
  }

  const [
    hours,
    minutes,
  ] = value
    .split(":")
    .map(Number);

  return (
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
}

export function validateScale(
  scale: ScaleForm
) {
  const errors: Record<
    string,
    string
  > = {};

  if (scale.employee_id <= 0) {
    errors.employee_id =
      "Selecione um funcionário.";
  }

  if (!isRequired(scale.work_date)) {
    errors.work_date =
      "Informe a data.";
  } else if (
    !isValidDate(
      scale.work_date
    )
  ) {
    errors.work_date =
      "Informe uma data válida no formato DD/MM/AAAA.";
  }

  if (!isRequired(scale.start_time)) {
    errors.start_time =
      "Informe a hora inicial.";
  } else if (
    !isValidTime(
      scale.start_time
    )
  ) {
    errors.start_time =
      "Informe uma hora inicial válida no formato HH:mm.";
  }

  if (!isRequired(scale.end_time)) {
    errors.end_time =
      "Informe a hora final.";
  } else if (
    !isValidTime(
      scale.end_time
    )
  ) {
    errors.end_time =
      "Informe uma hora final válida no formato HH:mm.";
  }

  if (
    isValidTime(scale.start_time) &&
    isValidTime(scale.end_time) &&
    scale.start_time ===
      scale.end_time
  ) {
    errors.end_time =
      "A hora inicial e a hora final não podem ser iguais.";
  }

  if (!isRequired(scale.shift_name)) {
    errors.shift_name =
      "Informe o turno.";
  }

  return errors;
}