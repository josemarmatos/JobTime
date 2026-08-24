import CompanyForm from "@/components/company/CompanyForm";
import { Header } from "@/components/layout/Header";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { validateCompany } from "@/validation/companyValidation";
import {
  formatCNPJ,
  formatPhone,
} from "@/validation/masks";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type CompanyField =
  | "name"
  | "cnpj"
  | "phone"
  | "email"
  | "manager";

export default function CompanyCreate() {
  const { showToast } = useToast();

  const nameRef = useRef<TextInput>(null);
  const cnpjRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const managerRef = useRef<TextInput>(null);

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [manager, setManager] = useState("");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [isSaving, setIsSaving] = useState(false);

  function clearFieldError(field: CompanyField) {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const updatedErrors = {
        ...currentErrors,
      };

      delete updatedErrors[field];

      return updatedErrors;
    });
  }

  function validateField(field: CompanyField) {
    const validation = validateCompany({
      name,
      cnpj,
      phone,
      email,
      manager,
    });

    setErrors((currentErrors) => {
      const updatedErrors = {
        ...currentErrors,
      };

      if (validation[field]) {
        updatedErrors[field] = validation[field];
      } else {
        delete updatedErrors[field];
      }

      return updatedErrors;
    });
  }

  function handleNameChange(value: string) {
    setName(value);
    clearFieldError("name");
  }

  function handleCnpjChange(value: string) {
    setCnpj(formatCNPJ(value));
    clearFieldError("cnpj");
  }

  function handlePhoneChange(value: string) {
    setPhone(formatPhone(value));
    clearFieldError("phone");
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    clearFieldError("email");
  }

  function handleManagerChange(value: string) {
    setManager(value);
    clearFieldError("manager");
  }

  function handleNameBlur() {
    validateField("name");
  }

  function handleCnpjBlur() {
    validateField("cnpj");
  }

  function handlePhoneBlur() {
    validateField("phone");
  }

  function handleEmailBlur() {
    validateField("email");
  }

  function handleManagerBlur() {
    validateField("manager");
  }

  function focusFirstError(
    validation: Record<string, string>
  ) {
    if (validation.name) {
      nameRef.current?.focus();
      return;
    }

    if (validation.cnpj) {
      cnpjRef.current?.focus();
      return;
    }

    if (validation.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (validation.email) {
      emailRef.current?.focus();
      return;
    }

    if (validation.manager) {
      managerRef.current?.focus();
    }
  }

  function handleSave() {
    if (isSaving) {
      return;
    }

    const validation = validateCompany({
      name,
      cnpj,
      phone,
      email,
      manager,
    });

    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      focusFirstError(validation);
      return;
    }

    setIsSaving(true);

    try {
      companyService.create({
        name,
        cnpj,
        phone,
        email,
        manager,
      });

      showToast(
        "Empresa cadastrada com sucesso!",
        "success"
      );

      setName("");
      setCnpj("");
      setPhone("");
      setEmail("");
      setManager("");

      setErrors({});
    } catch (error) {
      console.error(error);

      if (
        error instanceof Error &&
        error.message === "CNPJ já cadastrado."
      ) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          cnpj: "Este CNPJ já está cadastrado.",
        }));

        cnpjRef.current?.focus();

        showToast(
          "Este CNPJ já está cadastrado.",
          "error"
        );

        return;
      }

      showToast(
        "Não foi possível salvar a empresa.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Nova Empresa" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CompanyForm
            name={name}
            cnpj={cnpj}
            phone={phone}
            email={email}
            manager={manager}
            errors={errors}
            nameRef={nameRef}
            cnpjRef={cnpjRef}
            phoneRef={phoneRef}
            emailRef={emailRef}
            managerRef={managerRef}
            onChangeName={handleNameChange}
            onChangeCnpj={handleCnpjChange}
            onChangePhone={handlePhoneChange}
            onChangeEmail={handleEmailChange}
            onChangeManager={handleManagerChange}
            onBlurName={handleNameBlur}
            onBlurCnpj={handleCnpjBlur}
            onBlurPhone={handlePhoneBlur}
            onBlurEmail={handleEmailBlur}
            onBlurManager={handleManagerBlur}
            buttonTitle="Salvar Empresa"
            onSubmit={handleSave}
            loading={isSaving}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },
});