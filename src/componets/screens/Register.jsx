import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppStore";
import styled from "styled-components";
import { useNavigate } from "react-router";
const Register = () => {
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        error: null,
    });
    const { name, email, password, age, error } = Data;
    const { Dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };
    const handleSubmite = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !age) {
            setData({ ...Data, error: "All feilds are required" });
        } else if (name && email && password && age) {
            setData({ ...Data, error: null });
            createUser();
        }
    };
    const createUser = async () => {
        setLoading(true);
        axios
            .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
                name,
                email,
                password,
                age,
            })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/login");
                    setLoading(false);
                    setData({
                        name: "",
                        email: "",
                        age: "",
                        password: "",
                        error: null,
                    });
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setData({ ...Data, error: error.response.data });
                    setLoading(false);
                }
            });
    };

    return (
        <Container>
            <h3>Create an accound</h3>
            <form className="form" onSubmit={handleSubmite}>
                <div className="input_container">
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="input_container">
                    <label htmlFor="age">Age : </label>
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={handleChange}
                    />
                </div>
                {Data.error && <p className="error">{error}</p>}
                <div className="btn_container">
                    <button className="btn" type="submit">
                        {loading ? "Creating...." : "Register"}
                    </button>
                </div>
            </form>
        </Container>
    );
};

export default Register;
const Container = styled.section`
    width: 80%;
    margin: 0 auto;
`;
