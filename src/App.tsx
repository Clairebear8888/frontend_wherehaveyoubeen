import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "../src/Pages/HomePage";
import CountryDetailsPage from "../src/Pages/CountryDetailsPage";
import CountryFormPage from "../src/Pages/CountryFormPage";
import MemoryFormPage from "../src/Pages/MemoryFormPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:id" element={<CountryDetailsPage />} />
        <Route path="/countries/new" element={<CountryFormPage />} />
        <Route path="/countries/:id/edit" element={<CountryFormPage />} />
        <Route
          path="/countries/:countryId/memories/new"
          element={<MemoryFormPage />}
        />
        <Route path="/memories/:id/edit" element={<MemoryFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
