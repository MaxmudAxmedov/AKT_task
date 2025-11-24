import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from '../../components/ui/select';

export default function LanguageSelect() {
    const { i18n } = useTranslation();

    const languages = [
        { value: 'uz', label: 'uz', flag: 'UZ' },
        { value: 'en', label: 'en', flag: 'EN' },
    ];

    const currentLang = languages.find(lang => lang.value === i18n.language) || languages[0];

    return (
        <div className='flex justify-end p-3 bg-blue-600 text-white'>
            <Select
                value={i18n.language}
                onValueChange={(value) => i18n.changeLanguage(value)}
            >
                <SelectTrigger className="w-20">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{currentLang.flag}</span>
                    </div>
                </SelectTrigger>

                <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                            <div className="flex items-center gap-2">
                                <span>{lang.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}