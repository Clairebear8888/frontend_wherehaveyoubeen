import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Memory } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

interface MemoryFormData {
  title: string;
  description: string;
  location: string;
  countryId: string;
}

function MemoryFormPage() {
  const { countryId, id } = useParams<{ countryId?: string; id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<MemoryFormData>({
    title: "",
    description: "",
    location: "",
    countryId: countryId || "",
  });

  useEffect(() => {
    if (isEditing && id) {
      axios
        .get<Memory>(`${API_URL}/memories/${id}`)
        .then((response) => {
          const memory = response.data;
          setFormData({
            title: memory.title,
            description: memory.description,
            location: memory.location || "",
            countryId: memory.countryId.toString(),
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id, isEditing]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = isEditing
      ? axios.put<Memory>(`${API_URL}/memories/${id}`, formData)
      : axios.post<Memory>(`${API_URL}/memories`, formData);

    request
      .then((response) => {
        navigate(`/countries/${response.data.countryId}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-container">
      <h1>{isEditing ? "✏️ Edit Memory" : "💭 Add New Memory"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Sunset at Mt. Fuji"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Mt. Fuji, Shizuoka"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about this special moment..."
          />
        </div>

        <button type="submit" className="btn-primary">
          {isEditing ? "Update Memory" : "Create Memory"}
        </button>
      </form>
    </div>
  );
}

export default MemoryFormPage;
