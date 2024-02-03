/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import setupEnv from "./setupEnv";
import "cross-fetch/polyfill";
import ResizeObserverModule from "resize-observer-polyfill";
import "@testing-library/jest-dom";
import PrefecturesCheckBoxes from "../app/checkboxes";
import { getPrefectures } from "../api";

global.ResizeObserver = ResizeObserverModule;

describe("Rendering", () => {
  it("should render the heading", () => {
    const prefectures = [
      {
        prefCode: 1,
        prefName: "北海道",
      },
      {
        prefCode: 2,
        prefName: "青森県",
      },
    ];
    render(
      <PrefecturesCheckBoxes prefectures={prefectures} onChange={async () => {}} />,
    );
  });

  it("should render the heading with API", async () => {
    await setupEnv();
    const prefectures = await getPrefectures();
    render(
      <PrefecturesCheckBoxes prefectures={prefectures} onChange={async () => {}} />,
    );
  });

  it("should be checked", async () => {
    const prefectures = [
      {
        prefCode: 1,
        prefName: "北海道",
      },
      {
        prefCode: 2,
        prefName: "青森県",
      },
    ];
    var checked: any[] = [];
    render(
      <PrefecturesCheckBoxes
        prefectures={prefectures}
        onChange={async (checkedPrefectures) => {
          checked = checkedPrefectures;
        }}
      />,
    );
    await waitFor(() => {
      const checkbox = screen.getByLabelText("北海道");
      expect(checkbox).not.toBeChecked();
      checkbox.click();
      expect(checkbox).toBeChecked();
      expect(checked).toEqual([prefectures[0]]);
    });
  });

  it("should be checked with API", async () => {
    await setupEnv();
    const prefectures = await getPrefectures();
    var checked: any[] = [];
    render(
      <PrefecturesCheckBoxes
        prefectures={prefectures}
        onChange={async (checkedPrefectures) => {
          checked = checkedPrefectures;
        }}
      />,
    );
    await waitFor(() => {
      const checkbox = screen.getByLabelText("北海道");
      expect(checkbox).not.toBeChecked();
      checkbox.click();
      expect(checkbox).toBeChecked();
      expect(checked).toEqual([prefectures[0]]);
    });
  });
});
