import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/api/http';

export type Note = { 
  id: number; 
  title: string; 
  content: string; 
  created_at: string;
  updated_at: string; 
};

// Tipo para respuesta de API con paginación
export type NotesResponse = {
  data: Note[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  prev_page_url: string | null;
  next_page_url: string | null;
};

Manejo de argumentos opcionales
export const useNotes = (page: number = 1, search: string = '') =>
  useQuery<NotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: async () => {
      const { data } = await http.get<NotesResponse>('/notes', { 
        params: { page, ...(search && { search }) } // Solo enviar search si existe
      });
      return data;
    },
  });

export const useCreateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Pick<Note, 'title' | 'content'>) => 
      http.post<Note>('/notes', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
};

// CRUD completo desde el inicio
export const useUpdateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Pick<Note, 'title' | 'content'>) => 
      http.put<Note>(`/notes/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
};

export const useDeleteNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => http.delete(`/notes/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
};