import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationDetails from "./pages/ApplicationDetails";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={`/application/:id`} element={<ApplicationDetails />} />
      </Routes>
    </>
  );
}

export default App;