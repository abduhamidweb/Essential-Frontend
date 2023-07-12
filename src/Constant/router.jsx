import { Route, Routes, useNavigate } from "react-router-dom";
import Playgame from "../sections/Playgame";
import Controller from "../sections/Controller";
import AUH from "../Layout/AUTH/AUH";

const router = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem("token");
    if (!token) navigate("/auth");
    return (
        <>
            <Routes>
                <Route path="/" element={<Controller />} />
                <Route path="/playgame" element={<Playgame />} />
                <Route path="/auth" element={<AUH />} />
            </Routes>
        </>
    );
};

export default router;