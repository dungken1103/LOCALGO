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

    // Check Availability
    checkAvailability: async (slug, startDate, endDate) => {
        try{
            const url = `/cars/check-availability/${slug}`;
            const params = { startDate, endDate };
            
            const response = await apiClient.get(url, params);
            return response.data;   
        }catch(error){
            console.error('Availability check error:', error);
            throw new Error("Failed to check availability: " + (error.response?.data?.message || error.message));
        }   
    },
    getOwnerCars: async () => {
        try{
            const response = await apiClient.get("/cars/my-cars");
            return response.data;   
        }catch(error){
            throw new Error("Failed to fetch owner's cars: " + (error.response?.data?.message || error.message));
        }
    },

    // Update Car Status
    updateCarStatus: async (slug, status) => {
        try{
            const response = await apiClient.patch(`/cars/${slug}/status`, { status });
            return response.data;   
        }catch(error){
            throw new Error("Failed to update car status: " + (error.response?.data?.message || error.message));
        }
    },

}