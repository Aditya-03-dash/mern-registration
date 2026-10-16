export default function RegistrationList({ items, loading, error, onDelete }) {
  return (
    <section className="panel">
      <h2>
        Registered people <span className="count">{items.length}</span>
      </h2>

      {error && <p className="status err">{error}</p>}
      {loading && <p className="muted">Loading...</p>}
      {!loading && !error && items.length === 0 && (
        <p className="muted">Nobody has registered yet. Fill in the form to add the first entry.</p>
      )}

      <ul className="list">
        {items.map((r) => (
          <li key={r._id}>
            <div>
              <strong>{r.fullName}</strong>
              <span>{r.email}</span>
              <span>{r.phone}</span>
            </div>
            <button className="ghost" onClick={() => onDelete(r._id)} aria-label={`Delete ${r.fullName}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
