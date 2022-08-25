import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./reducer";
const initialState = {
    userData: {
        name: "",
        token: "",
        isVerified: false,
    },
};

const AppStore = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [state, Dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        let Userdata = JSON.parse(localStorage.getItem("userData"));

        Dispatch({
            type: "USER_UPDATE",
            payload: Userdata,
        });

        setLoading(false);
    }, []);

    return loading ? (
        <h1>loading..</h1>
    ) : (
        <AppContext.Provider value={{ state, Dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const AppContext = createContext(initialState);
export default AppStore;
