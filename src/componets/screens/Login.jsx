import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppStore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        password: "",
        email: "",
        error: null,
    });
    const { email, password, error } = data;
    const { Dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        if (!email || !password) {
            setData({ ...data, error: "All feilds are required" });
        }

        axios
            .post("https://api-nodejs-todolist.herokuapp.com/user/login", {
                email,
                password,
            })
            .then((res) => {
                if (res.status === 200) {
                    let data = res.data;
                    Dispatch({
                        type: "USER_LOGIN",
                        payload: {
                            name: data.user.name,
                            token: data.token,
                            isVerified: true,
                        },
                    });
                    // localStorage.setItem(
                    //     "userData",
                    //     JSON.stringify({
                    //         name: data.user.name,
                    //         token: data.token,
                    //         isVerified: true,
                    //     })
                    // );
                    setLoading(false);
                    setData({ email: "", password: "", error: null });
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setData({ ...data, error: error.response.data });
                }
            });
    };
    return (
        <Container>
            <h3>Log in to accound</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="email">Email : </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password : </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                {data.error && <p className="error">{error}</p>}
                <div className="btn_container">
                    <button
                        className="btn"
                        type="submit"
                        style={{ marginRight: "10px" }}
                    >
                        {loading ? "Loging in..." : "Login "}
                    </button>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </form>
        </Container>
    );
};

export default Login;

const Container = styled.section`
    width: 80%;
    margin: 0 auto;
`;
