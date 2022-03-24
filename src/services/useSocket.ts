import socket, { Socket } from 'socket.io-client';

async function useSocket(token: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
        const io = socket(import.meta.env.VITE_BACKEND_URL, {
            auth: {
                token,
            },
        });

        io.on('connect', () => {
            resolve(io);
        });
    });
}

export { useSocket };
