import React, { Component } from 'react';
import { Icon } from 'expo';

import { theme } from "../styles/App";

class TabBarIcon extends Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? theme.colors.primary : theme.colors.disabled}
      />
    );
  }
}

export default TabBarIcon;
