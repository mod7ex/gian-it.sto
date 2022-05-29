/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly STO_NAVIGATION_LOADER_DURATION: number
    readonly STO_CONFIRM_DIALOG_TTL: number
    readonly STO_AVATAR_MAX_SIZE: number
    readonly STO_TOAST_TTL: number
    readonly STO_API_TIMEOUT: number
    readonly STO_API_BASE_URI: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare global {
    interface window {
        __STO_DEV__: boolean;
    }
}