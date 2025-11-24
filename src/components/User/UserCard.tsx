
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/UserStore';
import { useState } from 'react';
import type { User } from '../../db';
import { Button } from '../../components/ui/button';
import { useDisclosure } from '../../hook/useDisclosure';
import { useTranslation } from 'react-i18next';


type UserCardProps = {
    user: User;
    onEdit: (id: number) => void;
};

export function UserCard({ user, onEdit }: UserCardProps) {
    const { deleteUser } = useUserStore();
    const { isOpen, onToggle } = useDisclosure();
    const [reason, setReason] = useState('');
    const { t } = useTranslation()

    const handleDelete = () => {
        if (!reason.trim()) return;
        deleteUser(user.id!);
        toast.success(`${user.name} o'chirildi!`);
        onToggle();
        setReason('');
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center hover:shadow-xl transition">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name[0]}
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{user.name} {user.last_name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{t("birthdate")}: {user.birthdate}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <Button variant="outline" onClick={() => onEdit(user.id!)}>
                    {t("edit")}
                </Button>

                <Dialog open={isOpen} onOpenChange={onToggle}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            {t("delete")}
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-red-600">
                                {t("user_delete_title")}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    <strong>{user.name} {user.last_name}</strong> {t("user_delete_reason")}:
                                </p>
                                <Textarea
                                    placeholder={t("user_delete_message")}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="min-h-28 resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => onToggle()}>
                                    {t("close")}
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={!reason.trim()}
                                >
                                    {t("delete")}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}