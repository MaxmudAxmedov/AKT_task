import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-blue-600 h-screen w-2/12">
            <p className={"p-3 text-white"} >User panel</p>
            <div className="flex flex-col">
                <NavLink className={"p-3 text-white"} to={'/'}>Users</NavLink>
                <NavLink className={"p-3 text-white"} to={'map'}>Map</NavLink>
            </div>
        </div>
    )
}
