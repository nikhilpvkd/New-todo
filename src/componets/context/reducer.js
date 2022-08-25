const Reducer = (state, action) => {
    switch (action.type) {
        case "USER_REGISTER":
            return {
                ...state,
                userData: action.payload,
            };
        case "USER_LOGIN":
            const userData = { ...action.payload };

            localStorage.setItem("userData", JSON.stringify(userData));
            let Userdata = JSON.parse(localStorage.getItem("userData"));

            return {
                ...state,
                userData: action.payload,
            };
        case "USER_UPDATE":
            return {
                ...state,
                userData: action.payload,
            };
        case "USER_LOGOUT":
            const userDat = { ...action.payload };

            localStorage.setItem("userData", JSON.stringify(userDat));
            return {
                ...state,
                userData: action.payload,
            };
    }
};
export default Reducer;
