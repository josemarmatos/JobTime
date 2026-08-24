import { companyRepository } from "@/database/repositories/CompanyRepository";
import { Company } from "@/types/Company";
import { CreateCompanyDTO } from "@/types/CreateCompanyDTO";
import { UpdateCompanyDTO } from "@/types/UpdateCompanyDTO";

export class CompanyService {
  create(company: CreateCompanyDTO): void {
    const normalizedCnpj =
      company.cnpj.replace(/\D/g, "");

    if (
      companyRepository.existsByCnpj(
        normalizedCnpj
      )
    ) {
      throw new Error(
        "CNPJ já cadastrado."
      );
    }

    companyRepository.create({
      ...company,
      cnpj: normalizedCnpj,
    });
  }

  list(): Company[] {
    return companyRepository.list();
  }

  findById(id: number): Company | null {
    return companyRepository.findById(id);
  }

  update(company: UpdateCompanyDTO): void {
    const normalizedCnpj =
      company.cnpj.replace(/\D/g, "");

    if (
      companyRepository.existsByCnpj(
        normalizedCnpj,
        company.id
      )
    ) {
      throw new Error(
        "CNPJ já cadastrado."
      );
    }

    companyRepository.update({
      ...company,
      cnpj: normalizedCnpj,
    });
  }

  updateStatus(
    id: number,
    active: number
  ): void {
    companyRepository.updateStatus(
      id,
      active
    );
  }

  delete(id: number): void {
    companyRepository.delete(id);
  }
}

export const companyService =
  new CompanyService();