import Data from "./data/Data";
import Router from "./Constant/router";
import { useNavigate } from "react-router-dom";
const App = () => {

  return (
    <>
      <div className="container">
        <Data />
        <Router />
      </div>

    </>
  );
};

export default App;