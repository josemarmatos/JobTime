import {
    isCNPJ,
    isEmail,
    isPhone,
    isRequired,
} from "./validation";

type CompanyForm = {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  manager: string;
};

export function validateCompany(
  company: CompanyForm
) {
  const errors: Record<string, string> = {};

  if (!isRequired(company.name))
    errors.name = "Informe o nome da empresa.";

  if (!isCNPJ(company.cnpj))
    errors.cnpj = "CNPJ inválido.";

  if (!isPhone(company.phone))
    errors.phone = "Telefone inválido.";

  if (!isEmail(company.email))
    errors.email = "E-mail inválido.";

  if (!isRequired(company.manager))
    errors.manager = "Informe o responsável.";

  return errors;
}