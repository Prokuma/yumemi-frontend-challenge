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

  handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const checkedPrefectures = this.state.checkedPrefectures;
    const index = checkedPrefectures.findIndex((prefecture) => {
      return prefecture.prefCode === parseInt(e.target.id);
    });

    if (index > -1) {
      checkedPrefectures.splice(index, 1);
    } else {
      checkedPrefectures.push(
        this.props.prefectures[parseInt(e.target.id) - 1],
      );
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
                onChange={(e) => this.handleCheck(e)}
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
