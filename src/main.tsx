import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@global/global.scss';
import { AuthProvider } from '@context/Auth';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,

    document.getElementById('__app')
);
