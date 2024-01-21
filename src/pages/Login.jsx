import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.scss";

const LoginPage = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("dragonLoggedIn"));

    const hardcodedUser = {
        user: "daenerys",
        password: "dracarys"
    };

    const onLogin = () => {

        if (user === hardcodedUser.user && password === hardcodedUser.password) {
            sessionStorage.setItem("dragonLoggedIn", "true");
            setLoggedIn(true);
        } else if (user === hardcodedUser.user) {
            alert("Senha incorreta");
        } else {
            alert("Usuário não encontrado");
        }
    };

    if (loggedIn) {
        return <Navigate to="/"></Navigate>
    };


    return (
        <div className="login-container">
            <p>Login</p>
            <form>
                <input type="text" value={user} onChange={(event) => setUser(event.target.value)} placeholder="Usuário" required />
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha" required />
                <button type="submit" onClick={onLogin}>Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;
