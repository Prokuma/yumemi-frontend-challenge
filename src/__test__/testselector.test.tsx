/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "cross-fetch/polyfill";
import ResizeObserverModule from "resize-observer-polyfill";
import "@testing-library/jest-dom";
import DataTypeSelector from "../app/typeselector";

global.ResizeObserver = ResizeObserverModule;

describe("Rendering", () => {
  it("should render the heading", () => {
    const labels = ["label1", "label2"];
    render(<DataTypeSelector labels={labels} />);
  });

  it("should be checked", () => {
    const labels = ["label1", "label2"];
    var selected: string = "";
    render(
      <DataTypeSelector
        labels={labels}
        onChange={(selectedLabel) => {
          selected = selectedLabel;
        }}
      />,
    );

    expect(selected).toBe("");
    fireEvent.change(screen.getByTestId("type"), {
      target: { value: "label1" },
    });
    expect(screen.getByTestId("type")).toHaveValue("label1");
    expect(selected).toBe("label1");
    fireEvent.change(screen.getByTestId("type"), {
      target: { value: "label2" },
    });
    expect(selected).toBe("label2");
  });
});
