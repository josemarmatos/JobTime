import { COLORS } from "@/constants/colors";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress: () => void;
};

export default function DashboardCard({
  title,
  subtitle,
  icon,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        {icon && (
          <Text style={styles.icon}>
            {icon}
          </Text>
        )}

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    borderRadius: 16,

    padding: 20,

    marginBottom: 16,

    borderWidth: 1,

    borderColor: COLORS.border,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    shadowColor: COLORS.shadow,

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  pressed: {
    opacity: 0.9,

    transform: [{ scale: 0.98 }],
  },

  left: {
    flexDirection: "row",

    alignItems: "center",
  },

  icon: {
    fontSize: 30,

    marginRight: 16,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 14,

    color: COLORS.textSecondary,
  },

  arrow: {
    fontSize: 24,

    color: COLORS.textSecondary,
  },
});