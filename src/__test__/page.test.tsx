/**
 * @jest-environment jsdom
 */
import React from "react";
import "cross-fetch/polyfill";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Rendering", () => {
  it("should render the heading", () => {
    render(<Home />);
  });
});
