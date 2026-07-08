import ProfileForm from '../components/ProfileForm';
import { useProfile } from '../context/useProfile';
import calculateTDEE from '../utils/calculateTDEE';
export default function Dashboard() {
  const { profile } = useProfile();

  return (
    <>
      <h1>Dashboard</h1>
      {!profile ? <ProfileForm /> : <p>Rien</p>}
    </>
  );
}
