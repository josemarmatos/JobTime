import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormInput from "@/components/forms/FormInput";
import { RefObject } from "react";
import { TextInput } from "react-native";

type Props = {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  manager: string;

  errors?: Record<string, string>;

  nameRef?: RefObject<TextInput | null>;
  cnpjRef?: RefObject<TextInput | null>;
  phoneRef?: RefObject<TextInput | null>;
  emailRef?: RefObject<TextInput | null>;
  managerRef?: RefObject<TextInput | null>;

  onChangeName: (value: string) => void;
  onChangeCnpj: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeManager: (value: string) => void;

  onBlurName?: () => void;
  onBlurCnpj?: () => void;
  onBlurPhone?: () => void;
  onBlurEmail?: () => void;
  onBlurManager?: () => void;

  buttonTitle: string;
  onSubmit: () => void;
  loading?: boolean;
};

export default function CompanyForm({
  name,
  cnpj,
  phone,
  email,
  manager,

  errors,

  nameRef,
  cnpjRef,
  phoneRef,
  emailRef,
  managerRef,

  onChangeName,
  onChangeCnpj,
  onChangePhone,
  onChangeEmail,
  onChangeManager,

  onBlurName,
  onBlurCnpj,
  onBlurPhone,
  onBlurEmail,
  onBlurManager,

  buttonTitle,
  onSubmit,
  loading = false,
}: Props) {
  return (
    <>
      <FormInput
        label="Nome da Empresa"
        required
        placeholder="Digite o nome da empresa"
        value={name}
        onChangeText={onChangeName}
        onBlur={onBlurName}
        error={errors?.name}
        inputRef={nameRef}
      />

      <FormInput
        label="CNPJ"
        required
        placeholder="00.000.000/0000-00"
        value={cnpj}
        onChangeText={onChangeCnpj}
        onBlur={onBlurCnpj}
        error={errors?.cnpj}
        inputRef={cnpjRef}
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
      />

      <FormInput
        label="E-mail"
        required
        placeholder="empresa@email.com"
        value={email}
        onChangeText={onChangeEmail}
        onBlur={onBlurEmail}
        error={errors?.email}
        inputRef={emailRef}
      />

      <FormInput
        label="Responsável"
        required
        placeholder="Nome do responsável"
        value={manager}
        onChangeText={onChangeManager}
        onBlur={onBlurManager}
        error={errors?.manager}
        inputRef={managerRef}
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={onSubmit}
        loading={loading}
      />
    </>
  );
}