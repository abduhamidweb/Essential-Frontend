import { Route, Routes } from "react-router-dom";
import Playgame from "../sections/Playgame";
import Controller from "../sections/Controller";
import AUH from "../Layout/AUTH/AUH";

const router = () => {

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