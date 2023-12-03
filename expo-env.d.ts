export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      EXPO_PUBLIC_AND_UNSAFE_API_KEY: string
      EXPO_PUBLIC_API_BASE_URL: string
    }
  }
}
