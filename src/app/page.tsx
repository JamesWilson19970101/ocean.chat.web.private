// /app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the main chat page; the proxy will handle authentication guards.
  redirect('/chat');
}
