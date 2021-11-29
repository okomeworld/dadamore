/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly EMPATH_API_KEY: string;
    }
}