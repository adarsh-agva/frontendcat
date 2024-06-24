import React, { useState } from 'react'
import SideBar from '../../utils/Sidebar'
import { Navbar } from '../../utils/NavBar'
import back from "../../assets/images/back.png";
import Style from "../../css/UpdateProfileWithExperience.module.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineAdd } from "react-icons/md";
import UpdateExperienceDetails from './userProfileModule/UpdateExperienceDetails';
import UserProfileDataWithExp from './userProfileModule/UserProfileDataWithExp';
import NavBarForAll from '../../utils/NavBarForAll';
function UpdateProfiileWithExperience() {
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const userId = adminInfo && adminInfo.data && adminInfo.data._id

    const userInfoReducer = useSelector((state) => state.userInfoReducer);
    const { data } = userInfoReducer;
    // uprofile reducer
    const passwordChangeReducer = useSelector(
        (state) => state.passwordChangeReducer
    );

    const { data: updatepasswordresponseData } = passwordChangeReducer;

    const [name, setname] = useState(localStorage.getItem("name"));

    const [email, setEmail] = useState(localStorage.getItem("email"))

    const [avatar, setAvtar] = useState("")

    const goBack = () => {
        window.history.go(-1)
    }

    return (
        <>
            <NavBarForAll />
            <div
                style={{ position: "absolute", top: "6rem", left: "2rem", width: "90%" }}
            >
                <div
                    className={Style.insideoverview}
                >
                    {/* Heading  */}
                    <div
                        className=""
                        style={{ display: "flex", color: "#707070" }}
                    >
                        <Link onClick={goBack}>
                            <img src={back} style={{ width: "3rem" }} />
                        </Link>
                    </div>
                    <div
                        className={Style.card}
                    >
                        <h4 style={{ fontSize: "1.3rem" }}>Profile Details</h4>
                    </div>
                </div>
                {/* user Details */}
                <UserProfileDataWithExp />
                {/* User Experience */}
                <UpdateExperienceDetails />
            </div>
        </>
    )
}

export default UpdateProfiileWithExperience