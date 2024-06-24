import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import {Toaster } from 'react-hot-toast'
import ServiceEngFormData from "./ServiceEngFormData";
import NavBarForAll from "../../../utils/NavBarForAll";
function ServiceEngForm() {

    return (
        <>
            <NavBarForAll/>
            <Toaster />
            <ServiceEngFormData/>
        </>
    )
}
export default ServiceEngForm