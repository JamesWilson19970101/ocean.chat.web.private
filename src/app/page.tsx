// /app/page.tsx
import { redirect } from 'next/navigation';

// This component will now redirect users from the root path '/' to '/login'
export default function Home() {
  // Immediately redirect to the login page
  redirect('/login');

  // Since redirect() throws an error to stop rendering and initiate the redirect,
  // technically nothing below it will execute. Return null or minimal JSX.
  return <div>Redirect incorrectly!</div>;
}
