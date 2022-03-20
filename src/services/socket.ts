import socket from 'socket.io-client';

const io = socket(import.meta.env.VITE_BACKEND_URL);

export default io;
