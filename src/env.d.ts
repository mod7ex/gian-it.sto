/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NAVIGATION_LOADER_DURATION: number
    readonly VITE_CONFIRM_DIALOG_TTL: number
    readonly VITE_AVATAR_MAX_SIZE: number
    readonly VITE_TOAST_TTL: number
    readonly VITE_API_TIMEOUT: number
    readonly VITE_API_BASE_URI: string
    readonly VITE_MAX_ORDERS_COUNT_DIGITS: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}