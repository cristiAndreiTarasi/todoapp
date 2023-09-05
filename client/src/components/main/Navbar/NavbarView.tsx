import React from "react";

interface NavbarViewProps {
    isLoggedIn: boolean;
    user: { fName: string, lName: string };
    onNavigateHome: () => void;
    onLogout: () => void;
    onNavigateRegister: () => void;
    onNavigateLogin: () => void;
}

const NavbarView: React.FC<NavbarViewProps> = ({ isLoggedIn, user, onNavigateHome, onLogout, onNavigateRegister, onNavigateLogin }) => {
    return <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <a 
                className="navbar-brand"
                onClick={onNavigateHome}
                style={{ cursor: "pointer" }}
            >{ isLoggedIn ? `${user.fName} ${user.lName}` : "Home Assignment" }</a>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {isLoggedIn
                    ? <button 
                        className="btn btn-danger" 
                        type="button"
                        onClick={onLogout}
                    >Sign Out</button>
                    : <>
                        <button 
                            className="btn btn-success me-md-2" 
                            type="button"
                            onClick={onNavigateRegister}
                        >Sign Up</button>

                        <button 
                            className="btn btn-success" 
                            type="button"
                            onClick={onNavigateLogin}
                        >Sign In</button>
                    </>
                }
            </div>
        </div>
    </nav>;
};

export default NavbarView;
