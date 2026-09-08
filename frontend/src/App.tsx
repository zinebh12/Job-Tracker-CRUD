import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationDetails from "./pages/ApplicationDetails";
import { useState, useEffect } from "react";
import Toast from "./components/states/Toast";
import type { ToastState } from "./types/applications";
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
        <Route path="/" element={<Dashboard setToast={setToast} />} />
        <Route
          path={`/application/:id`}
          element={<ApplicationDetails setToast={setToast} />}
        />
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
