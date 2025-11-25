import { openDB } from 'idb';
import type { DBSchema } from 'idb';

export interface User {
    id: number;
    name: string;
    last_name: string,
    email: string;
    birthdate: string;
    gender: "male" | "female";
}

interface UserDB extends DBSchema {
    users: {
        key: number;
        value: User;
        indexes: { 'by-email': string };
    };
}

const DB_NAME = 'UserCRUD';
const STORE_NAME = 'users';
const VERSION = 1;

const dbPromise = openDB<UserDB>(DB_NAME, VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            store.createIndex('by-email', 'email', { unique: true });
        }
    },
});

export const db = {
    async getAll(): Promise<User[]> {
        const db = await dbPromise;
        return db.getAll(STORE_NAME);
    },

    async add(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
        const db = await dbPromise;

        return db.add(STORE_NAME, { ...user } as User);
    },

    async update(user: User): Promise<number> {
        const db = await dbPromise;
        const updated = { ...user, updatedAt: new Date().toISOString() };
        return db.put(STORE_NAME, updated);
    },

    async delete(id: number): Promise<void> {
        const db = await dbPromise;
        return db.delete(STORE_NAME, id);
    },

    async get(id: number): Promise<User | undefined> {
        const db = await dbPromise;
        return db.get(STORE_NAME, id);
    },
};
