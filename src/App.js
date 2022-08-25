import "./App.css";
import Navbar from "./componets/includes/Navbar";
import Home from "./componets/screens/Home";
import Login from "./componets/screens/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./componets/screens/Register";
import AppStore, { AppContext } from "./componets/context/AppStore";
import PrivateRouter from "./componets/PrivateRouter";
import { useContext, useEffect, useState } from "react";
function App() {
    return (
        <AppStore>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <PrivateRouter>
                                <Home />
                            </PrivateRouter>
                        }
                    />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </Router>
        </AppStore>
    );
}

export default App;
