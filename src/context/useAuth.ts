import { useContext } from 'react';
import { AuthContext } from './Auth';

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth };
