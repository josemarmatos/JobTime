import PrimaryButton from "@/components/buttons/PrimaryButton";
import CompanySelect from "@/components/company/CompanySelect";
import PrimaryInput from "@/components/inputs/PrimaryInput";

type Props = {
  companyId: number;
  name: string;
  cpf: string;
  role: string;
  phone: string;
  email: string;

  onChangeCompanyId: (value: number) => void;
  onChangeName: (value: string) => void;
  onChangeCpf: (value: string) => void;
  onChangeRole: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;

  buttonTitle: string;
  onSubmit: () => void;
};

export default function EmployeeForm({
  companyId,
  name,
  cpf,
  role,
  phone,
  email,
  onChangeCompanyId,
  onChangeName,
  onChangeCpf,
  onChangeRole,
  onChangePhone,
  onChangeEmail,
  buttonTitle,
  onSubmit,
}: Props) {
  return (
    <>
      <CompanySelect
        label="Empresa"
        value={companyId}
        onChange={onChangeCompanyId}
      />

      <PrimaryInput
        label="Nome Completo"
        placeholder="Digite o nome"
        value={name}
        onChangeText={onChangeName}
      />

      <PrimaryInput
        label="CPF"
        placeholder="Digite o CPF"
        value={cpf}
        onChangeText={onChangeCpf}
      />

      <PrimaryInput
        label="Cargo"
        placeholder="Digite o cargo"
        value={role}
        onChangeText={onChangeRole}
      />

      <PrimaryInput
        label="Telefone"
        placeholder="Digite o telefone"
        value={phone}
        onChangeText={onChangePhone}
      />

      <PrimaryInput
        label="E-mail"
        placeholder="Digite o e-mail"
        value={email}
        onChangeText={onChangeEmail}
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={onSubmit}
      />
    </>
  );
}