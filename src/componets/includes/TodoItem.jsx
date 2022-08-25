import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppStore";

const TodoItem = ({ item, setDone }) => {
    const { state } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        setLoading(true);
        axios
            .put(
                `https://api-nodejs-todolist.herokuapp.com/task/${item._id}`,
                {
                    completed: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setDone(res);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <Container>
            <h5>{item.description}</h5>
            <Compleate onClick={handleClick}>
                {loading ? "compleating..." : "compleated"}
            </Compleate>
        </Container>
    );
};

export default TodoItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Compleate = styled.button`
    height: 30px;
`;
