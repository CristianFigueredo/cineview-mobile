export type GeneralApiProblem =
  /** Request timed out. Safe to retry. */
  | { kind: "timeout"; temporary: true }
  /** Cannot reach the server. Safe to retry. */
  | { kind: "cannot-connect"; temporary: true }
  /** Any 5xx server error. */
  | { kind: "server" }
  /** 401 — not authenticated. */
  | { kind: "unauthorized" }
  /** 403 — not authorized. */
  | { kind: "forbidden" }
  /** 404 — resource not found. */
  | { kind: "not-found" }
  /** Any other 4xx client error. */
  | { kind: "rejected" }
  /** Unexpected error. Safe to retry. */
  | { kind: "unknown"; temporary: true }
  /** Response data was not in the expected format. */
  | { kind: "bad-data" }

/**
 * Maps an HTTP status code to a typed GeneralApiProblem.
 * Returns null for cancelled requests (status 0).
 */
export function getGeneralAPIProblem(status: number): GeneralApiProblem | null {
  if (status === 0) return null // cancelled / aborted

  if (status >= 500) return { kind: "server" }

  switch (status) {
    case 401:
      return { kind: "unauthorized" }
    case 403:
      return { kind: "forbidden" }
    case 404:
      return { kind: "not-found" }
    default:
      return { kind: "rejected" }
  }
}
