import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationDetails from "./pages/ApplicationDetails";
import { useState, useEffect } from "react";
import Toast from "./components/states/Toast";
import type { ToastState } from "./types/applications";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/protectedRoutes";
function App() {
  const [toast, setToast] = useState<ToastState>(null);
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast({ type: "", message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register setToast={setToast}  />} />
        <Route path="/login" element={<Login setToast={setToast}  />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard setToast={setToast} />}
          />
          <Route
            path={`/application/:id`}
            element={<ApplicationDetails setToast={setToast} />}
          />
        </Route>
      </Routes>
      {toast?.message && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ type: "", message: "" })}
        />
      )}
    </>
  );
}

export default App;
