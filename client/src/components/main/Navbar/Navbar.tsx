import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { logout } from "../../../features/auth/slices/authSlice";
import NavbarView from "./NavbarView";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return <NavbarView
        isLoggedIn={isLoggedIn}
        user={user}
        onNavigateHome={() => navigate("/")}
        onLogout={handleLogout}
        onNavigateRegister={() => navigate("/register")}
        onNavigateLogin={() => navigate("/login")}
    />;
};

export default Navbar;