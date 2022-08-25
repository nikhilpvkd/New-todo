import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppStore";

const DoneItem = ({ item, setDelete }) => {
    const { state } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const handleClick = (e) => {
        setLoading(true);
        axios

            .delete(
                `https://api-nodejs-todolist.herokuapp.com/task/${item._id}`,

                {
                    headers: {
                        Authorization: `Bearer ${state.userData.token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setDelete(res);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <>
            <Container>
                <h5>{item.description}</h5>
                <Compleate onClick={handleClick}>
                    {loading ? "Deleting..." : "Delete"}
                </Compleate>
            </Container>
        </>
    );
};

export default DoneItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Compleate = styled.button`
    height: 30px;
`;
