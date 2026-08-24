import { THEME } from "@/constants/theme";
import { RefObject } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  inputRef?: RefObject<TextInput | null>;
};

export default function FormInput({
  label,
  error,
  helperText,
  required = false,
  inputRef,
  style,
  ...rest
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}

        {required && (
          <Text style={styles.required}>
            {" "}*
          </Text>
        )}
      </Text>

      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={
          THEME.colors.textSecondary
        }
        {...rest}
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={styles.helper}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.lg,
  },

  label: {
    marginBottom: THEME.spacing.sm,
    fontSize: THEME.typography.fontSize.sm,
    fontWeight:
      THEME.typography.fontWeight.semibold,
    color: THEME.colors.text,
  },

  required: {
    color: "#D32F2F",
  },

  input: {
    height: 52,

    borderWidth: 1,

    borderColor: THEME.colors.border,

    borderRadius: THEME.radius.md,

    paddingHorizontal: THEME.spacing.md,

    backgroundColor: THEME.colors.white,

    color: THEME.colors.text,

    fontSize: THEME.typography.fontSize.md,
  },

  inputError: {
    borderColor: "#D32F2F",
  },

  helper: {
    marginTop: 6,
    color: THEME.colors.textSecondary,
    fontSize: THEME.typography.fontSize.sm,
  },

  error: {
    marginTop: 6,
    color: THEME.colors.textSecondary,
    fontSize: THEME.typography.fontSize.sm,
  },
});