import { useState } from 'react';

export default function useLoading(initial = false) {
  const [isLoading, setIsLoading] = useState(initial);
  return { isLoading, setIsLoading };
}
