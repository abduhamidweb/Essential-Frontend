import Data from "./data/Data";
import Router from "./Constant/router";
import { useNavigate } from "react-router-dom";
const App = () => {
  const token = localStorage.getItem('token');
  let navigate = useNavigate()
  if (!token) {
    console.log("Token yok, oturumu doğrulama işlemi yapılabilir");
    navigate("/auth");
  }

  // Token var, doğrulama işlemleri yapılmış sayılabilir
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