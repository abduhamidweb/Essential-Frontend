import Controller from "./sections/Controller";
import Title from "./sections/Title";
import Data from "./data/Data";
const App = () => {

  return (
    <>
      <div className="container">
        <Data/>
        <Title />
        <Controller />
      </div>

    </>
  );
};

export default App;