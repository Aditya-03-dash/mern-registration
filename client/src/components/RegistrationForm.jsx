import { useState } from "react";
import { createRegistration } from "../api.js";

const empty = { fullName: "", email: "", phone: "" };

export default function RegistrationForm({ onCreated }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", text: "" });
    try {
      const { data } = await createRegistration(form);
      setStatus({ type: "ok", text: data.message });
      setForm(empty);
      onCreated();
    } catch (err) {
      setStatus({
        type: "err",
        text: err.response?.data?.message || "Network error. Check that the server is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>Your details</h2>

      <label>
        Full name
        <input name="fullName" value={form.fullName} onChange={handleChange} autoComplete="name" required />
      </label>

      <label>
        Email address
        <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" required />
      </label>

      <label>
        Phone number
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save registration"}
      </button>

      {status.text && (
        <p className={`status ${status.type}`} role="status">
          {status.text}
        </p>
      )}
    </form>
  );
}
