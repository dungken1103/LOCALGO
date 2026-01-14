import { useQuery } from '@tanstack/react-query';
// import { getCarDetails } from '../services/api';
import { carService } from '../services/carService';

export const Carkey = {
    all:["cars"],
    list:() => [...Carkey.all, 'list'],
     details: (slug) => [...Carkey.all, 'detail', slug],
}

export const useCar = () => {
    return useQuery({
        queryKey: Carkey.list(),
        queryFn: async () => {
            const response = await carService.getAllCars();
            // console.log('useCar received data:', response);
            return response;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        // onError: (error) => {
        //     // console.error('useCar query error:', error);
        // }
    });
}   
export const useCarDetails = (slug) => {
    return useQuery({
        queryKey: Carkey.details(slug),
        queryFn: async () => {
            const response = await carService.getCarBySlug(slug);
            return response;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}