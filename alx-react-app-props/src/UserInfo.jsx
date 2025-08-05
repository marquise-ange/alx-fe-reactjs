import UserDetails from './UserDetails';
import { useContext } from 'react';
import UserContext from './UserContext';

function UserInfo() {
  const userData = useContext(UserContext);
  return <UserDetails />;
}

export default UserInfo; 