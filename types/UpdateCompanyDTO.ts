import { CreateCompanyDTO } from "./CreateCompanyDTO";

export interface UpdateCompanyDTO
  extends CreateCompanyDTO {
  id: number;
}