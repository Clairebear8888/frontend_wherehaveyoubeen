import api from "./api";
import { Country } from "../types/country";

export async function getCountries() {
  const { data } = await api.get("/countries");
  return data;
}

export async function getCountryById(id: string) {
  const { data } = await api.get(`/countries/${id}`);
  return data;
}

export async function createCountry(country: Country) {
  const { data } = await api.post("/countries", country);
  return data;
}

export async function updateCountry(id: string, country: Country) {
  const { data } = await api.put(`/countries/${id}`, country);
  return data;
}

export async function deleteCountry(id: string) {
  await api.delete(`/countries/${id}`);
}
