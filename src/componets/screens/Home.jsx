import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppStore";
import DoneItem from "../includes/DoneItem";
import EnterFeild from "../includes/EnterFeild";
import Navbar from "../includes/Navbar";
import TodoItem from "../includes/TodoItem";

const Home = () => {
    const [submit, setSubmit] = useState({});
    const [Done, setDone] = useState({});
    const [dlt, setDelete] = useState({});
    const { state } = useContext(AppContext);
    const [todoList, setTodo] = useState([]);
    const [completed, setCompleated] = useState([]);
    const [count, setCount] = useState(0);
    const getAllTasks = () => {
        axios
            .get("https://api-nodejs-todolist.herokuapp.com/task", {
                headers: {
                    Authorization: `Bearer ${state.userData.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    let tds = [];
                    let dn = [];
                    setCount(res.data.count);
                    res.data.data.forEach((item) => {
                        if (!item.completed) {
                            tds.push(item);
                        } else {
                            dn.push(item);
                        }
                    });
                    setTodo(tds);
                    setCompleated(dn);
                }
            })
            .catch((err) => {});
    };
    useEffect(() => {
        getAllTasks();
    }, [submit, Done, dlt]);
    return (
        <Container>
            <Navbar count={count} />
            <Heading>ToDo List</Heading>
            {todoList.map((item) => (
                <TodoItem item={item} setDone={setDone} key={item._id} />
            ))}
            <EnterFeild setSubmit={setSubmit} />
            <h4>Compleated Tasks</h4>
            {completed.map((item) => (
                <DoneItem item={item} key={item._id} setDelete={setDelete} />
            ))}
        </Container>
    );
};

export default Home;

const Container = styled.section`
    width: 85%;
    margin: 0 auto;
`;
const Heading = styled.h3``;
