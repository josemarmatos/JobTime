import * as Haptics from "expo-haptics";

class HapticService {
  async success() {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  }

  async warning() {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );
  }

  async error() {
    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
    );
  }

  async selection() {
    await Haptics.selectionAsync();
  }

  async light() {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    );
  }

  async medium() {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Medium
    );
  }

  async heavy() {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Heavy
    );
  }
}

export const hapticService = new HapticService();