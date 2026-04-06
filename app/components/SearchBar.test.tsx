import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { SearchBar } from "./SearchBar"

describe("SearchBar", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<SearchBar />)
    expect(toJSON()).not.toBeNull()
  })

  it("renders a text input with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<SearchBar />)
    expect(getByPlaceholderText("Search")).toBeTruthy()
  })

  it("calls onQueryChange when the user types", () => {
    const onQueryChange = jest.fn()
    const { getByPlaceholderText } = render(<SearchBar onQueryChange={onQueryChange} />)

    fireEvent.changeText(getByPlaceholderText("Search"), "inception")

    expect(onQueryChange).toHaveBeenCalledTimes(1)
    expect(onQueryChange).toHaveBeenCalledWith("inception")
  })
})
