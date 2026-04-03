import BaseConfig, { ConfigBaseProps } from "./config.base"
import ProdConfig from "./config.prod"
import DevConfig from "./config.dev"

export interface AppConfig extends ConfigBaseProps {
  API_URL: string
  API_KEY: string
}

const { API_URL, API_KEY } = __DEV__ ? DevConfig : ProdConfig

if (!API_URL || !API_KEY) {
  const missing = [
    !API_URL && "EXPO_PUBLIC_API_BASE_URL",
    !API_KEY && "EXPO_PUBLIC_AND_UNSAFE_API_KEY",
  ]
    .filter(Boolean)
    .join(", ")
  console.error(
    `[Config] Missing required environment variables: ${missing}\n` +
      "Copy .env.example to .env and fill in the values.",
  )
  throw new Error(`[Config] Missing environment variables: ${missing}`)
}

const Config: AppConfig = {
  ...BaseConfig,
  API_URL,
  API_KEY,
}

export default Config
