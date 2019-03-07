import React, { Component } from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import PropTypes from "prop-types";

import DataRowIcon from "./DataRowIcon";

import { styles } from "../styles/DataRow";

class DataRow extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    isActive: PropTypes.bool,
    onHeartPress: PropTypes.func,
    onNamePress: PropTypes.func
  };

  render() {
    const { name, value, isActive, onHeartPress, onNamePress } = this.props;
    const { row, nameCell, valueCell, valueText, isActiveCell } = styles;
    return (
      <DataTable.Row style={row}>
        <DataTable.Cell style={nameCell} onPress={onNamePress}>{name}</DataTable.Cell>
        <DataTable.Cell style={valueCell}>
          <Text style={valueText}>{`$ ${value}`}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={isActiveCell} onPress={onHeartPress}>
          <DataRowIcon isActive={isActive} />
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
}

export default DataRow;
