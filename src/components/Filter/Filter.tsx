import { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export type FilterData = {
    minAge?: number;
    maxAge?: number;
    gender?: ('male' | 'female')[];
};

interface FilterProps {
    onApply: (filters: FilterData) => void;
}

const STORAGE_KEY = 'user_filters_v1';

export default function Filter({ onApply }: FilterProps) {
    const loadFiltersFromStorage = (): FilterData => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    };

    const [filters, setFilters] = useState<FilterData>(loadFiltersFromStorage);

    const updateFilters = (newFilters: FilterData) => {
        setFilters(newFilters);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFilters));
        onApply(newFilters);
    };

    const handleMinAge = (value: string) => {
        updateFilters({
            ...filters,
            minAge: value ? Number(value) : undefined,
        });
    };

    const handleMaxAge = (value: string) => {
        updateFilters({
            ...filters,
            maxAge: value ? Number(value) : undefined,
        });
    };

    const toggleGender = (value: 'male' | 'female') => {
        const newGenders = filters.gender?.includes(value)
            ? filters.gender.filter(g => g !== value)
            : [...(filters.gender || []), value];

        updateFilters({
            ...filters,
            gender: newGenders.length > 0 ? newGenders : undefined,
        });
    };

    const clearAll = () => {
        updateFilters({});
    };

    useEffect(() => {
        onApply(filters);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <Label>Yosh oralig‘i</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <Input
                        type="number"
                        placeholder="18"
                        value={filters.minAge ?? ''}
                        onChange={(e) => handleMinAge(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="65"
                        value={filters.maxAge ?? ''}
                        onChange={(e) => handleMaxAge(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label>Jins</Label>
                <div className="mt-3 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.gender?.includes('male') || false}
                            onChange={() => toggleGender('male')}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>Erkak</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.gender?.includes('female') || false}
                            onChange={() => toggleGender('female')}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>Ayol</span>
                    </label>
                </div>
            </div>

            <div className="pt-4 border-t">
                <button
                    onClick={clearAll}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Filterlarni tozalash
                </button>
            </div>
        </div>
    );
}