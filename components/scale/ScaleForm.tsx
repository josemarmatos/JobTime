import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import EmployeeSelect from "@/components/employee/EmployeeSelect";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { scaleService } from "@/services/scaleService";
import { Scale } from "@/types/Scale";
import { validateScale } from "@/validation/scaleValidation";

type Props = {
  initialValues?: Scale;
  buttonTitle: string;
  onSubmit: (scale: Scale) => void;
};

function formatDateInput(
  value: string
): string {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(
      0,
      2
    )}/${digits.slice(2)}`;
  }

  return `${digits.slice(
    0,
    2
  )}/${digits.slice(
    2,
    4
  )}/${digits.slice(4)}`;
}

function formatTimeInput(
  value: string
): string {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(
    0,
    2
  )}:${digits.slice(2)}`;
}

function displayDateToDatabase(
  value: string
): string {
  const [
    day,
    month,
    year,
  ] = value.split("/");

  return `${year}-${month}-${day}`;
}

function databaseDateToDisplay(
  value: string
): string {
  const [
    year,
    month,
    day,
  ] = value.split("-");

  if (
    !year ||
    !month ||
    !day
  ) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

export default function ScaleForm({
  initialValues,
  buttonTitle,
  onSubmit,
}: Props) {
  const [employeeId, setEmployeeId] =
    useState(0);

  const [workDate, setWorkDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [shiftName, setShiftName] =
    useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setEmployeeId(
      initialValues.employee_id
    );

    setWorkDate(
      databaseDateToDisplay(
        initialValues.work_date
      )
    );

    setStartTime(
      initialValues.start_time
    );

    setEndTime(
      initialValues.end_time
    );

    setShiftName(
      initialValues.shift_name
    );

    setNotes(
      initialValues.notes ?? ""
    );
  }, [initialValues]);

  function handleSubmit() {
    const errors =
      validateScale({
        employee_id:
          employeeId,
        work_date:
          workDate,
        start_time:
          startTime,
        end_time:
          endTime,
        shift_name:
          shiftName,
      });

    const firstError =
      Object.values(errors)[0];

    if (firstError) {
      Alert.alert(
        "Dados inválidos",
        firstError
      );

      return;
    }

    const databaseDate =
      displayDateToDatabase(
        workDate
      );

    if (
      scaleService.hasConflict(
        employeeId,
        databaseDate,
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

    const now =
      new Date().toISOString();

    onSubmit({
      id: initialValues?.id,

      employee_id:
        employeeId,

      work_date:
        databaseDate,

      start_time:
        startTime,

      end_time:
        endTime,

      shift_name:
        shiftName,

      status:
        initialValues?.status ??
        "scheduled",

      notes,

      created_at:
        initialValues?.created_at ??
        now,

      updated_at:
        now,
    });
  }

  return (
    <View>
      <EmployeeSelect
        label="Funcionário"
        value={employeeId}
        onChange={
          setEmployeeId
        }
      />

      <PrimaryInput
        label="Data"
        placeholder="DD/MM/AAAA"
        value={workDate}
        onChangeText={(
          value
        ) =>
          setWorkDate(
            formatDateInput(
              value
            )
          )
        }
        keyboardType="numeric"
        maxLength={10}
      />

      <PrimaryInput
        label="Hora Inicial"
        placeholder="HH:mm"
        value={startTime}
        onChangeText={(
          value
        ) =>
          setStartTime(
            formatTimeInput(
              value
            )
          )
        }
        keyboardType="numeric"
        maxLength={5}
      />

      <PrimaryInput
        label="Hora Final"
        placeholder="HH:mm"
        value={endTime}
        onChangeText={(
          value
        ) =>
          setEndTime(
            formatTimeInput(
              value
            )
          )
        }
        keyboardType="numeric"
        maxLength={5}
      />

      <PrimaryInput
        label="Turno"
        placeholder="Manhã"
        value={shiftName}
        onChangeText={
          setShiftName
        }
      />

      <PrimaryInput
        label="Observações"
        placeholder="Opcional"
        value={notes}
        onChangeText={
          setNotes
        }
      />

      <PrimaryButton
        title={buttonTitle}
        onPress={
          handleSubmit
        }
      />
    </View>
  );
}