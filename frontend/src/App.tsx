import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotesPage from './features/notes/NotesPage';

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <NotesPage />
    </QueryClientProvider>
  );
}