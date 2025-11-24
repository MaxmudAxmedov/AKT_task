import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { type Control, type FieldValues, type Path } from "react-hook-form";

interface Option {
    value: string;
    label: string;
}

interface CustomRadioGroupProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: Option[];
}

export function RadioInput<T extends FieldValues>({
    control,
    name,
    label,
    options,
}: CustomRadioGroupProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-row space-x-6"
                        >
                            {options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <label htmlFor={option.value} className="cursor-pointer font-medium">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}