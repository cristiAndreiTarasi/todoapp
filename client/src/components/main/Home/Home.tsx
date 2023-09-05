import React, { useEffect } from "react";

const jumboStyle = {
    minHeight: '100vh',       // This will cover the whole height
    display: 'flex',
    alignItems: 'center',     // Vertically centers the text
    justifyContent: 'center'  // Horizontally centers the text
};

const textStyle = {
    fontSize: '2.5rem' ,
    color: "rgba(255, 255, 255, 0.5)"       // Makes text larger
};

const Navbar: React.FC = () => (
    <div className="container-fluid bg-dark" style={jumboStyle}>
        <div className="text-center" style={textStyle}>
            Sign up or log into your account to manage your tasks.
        </div>
    </div>
);

export default Navbar;