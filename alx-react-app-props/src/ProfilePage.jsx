import UserInfo from './UserInfo';
import { useContext } from 'react';
import UserContext from './UserContext';

function ProfilePage() {
  const userData = useContext(UserContext);
  return <UserInfo />;
}

export default ProfilePage; 