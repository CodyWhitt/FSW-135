import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

export default function ProtectedRoute({Component}) { 

    const { token } = useContext(UserContext)

    function isToken(token) {
        if (token == '') {
            return false
        } else {
            return true
        }
    }

    return isToken(token) ? <Component/> : <Navigate to='/' />
}