import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm.jsx";
import RegistrationList from "./components/RegistrationList.jsx";
import { getRegistrations, deleteRegistration } from "./api.js";

export default function App() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await getRegistrations();
      setRegistrations(data.data);
      setError("");
    } catch {
      setError("Could not load registrations. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setError("Could not delete the registration.");
    }
  };

  return (
    <main className="page">
      <header className="masthead">
        <h1>Register</h1>
        <p>Add your details. Everything you submit is saved to MongoDB through the Express API.</p>
      </header>

      <div className="layout">
        <RegistrationForm onCreated={load} />
        <RegistrationList items={registrations} loading={loading} error={error} onDelete={handleDelete} />
      </div>
    </main>
  );
}
