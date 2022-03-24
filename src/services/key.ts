import { genKeys } from './e2ee';

function genKeyAndSave() {
    const keys = genKeys();

    localStorage.setItem('@chat-app:keys', JSON.stringify(keys));
}

export { genKeyAndSave };
