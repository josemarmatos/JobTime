import PrimaryButton from "@/components/buttons/PrimaryButton";

type Props = {
  title?: string;
  onPress: () => void;
  loading?: boolean;
};

export default function SaveButton({
  title = "Salvar",
  onPress,
  loading = false,
}: Props) {
  return (
    <PrimaryButton
      title={title}
      onPress={onPress}
      loading={loading}
    />
  );
}