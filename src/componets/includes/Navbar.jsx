import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { AppContext } from "../context/AppStore";
const Navbar = ({ count }) => {
    const { state, Dispatch } = useContext(AppContext);

    const handleClick = () => {
        localStorage.setItem(
            "userData",
            JSON.stringify({
                name: "",
                token: "",
                isVerified: false,
            })
        );
        Dispatch({
            type: "USER_LOGOUT",
            payload: {
                name: "",
                token: "",
                isVerified: false,
            },
        });
    };
    return (
        <Container>
            <h1>Todo App</h1>
            <Notification>
                <h4 style={{ color: "red" }}>Notification-{count}</h4>
                <LogoutButton onClick={handleClick}>LogOut</LogoutButton>
            </Notification>
        </Container>
    );
};

export default Navbar;
const Container = styled.section`
    display: flex;
    gap: 60%;
    width: 100%;
    h3 {
        margin-left: 30px;
    }
`;
const Notification = styled.div`
    margin-right: 30px;
`;
const LogoutButton = styled.button``;
