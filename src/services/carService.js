import { get } from "react-hook-form";
import { apiClient } from "../utils/apiClient";


export const carService = {
    getAllCars: async () => {
        // Implementation to fetch all cars
        try{
            // console.log('Fetching all cars from /cars endpoint');
            const response = await apiClient.get("/cars");
            // console.log('Cars API response:', response);
            return response.data;   
        }catch(error){
            // console.error('Error fetching cars:', error.message, error.response?.data);
            throw new Error("Failed to fetch cars: " + (error.response?.data?.message || error.message));
            
        }
    },
    getCarBySlug: async (slug) => {
        // Implementation to fetch a car by slug
        try{
            const response = await apiClient.get(`/cars/${slug}`);
            return response.data;   
        }catch(error){
            throw new Error("Failed to fetch car by slug: " + (error.response?.data?.message || error.message));
        }
    },

    // Create Car
    createCar: async (carData) => {
        try{
            const response = await apiClient.post("/cars", carData);
            return response.data;   
        }catch(error){
            throw new Error("Failed to create car: " + (error.response?.data?.message || error.message));
        }   
    },

    // Update Car
    updateCar: async (slug, carData) => {
        try{
            const response = await apiClient.put(`/cars/${slug}`, carData);
            return response.data;   
        }catch(error){
            throw new Error("Failed to update car: " + (error.response?.data?.message || error.message));
        }   
    },

}