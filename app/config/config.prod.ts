/**
 * Configuration settings for the production environment.
 *
 * NOTE: Exposing API credentials client-side is not secure for production.
 * In a real app these should be proxied through a backend. This is done
 * directly here for the purposes of this coding challenge only.
 *
 * @see .env.example for setup instructions
 */
export default {
  API_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  API_KEY: process.env.EXPO_PUBLIC_AND_UNSAFE_API_KEY,
}
