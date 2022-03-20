/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
