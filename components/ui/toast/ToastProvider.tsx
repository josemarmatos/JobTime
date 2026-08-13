import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import Toast, { ToastType } from "./Toast";

type ToastData = {
  message: string;
  type: ToastType;
};

type ToastContextData = {
  showToast: (
    message: string,
    type?: ToastType
  ) => void;
};

const ToastContext =
  createContext<ToastContextData | null>(null);

type Props = {
  children: ReactNode;
};

export function ToastProvider({
  children,
}: Props) {
  const [toast, setToast] =
    useState<ToastData | null>(null);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = "info"
    ) => {
      setToast({
        message,
        type,
      });

      setTimeout(() => {
        setToast(null);
      }, 2500);
    },
    []
  );

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <View
        pointerEvents="box-none"
        style={styles.container}
      >
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
          />
        )}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast deve ser utilizado dentro de um ToastProvider."
    );
  }

  return context;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
  },
});