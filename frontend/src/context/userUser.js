import { useContext } from 'react';
import AuthContext from './AuthContext';

export default function useUser() {
  return useContext(AuthContext);
}
