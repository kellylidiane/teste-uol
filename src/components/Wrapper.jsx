import React from "react";
import { Navigate } from "react-router-dom";

import "./Wrapper.scss";

const WrapperComponent = ({ children }) => {
    const loggedIn = !!sessionStorage.getItem("dragonLoggedIn");

    if (!loggedIn) {
        return <Navigate to='/login'></Navigate>
    };

    return (
        <main>
            <div>
                {children}
            </div>
        </main>
    )
};

export default WrapperComponent;

