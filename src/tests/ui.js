import React from "react";
import { render, fireEvent } from "react-testing-library";
import App from "./App";

describe("App", () => {
  it("should render data from the API", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ],
        totalPages: 1,
      })
    );

    const { getByText } = render(<App />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await wait();

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
  });

  it("should display error when fetch fails", async () => {
    fetch.mockRejectOnce(new Error("Failed to fetch"));

    const { getByText } = render(<App />);

    expect(getByText("Failed to load data").toBeInTheDocument();
  })
});
