import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/user.png";
import MapIcon from "../../assets/map.png";

export default function Sidebar() {
    const { t } = useTranslation()
    return (
        <div className="h-screen w-3/12 p-4">
            <div className="bg-indigo-600 rounded-2xl h-full">
                <p className={"p-4 text-white mb-2 text-center"}>AKT panel</p>
                <div className="flex flex-col">
                    <NavLink className={"p-3 text-white flex items-center gap-2 rounded-2xl"} to={'/'}>
                        <img src={UserIcon} alt="" width={24} />
                        <p>{t('users')}</p>
                    </NavLink>
                    <NavLink className={"p-3 text-white flex items-center gap-2 rounded-2xl"} to={'map'}>
                        <img src={MapIcon} alt="" width={24} />
                        <p>{t("map")}</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
