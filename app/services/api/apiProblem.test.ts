import { getGeneralAPIProblem } from "./apiProblem"

test("handles cancelled requests", () => {
  expect(getGeneralAPIProblem(0)).toBeNull()
})

test("handles 5xx server errors", () => {
  expect(getGeneralAPIProblem(500)).toEqual({ kind: "server" })
  expect(getGeneralAPIProblem(503)).toEqual({ kind: "server" })
})

test("handles 401 unauthorized", () => {
  expect(getGeneralAPIProblem(401)).toEqual({ kind: "unauthorized" })
})

test("handles 403 forbidden", () => {
  expect(getGeneralAPIProblem(403)).toEqual({ kind: "forbidden" })
})

test("handles 404 not found", () => {
  expect(getGeneralAPIProblem(404)).toEqual({ kind: "not-found" })
})

test("handles other 4xx errors", () => {
  expect(getGeneralAPIProblem(418)).toEqual({ kind: "rejected" })
  expect(getGeneralAPIProblem(422)).toEqual({ kind: "rejected" })
})
