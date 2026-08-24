import PrimaryButton from "@/components/buttons/PrimaryButton";
import CompanySelect from "@/components/company/CompanySelect";
import FormInput from "@/components/forms/FormInput";
import { RefObject } from "react";
import { TextInput } from "react-native";

type Props = {
  companyId: number;

  name: string;
  cpf: string;
  role: string;
  phone: string;
  email: string;

  errors?: Record<string, string>;

  nameRef?: RefObject<TextInput | null>;
  cpfRef?: RefObject<TextInput | null>;
  roleRef?: RefObject<TextInput | null>;
  phoneRef?: RefObject<TextInput | null>;
  emailRef?: RefObject<TextInput | null>;

  onChangeCompanyId: (value: number) => void;
  onChangeName: (value: string) => void;
  onChangeCpf: (value: string) => void;
  onChangeRole: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;

  onBlurCompany?: () => void;
  onBlurName?: () => void;
  onBlurCpf?: () => void;
  onBlurRole?: () => void;
  onBlurPhone?: () => void;
  onBlurEmail?: () => void;

  buttonTitle: string;
  onSubmit: () => void;
  loading?: boolean;
};

export default function EmployeeForm({
  companyId,

  name,
  cpf,
  role,
  phone,
  email,

  errors,

  nameRef,
  cpfRef,
  roleRef,
  phoneRef,
  emailRef,

  onChangeCompanyId,
  onChangeName,
  onChangeCpf,
  onChangeRole,
  onChangePhone,
  onChangeEmail,

  onBlurCompany,
  onBlurName,
  onBlurCpf,
  onBlurRole,
  onBlurPhone,
  onBlurEmail,

  buttonTitle,
  onSubmit,
  loading = false,
}: Props) {
  return (
    <>
      <CompanySelect
        label="Empresa"
        value={companyId}
        onChange={onChangeCompanyId}
        error={errors?.company_id}
        onBlur={onBlurCompany}
      />

      <FormInput
        label="Nome Completo"
        required
        placeholder="Digite o nome completo"
        value={name}
        onChangeText={onChangeName}
        onBlur={onBlurName}
        error={errors?.name}
        inputRef={nameRef}
      />

      <FormInput
        label="CPF"
        required
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={onChangeCpf}
        onBlur={onBlurCpf}
        error={errors?.cpf}
        inputRef={cpfRef}
        keyboardType="numeric"
      />

      <FormInput
        label="Cargo"
        required
        placeholder="Digite o cargo"
        value={role}
        onChangeText={onChangeRole}
        onBlur={onBlurRole}
        error={errors?.role}
        inputRef={roleRef}
      />

      <FormInput
        label="Telefone"
        required
        placeholder="(00) 00000-0000"
        value={phone}
        onChangeText={onChangePhone}
        onBlur={onBlurPhone}
        error={errors?.phone}
        inputRef={phoneRef}
        keyboardType="phone-pad"
      />

      <FormInput
        label="E-mail"
        required
        placeholder="funcionario@email.com"
        value={email}
        onChangeText={onChangeEmail}
        onBlur={onBlurEmail}
        error={errors?.email}
        inputRef={emailRef}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={onSubmit}
        loading={loading}
      />
    </>
  );
}