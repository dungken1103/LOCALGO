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

export const useCarAvailability = (slug, startDate, endDate) => {
    const isEnabled = !!slug && !!startDate && !!endDate && startDate.trim() !== '' && endDate.trim() !== '';
    
    console.log('useCarAvailability called with:', { slug, startDate, endDate, isEnabled });
    
    return useQuery({
        queryKey: [...Carkey.all, 'availability', slug, startDate, endDate],
        queryFn: async () => {
            console.log('Query function executing with:', { slug, startDate, endDate });
            const response = await carService.checkAvailability(slug, startDate, endDate);
            return response;
        },
        enabled: isEnabled, // Chỉ chầy khi có đầy đủ thông tin và không rỗng
        staleTime: 1 * 60 * 1000, // 1 minute
        retry: false, // Không retry nếu lỗi
    });
}

export const useOwnerCars = () => {
    return useQuery({
        queryKey: [...Carkey.all, 'owner-cars'],
        queryFn: async () => {
            const response = await carService.getOwnerCars();
            return response;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}