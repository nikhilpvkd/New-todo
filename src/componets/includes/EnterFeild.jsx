import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppStore";

const EnterFeild = ({ setSubmit }) => {
    const [task, setTask] = useState("");
    const { state } = useContext(AppContext);
    const [loading, setLaoding] = useState(false);
    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLaoding(true);
        axios
            .post(
                "https://api-nodejs-todolist.herokuapp.com/task",
                {
                    description: task,
                },
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 201) {
                    setLaoding(false);
                    setTask("");
                    setSubmit(res.data);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setLaoding(false);
            });
    };
    return (
        <div className="input_container">
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task"
                    placeholder="Enter task"
                    onChange={handleChange}
                    value={task}
                />
                <button type="submit">
                    {loading ? "submitting..." : "submit"}
                </button>
            </form>
        </div>
    );
};

export default EnterFeild;
