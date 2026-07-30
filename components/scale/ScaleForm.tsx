import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import EmployeeSelect from "@/components/employee/EmployeeSelect";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { scaleService } from "@/services/scaleService";
import { Scale } from "@/types/Scale";

type Props = {
  initialValues?: Scale;
  buttonTitle: string;
  onSubmit: (scale: Scale) => void;
};

export default function ScaleForm({
  initialValues,
  buttonTitle,
  onSubmit,
}: Props) {
  const [employeeId, setEmployeeId] = useState(0);

  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [shiftName, setShiftName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    setEmployeeId(initialValues.employee_id);
    setWorkDate(initialValues.work_date);
    setStartTime(initialValues.start_time);
    setEndTime(initialValues.end_time);
    setShiftName(initialValues.shift_name);
    setNotes(initialValues.notes ?? "");
  }, [initialValues]);

  function handleSubmit() {
    if (
      employeeId === 0 ||
      !workDate.trim() ||
      !startTime.trim() ||
      !endTime.trim() ||
      !shiftName.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    if (
      scaleService.hasConflict(
        employeeId,
        workDate,
        startTime,
        endTime,
        initialValues?.id
      )
    ) {
      Alert.alert(
        "Conflito de horário",
        "Este funcionário já possui uma escala cadastrada para esse período."
      );
      return;
    }

    const now = new Date().toISOString();

    onSubmit({
      id: initialValues?.id,

      employee_id: employeeId,

      work_date: workDate,

      start_time: startTime,

      end_time: endTime,

      shift_name: shiftName,

      status: initialValues?.status ?? "scheduled",

      notes,

      created_at: initialValues?.created_at ?? now,

      updated_at: now,
    });
  }

  return (
    <View>
      <EmployeeSelect
        label="Funcionário"
        value={employeeId}
        onChange={setEmployeeId}
      />

      <PrimaryInput
        label="Data"
        placeholder="2026-08-15"
        value={workDate}
        onChangeText={setWorkDate}
        maxLength={10}
      />

      <PrimaryInput
        label="Hora Inicial"
        placeholder="08:00"
        value={startTime}
        onChangeText={setStartTime}
        maxLength={5}
      />

      <PrimaryInput
        label="Hora Final"
        placeholder="17:00"
        value={endTime}
        onChangeText={setEndTime}
        maxLength={5}
      />

      <PrimaryInput
        label="Turno"
        placeholder="Manhã"
        value={shiftName}
        onChangeText={setShiftName}
      />

      <PrimaryInput
        label="Observações"
        placeholder="Opcional"
        value={notes}
        onChangeText={setNotes}
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={handleSubmit}
      />
    </View>
  );
}