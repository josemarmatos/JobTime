import {
    isEmail,
    isPhone,
    isRequired,
} from "./validation";

type EmployeeForm = {
  company_id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  role: string;
  admission_date?: string;
  birth_date?: string;
};

export function validateEmployee(
  employee: EmployeeForm
) {
  const errors: Record<string, string> = {};

  if (employee.company_id <= 0) {
    errors.company_id =
      "Selecione uma empresa.";
  }

  if (!isRequired(employee.name)) {
    errors.name =
      "Informe o nome completo.";
  }

  if (!isRequired(employee.cpf)) {
    errors.cpf =
      "Informe o CPF.";
  } else {
    const cpfDigits =
      employee.cpf.replace(/\D/g, "");

    if (cpfDigits.length !== 11) {
      errors.cpf = "CPF inválido.";
    }
  }

  if (!isPhone(employee.phone)) {
    errors.phone =
      "Telefone inválido.";
  }

  if (!isEmail(employee.email)) {
    errors.email =
      "E-mail inválido.";
  }

  if (!isRequired(employee.role)) {
    errors.role =
      "Informe o cargo.";
  }

  return errors;
}