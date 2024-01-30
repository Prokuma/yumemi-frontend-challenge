"use client";
import { APIPrefecture } from "@/api.d";
import React, { Component } from "react";

interface Props {
  prefectures: APIPrefecture[];
  onChange: (checkedPrefectures: APIPrefecture[]) => void;
}
interface State {
  checkedPrefectures: APIPrefecture[];
}

export default class PrefecturesCheckBoxes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checkedPrefectures: [],
    };
  }

  handleCheck(prefecture: APIPrefecture) {
    const checkedPrefectures = this.state.checkedPrefectures;
    const index = checkedPrefectures.indexOf(prefecture);
    if (index > -1) {
      checkedPrefectures.splice(index, 1);
    } else {
      checkedPrefectures.push(prefecture);
    }
    this.setState({ checkedPrefectures: checkedPrefectures });
    this.props.onChange(checkedPrefectures);
  }

  render() {
    return (
      <div>
        {this.props.prefectures.map((prefecture, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={prefecture.prefCode.toString()}
                name={prefecture.prefName}
                value={prefecture.prefName}
                onChange={() => this.handleCheck(prefecture)}
              />
              <label htmlFor={prefecture.prefCode.toString()}>
                {prefecture.prefName}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
