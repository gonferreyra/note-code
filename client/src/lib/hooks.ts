import { useQuery } from '@tanstack/react-query';
import { fetchSharedCode } from './utils';

export const useCodeQuery = (id: string) => {
  const {
    isLoading,
    data: code,
    // error,
  } = useQuery({
    queryKey: ['code', id],
    queryFn: () => fetchSharedCode(id!),
    enabled: !!id, // Se ejecuta el query si existe id
  });

  return {
    isLoading,
    code,
    // error,
  };
};
