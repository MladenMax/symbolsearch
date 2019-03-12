import React, { Component } from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import PropTypes from "prop-types";

import DataRowIcon from "./DataRowIcon";

import { styles } from "../styles/DataRow";

class DataRow extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    following: PropTypes.bool,
    followSymbol: PropTypes.func,
    openSymbol: PropTypes.func
  };

  render() {
    const { name, value, following, followSymbol, openSymbol } = this.props;
    const { row, nameCell, valueCell, valueText, followingCell } = styles;
    return (
      <DataTable.Row style={row}>
        <DataTable.Cell style={nameCell} onPress={openSymbol}>{name}</DataTable.Cell>
        <DataTable.Cell style={valueCell}>
          <Text style={valueText}>{`$ ${value.toFixed(2)}`}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={followingCell} onPress={followSymbol}>
          <DataRowIcon following={following} />
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
}

export default DataRow;
