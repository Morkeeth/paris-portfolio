import { redirect } from 'next/navigation';

// Fable is the hero. Root lands on it; the "same brief, four models"
// comparison lives at /compare (linked from Fable's footer).
export default function Home() {
  redirect('/fable');
}
