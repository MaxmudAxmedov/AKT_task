import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/user.png";
import MapIcon from "../../assets/map.png";

export default function Sidebar() {
    const { t } = useTranslation()
    return (
        <div className="h-screen w-28 md:w-2/12 p-4 fixed left-0 top-0 z-50 transition-all duration-300">
            <div className="bg-[#3A9A78] rounded-2xl h-full flex flex-col">
                <p className="p-4 text-white text-center hidden md:block">
                    AKT panel
                </p>

                <nav className="flex-1 px-3 pt-4 min-w-20">
                    <NavLink
                        to="/"
                        className="p-3 text-white flex flex-col md:flex-row items-center gap-3 rounded-2xl hover:bg-white/20 transition mb-2"
                    >
                        <img src={UserIcon} alt="users" width={28} />
                        <span className="text-sm hidden xl:inline">{t("users")}</span>
                    </NavLink>

                    <NavLink
                        to="/map"
                        className="p-3 text-white flex flex-col md:flex-row items-center gap-3 rounded-2xl hover:bg-white/20 transition"
                    >
                        <img src={MapIcon} alt="map" width={28} />
                        <span className="text-sm hidden xl:inline">{t("map")}</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}
