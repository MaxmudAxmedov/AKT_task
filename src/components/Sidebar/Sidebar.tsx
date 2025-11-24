import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const { t } = useTranslation()
    return (
        <div className="bg-blue-600 h-screen w-2/12">
            <p className={"p-4 text-white mb-2"} >User panel</p>
            <div className="flex flex-col">
                <NavLink className={"p-3 text-white"} to={'/'}>{t('users')}</NavLink>
                <NavLink className={"p-3 text-white"} to={'map'}>{t("map")}</NavLink>
            </div>
        </div>
    )
}
