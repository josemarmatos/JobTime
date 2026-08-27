import { employeeRepository } from "@/database/repositories/EmployeeRepository";
import { CreateEmployeeDTO } from "@/types/CreateEmployeeDTO";
import { Employee } from "@/types/Employee";
import { UpdateEmployeeDTO } from "@/types/UpdateEmployeeDTO";

export type EmployeeListItem = Employee & {
  company_name: string;
};

export class EmployeeService {
  create(employee: CreateEmployeeDTO): void {
    employeeRepository.create(employee);
  }

  list(): Employee[] {
    return employeeRepository.list();
  }

  listActive(): Employee[] {
    return employeeRepository.listActive();
  }

  listWithCompany(): EmployeeListItem[] {
    return employeeRepository.listWithCompany();
  }

  findById(id: number): Employee | null {
    return employeeRepository.findById(id);
  }

  update(employee: UpdateEmployeeDTO): void {
    employeeRepository.update(employee);
  }

  updateStatus(
    id: number,
    active: number
  ): void {
    employeeRepository.updateStatus(
      id,
      active
    );
  }

  delete(id: number): void {
    employeeRepository.delete(id);
  }
}

export const employeeService =
  new EmployeeService();