import { create } from 'zustand';
import type { User } from '../db/index';
import { db } from '../db/index';

type State = {
    users: User[];
    loading: boolean;
    error: string | null;
};

type Actions = {
    loadUsers: () => Promise<void>;
    addUser: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateUser: (id: number, data: Partial<User>) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
};

export const useUserStore = create<State & Actions>((set, get) => ({
    users: [],
    loading: true,
    error: null,

    loadUsers: async () => {
        set({ loading: true });
        try {
            const users = await db.getAll();
            set({ users, loading: false, error: null });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    addUser: async (data) => {
        await db.add(data);
        await get().loadUsers(); 
    },

    updateUser: async (id, updates) => {
        const user = await db.get(id);
        if (user) {
            await db.update({ ...user, ...updates });
            set((state) => ({
                users: state.users.map((u) => (u.id === id ? { ...u, ...updates, updatedAt: new Date().toISOString() } : u)),
            }));
        }
    },

    deleteUser: async (id) => {
        await db.delete(id);
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
    },
}));