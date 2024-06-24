import { Link } from "react-router-dom";
import "../../index.css";
import CreateProject from "../projects/CreateProject";
import NavBarForAll from "../../utils/NavBarForAll";

function App() {
  return (
    <div className="App">
      <NavBarForAll/>
      <div className="SideMenuAndPageContent">
        <CreateProject />
      </div>
    </div>
  );
}
export default App;