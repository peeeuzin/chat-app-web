import axios from './axios';
import {} from 'browser-crypto';

function SendMessage(text: string) {
    axios.post('/message/create', {
        message: text,
    });
}

export { SendMessage };
