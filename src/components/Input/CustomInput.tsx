import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { type Control, type FieldValues, type Path } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}

export function CustomInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={type === "date" ? field.value || "" : field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}