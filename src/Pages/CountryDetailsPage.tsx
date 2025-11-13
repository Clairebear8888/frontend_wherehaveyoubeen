import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Country } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

function CountryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get<Country>(`${API_URL}/countries/${id}`)
        .then((response) => {
          setCountry(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      axios
        .delete(`${API_URL}/countries/${id}`)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteMemory = (memoryId: number) => {
    if (window.confirm("Delete this memory?")) {
      axios
        .delete(`${API_URL}/memories/${memoryId}`)
        .then(() => {
          setCountry((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              memories: prev.memories?.filter((m) => m.id !== memoryId),
            };
          });
        })
        .catch((error) => console.error(error));
    }
  };

  if (loading) return <div className="loading">Loading country details...</div>;
  if (!country) return <div className="error">Country not found</div>;

  return (
    <div className="country-details">
      <div className="country-header">
        <h1>
          {country.flagEmoji} {country.name}
        </h1>
      </div>

      <div className="country-info">
        <p>
          <strong>📍 Favorite City:</strong>{" "}
          {country.favoriteCity || "Not specified"}
        </p>
        <p>
          <strong>🍽️ Favorite Food:</strong>{" "}
          {country.favoriteFood || "Not specified"}
        </p>
        <p>
          <strong>📅 Visited:</strong>{" "}
          {country.visitedDate
            ? new Date(country.visitedDate).toLocaleDateString()
            : "Date not specified"}
        </p>
      </div>

      <div className="btn-group">
        <Link to={`/countries/${id}/edit`}>
          <button className="btn-secondary">Edit Country</button>
        </Link>
        <button onClick={handleDelete} className="btn-delete">
          Delete Country
        </button>
      </div>

      <hr />

      <div className="memories-section">
        <h2>💭 Memories ({country.memories?.length || 0})</h2>
        <Link to={`/countries/${id}/memories/new`}>
          <button className="btn-primary">Add Memory</button>
        </Link>

        <div style={{ marginTop: "2rem" }}>
          {country.memories && country.memories.length > 0 ? (
            country.memories.map((memory) => (
              <div key={memory.id} className="memory-card">
                <h3>{memory.title}</h3>
                <p>
                  <strong>📍 Location:</strong>{" "}
                  {memory.location || "Not specified"}
                </p>
                <p>{memory.description}</p>
                <div className="btn-group">
                  <Link to={`/memories/${memory.id}/edit`}>
                    <button className="btn-secondary">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteMemory(memory.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p
              style={{ textAlign: "center", color: "#999", marginTop: "2rem" }}
            >
              No memories yet. Start adding some! ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetailsPage;
