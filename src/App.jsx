import Data from "./data/Data";
import Router from "./Constant/router";
import { useState } from "react";
import API from "./API/API";
const App = () => {
  const [sa, asxd] = useState('');

  async function submit(e) {
    e.preventDefault();
    let as = await API.API.postUser(sa)
    console.log('as :', as);
  }
  return (
    <>
      <div className="container">
        <Data />
        <Router />
      </div>
      {/* <form onSubmit={(e) => submit(e)}>
        <input type="text" className="form-control mt-2" value={sa} onChange={(e) => asxd(e.target.value)} />
        <button type="submit">submit</button>
      </form> */}
    </>
  );
};

export default App;