import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";

type Props = {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  manager: string;

  onChangeName: (value: string) => void;
  onChangeCnpj: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeManager: (value: string) => void;

  buttonTitle: string;
  onSubmit: () => void;
};

export default function CompanyForm({
  name,
  cnpj,
  phone,
  email,
  manager,

  onChangeName,
  onChangeCnpj,
  onChangePhone,
  onChangeEmail,
  onChangeManager,

  buttonTitle,
  onSubmit,
}: Props) {
  return (
    <>
      <PrimaryInput
        label="Nome da Empresa"
        placeholder="Digite o nome da empresa"
        value={name}
        onChangeText={onChangeName}
      />

      <PrimaryInput
        label="CNPJ"
        placeholder="00.000.000/0000-00"
        value={cnpj}
        onChangeText={onChangeCnpj}
      />

      <PrimaryInput
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={phone}
        onChangeText={onChangePhone}
      />

      <PrimaryInput
        label="E-mail"
        placeholder="empresa@email.com"
        value={email}
        onChangeText={onChangeEmail}
      />

      <PrimaryInput
        label="Responsável"
        placeholder="Nome do responsável"
        value={manager}
        onChangeText={onChangeManager}
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={onSubmit}
      />
    </>
  );
}