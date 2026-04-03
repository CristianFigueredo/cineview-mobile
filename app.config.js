/**
 * @param {{ config: import("@expo/config").ExpoConfig }} context
 * @returns {Partial<import("@expo/config").ExpoConfig>}
 */
module.exports = ({ config }) => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    extra: {
      eas: {
        projectId: "da879a06-53cf-4a7c-9ebe-41018a162110",
      },
    },
    updates: {
      url: "https://u.expo.dev/da879a06-53cf-4a7c-9ebe-41018a162110",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: [...existingPlugins],
  }
}
