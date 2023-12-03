/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  // TODO: @danger only for demonstration purposes
  API_KEY: process.env.EXPO_PUBLIC_AND_UNSAFE_API_KEY,
}
