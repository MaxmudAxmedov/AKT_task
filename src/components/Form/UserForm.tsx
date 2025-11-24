import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/UserStore';
import { Card, CardContent } from '../ui/card';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import type { User } from '../../db';
import { createUserSchema, type CreateUserFormData } from '../../schema/validationSchema';
import { CustomInput } from '../Input/CustomInput';
import { RadioInput } from '../Input/RadioInput';

type UserFormProps = {
    onToggle?: () => void;
    initialData?: User | null;
};
export function UserForm({ onToggle, initialData, }: UserFormProps) {
    const { addUser, updateUser } = useUserStore();
    const isEdit = !!initialData?.id;
    const form = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: initialData
            ? {
                name: initialData.name,
                last_name: initialData.last_name,
                email: initialData.email,
                birthdate: initialData.birthdate,
                gender: initialData.gender,
            }
            : {
                name: '',
                last_name: '',
                email: '',
                birthdate: '',
                gender: undefined,
            },
    });


    const onSubmit = async (data: CreateUserFormData) => {
        try {
            if (isEdit && initialData?.id) {
                await updateUser(initialData.id, data);
                toast.success("Ma'lumotlar yangilandi!");
            } else {
                await addUser(data);
                toast.success("Yangi foydalanuvchi qo'shildi!");
            }
            onToggle?.();
            form.reset();
        } catch (err: any) {
            const message =
                err.message?.includes('unique')
                    ? 'Bu email allaqachon ishlatilgan!'
                    : err.message || 'Xatolik yuz berdi';

            toast.error(message);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomInput control={form.control} name="name" label="Ism" placeholder="Isim.." />
                        <CustomInput control={form.control} name="last_name" label="Familya" placeholder="Familya..." />
                        <CustomInput control={form.control} name="email" label="Email" type="email" placeholder="test@gmail.com" />
                        <CustomInput control={form.control} name="birthdate" label="Tug'ilgan sana" type="date" />

                        <RadioInput
                            control={form.control}
                            name="gender"
                            label="Jins"
                            options={[
                                { value: "male", label: "Erkak" },
                                { value: "female", label: "Ayol" },
                            ]}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm mr-2" />
                                    Saqlanmoqda...
                                </>
                            ) : (
                                "Qo'shish"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}