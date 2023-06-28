import { Route, Routes } from "react-router-dom";
import Playgame from "../sections/Playgame";
import Title from "../sections/Title";
import Controller from "../sections/Controller";

const router = () => {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<Title />} /> */}
                <Route path="/" element={<Controller />} />
                <Route path="/playgame" element={<Playgame />} />
            </Routes>
        </>
    );
};

export default router;