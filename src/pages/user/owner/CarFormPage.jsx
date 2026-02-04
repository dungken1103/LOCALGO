import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../services/axiosConfig";

export default function CarFormPage({ car, isUpdate = false }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  const [brand, setBrand] = useState(car?.brand || "");
  const [name, setName] = useState(car?.name || "");
  const [color, setColor] = useState(car?.color || "");
  const [type, setType] = useState(car?.type || "SEDAN");
  const [seats, setSeats] = useState(car?.seats || 4);
  const [driveType, setDriveType] = useState(car?.driveType || "SELF_DRIVE");
  const [pricePerDay, setPricePerDay] = useState(car?.pricePerDay || 0);
  const [description, setDescription] = useState(car?.description || "");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("name", name);
      formData.append("color", color);
      formData.append("type", type);
      formData.append("seats", Number(seats));
      formData.append("driveType", driveType);
      formData.append("pricePerDay", Number(pricePerDay));
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const url = isUpdate ? `/cars/${car.id}` : "/cars";
      const method = isUpdate ? "put" : "post";

      const res = await api({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      alert(`${isUpdate ? "Updated" : "Created"} successfully!`);
      navigate("/owners/owner-cars");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-root">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {isUpdate ? "Update Car" : "Add New Car"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-4"
        >
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Model Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="SEDAN">SEDAN</option>
            <option value="SUV">SUV</option>
            <option value="HATCHBACK">HATCHBACK</option>
            <option value="TRUCK">TRUCK</option>
          </select>
          <input
            type="number"
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            min={1}
            className="border p-2 w-full rounded"
          />
          <select
            value={driveType}
            onChange={(e) => setDriveType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="SELF_DRIVE">SELF_DRIVE</option>
            <option value="WITH_DRIVER">WITH_DRIVER</option>
          </select>
          <input
            type="number"
            placeholder="Price per Day"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(Number(e.target.value))}
            min={0}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 w-full rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            {isLoading ? "Saving..." : isUpdate ? "Update Car" : "Create Car"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
