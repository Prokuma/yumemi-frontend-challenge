"use client";
import React, { Component } from "react";

interface Props {
  labels: string[];
  onChange?: (selectedLabel: string) => void;
}

interface State {
  label: string;
}

export default class DataTypeSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  handleCheck(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ label: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <select
          value={this.state.label}
          data-testid="type"
          id="type"
          name="type"
          onChange={(e) => this.handleCheck(e)}
        >
          {this.props.labels.map((label, index) => {
            return (
              <option key={index} value={label}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
