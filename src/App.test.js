/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch globally for testing
global.fetch = jest.fn();

describe("App Component", () => {
  test("renders header text", () => {
    render(<App />);
    const linkElement = screen.getByText(/Coin Change Calculator/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the first form input text", () => {
    render(<App />);
    const linkElement = screen.getByPlaceholderText(/Target Amount/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the second form input text", () => {
    render(<App />);
    const linkElement = screen.getByPlaceholderText(/Coin Denominations/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the button text", () => {
    render(<App />);
    const linkElement = screen.getByText(/Calculate/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("handles form submission and simulates success - i.e. shows result", async () => {
    // Mock the fetch response for this test
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([2.0, 2.0, 2.0, 2.0, 2.0]), // Mock response data
    });

    const { debug } = render(<App />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Target Amount/i), {
      target: { value: "10" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Coin Denominations/i), {
      target: { value: "0.01, 1, 2" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Calculate/i));

    // Wait for the result to appear
    await waitFor(() => {
      //debug();
      expect(screen.getByText("Result:")).toBeInTheDocument();
      expect(screen.getByText("$2.00 coin X 5")).toBeInTheDocument();
    });

    // Restore the original fetch after the test
    global.fetch = jest.fn();
  });

  test("handles form submission and simulates error - i.e. API failure", async () => {
    // Mock the fetch response for this test
    fetch.mockRejectedValueOnce(new Error("Error Message"));

    render(<App />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Target Amount/i), {
      target: { value: "10" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Coin Denominations/i), {
      target: { value: "0.01, 1, 2" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Calculate/i));

    // Wait for the result to appear
    await waitFor(() => {
      expect(screen.getByText("Error:")).toBeInTheDocument();
      expect(screen.getByText("Error Message")).toBeInTheDocument();
    });

    // Restore the original fetch after the test
    global.fetch = jest.fn();
  });
});
