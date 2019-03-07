import React, { Component } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import { theme } from "../styles/App";

class TabBarLabel extends Component {
  static propTypes = {
    label: PropTypes.string,
    focused: PropTypes.bool
  };
  render() {
    const { label, focused } = this.props;
    return (
      <Text
        style={{
          textAlign: "center",
          fontSize: 10,
          color: focused ? theme.colors.primary : theme.colors.disabled,
          marginBottom: 3
        }}
      >
        {label}
      </Text>
    );
  }
}

export default TabBarLabel;