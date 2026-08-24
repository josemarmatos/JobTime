import SecondaryButton from "@/components/buttons/SecondaryButton";

type Props = {
  title?: string;
  onPress: () => void;
};

export default function FormCancelButton({
  title = "Cancelar",
  onPress,
}: Props) {
  return (
    <SecondaryButton
      title={title}
      onPress={onPress}
    />
  );
}