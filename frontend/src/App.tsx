import { Link } from "react-router";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <nav>
        <Link to="/">
          <Dashboard/>
        </Link>
      </nav>
    </>
  );
}

export default App;
