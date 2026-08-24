import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput
} from "react-native";

import EmployeeForm from "@/components/employee/EmployeeForm";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { employeeService } from "@/services/employeeService";
import { validateEmployee } from "@/validation/employeeValidation";
import {
  formatCPF,
  formatPhone,
} from "@/validation/masks";

export default function EmployeeCreate() {
  const router = useRouter();

  const [companyId, setCompanyId] = useState(0);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const roleRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  function handleSave() {
    const validation = validateEmployee({
      company_id: companyId,
      name,
      cpf,
      role,
      phone,
      email,
    });

    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    try {
      setLoading(true);

      employeeService.create({
        company_id: companyId,
        name: name.trim(),
        cpf,
        phone,
        email: email.trim(),
        role: role.trim(),
        admission_date: "",
        birth_date: "",
        active: 1,
      });

      alert(
        "Funcionário cadastrado com sucesso!"
      );

      router.back();
    } catch (error) {
      console.error(
        "Erro ao cadastrar funcionário:",
        error
      );

      alert(
        "Não foi possível cadastrar o funcionário."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <Header title="Cadastrar Funcionário" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <EmployeeForm
          companyId={companyId}
          name={name}
          cpf={cpf}
          role={role}
          phone={phone}
          email={email}
          errors={errors}
          nameRef={nameRef}
          cpfRef={cpfRef}
          roleRef={roleRef}
          phoneRef={phoneRef}
          emailRef={emailRef}
          onChangeCompanyId={setCompanyId}
          onChangeName={setName}
          onChangeCpf={(value) => {
            setCpf(formatCPF(value));
          }}
          onChangeRole={setRole}
          onChangePhone={(value) => {
            setPhone(formatPhone(value));
          }}
          onChangeEmail={setEmail}
          buttonTitle="Salvar Funcionário"
          onSubmit={handleSave}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },
});