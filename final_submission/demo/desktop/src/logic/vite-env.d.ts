/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUMO_LOGIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}