import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AppContext } from "./context/AppStore";

const PrivateRouter = ({ children }) => {
    const { state } = useContext(AppContext);
    const verified = state.userData.isVerified;
    return verified ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
