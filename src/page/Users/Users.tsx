
import { useUserStore } from '../../store/UserStore';
import { UserForm } from '../../components/Form/UserForm';
import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FilterIcon from "../../assets/filter.png";
import { CustomRightDrawer } from '../../components/Drawer/CustomDrawer';
import Filter, { type FilterData } from '../../components/Filter/Filter';
import type { User } from '../../db';
import { useTranslation } from 'react-i18next';
import CustomTable from '../../components/CustomTable/CustomTable';
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog';
import { toast } from 'react-toastify';

export default function Users() {
  const { users, loadUsers, deleteUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState<FilterData>({});
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [deleteReason, setDeleteReason] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const columns = [
    {
      key: "index",
      label: "№",
      render: (_value: any, _row: User, index: number) => (
        <span className="font-medium">{index + 1}</span>
      ),
    },
    {
      key: "name",
      label: t("name"),
    },
    {
      key: "last_name",
      label: t("last_name"),
    },
    {
      key: "email",
      label: t("email"),
    },
    {
      key: "gender",
      label: t("gender"),
    },
    {
      key: "birthdate",
      label: t("birthdate"),
      render: (value: string) => new Date(value).toLocaleDateString("uz-UZ"),
    },
    {
      key: "actions",
      label: <p className="text-center">{t("actions")}</p>,
      render: (_: any, row: User) => (
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.id)}
            className="bg-icons text-aside border-none"
          >
            {t("edit")}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row)}
          >
            {t("delete")}
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    const user = users.find(u => u.id === id);
    setEditingUser(user);
    setIsOpen(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user)
    setDeleteReason("")
    setDeleteDialogOpen(true)
  };

  const handleConfirmDelete = () => {
    if (!deletingUser || !deleteReason.trim()) return

    deleteUser(deletingUser.id)
    setDeleteDialogOpen(false)
    setDeletingUser(null)
    setDeleteReason("")
    toast.success("Foydalanuvchi o‘chirildi")
  }


  const handleOpenCreate = () => {
    setEditingUser(undefined);
    setIsOpen(true);
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const fullText = `${user.name} ${user.last_name} ${user.email} ${user.birthdate}`.toLowerCase();
        if (!fullText.includes(query)) return false;
      }

      const age = new Date().getFullYear() - new Date(user.birthdate).getFullYear();
      if (advancedFilters.minAge && age < advancedFilters.minAge) return false;
      if (advancedFilters.maxAge && age > advancedFilters.maxAge) return false;

      if (advancedFilters.gender && advancedFilters.gender.length > 0) {
        if (!advancedFilters.gender.includes(user.gender as 'male' | 'female')) {
          return false;
        }
      }

      return true;
    });
  }, [users, searchQuery, advancedFilters]);

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex w-full sm:w-auto gap-3">
          <Input
            placeholder={`${t("name")} ${t("email")} ...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDrawerOpen(true)}
            className="shrink-0"
          >
            <img src={FilterIcon} alt="Filter" width={20} height={20} />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>{t("create")}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className='text-center'>
                {editingUser ? t("update_user") : t("create_new_user")}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              initialData={editingUser}
              onToggle={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CustomRightDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={t("filter")}
        onSubmit={() => setDrawerOpen(false)}
      >
        <Filter onApply={setAdvancedFilters} />
      </CustomRightDrawer>

      {deletingUser && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title={t("user_delete_title")}
          entityName={`${deletingUser.name} ${deletingUser.last_name}`}
          reason={deleteReason}
          onReasonChange={setDeleteReason}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeletingUser(null)
            setDeleteReason("")
          }}
        />
      )}

      <div className="mb-4 text-sm text-gray-600">
        {t("all_users")}: <strong>{users.length}</strong> |
        {t("showing")}: <strong>{filteredUsers.length}</strong>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          {searchQuery || Object.keys(advancedFilters).length > 0
            ? "Hech narsa topilmadi"
            : "Hozircha foydalanuvchilar yo‘q"}
        </div>
      ) : (
        <div className="grid gap-4">
          <CustomTable columns={columns} data={filteredUsers} />
        </div>
      )}
    </div>
  );
}