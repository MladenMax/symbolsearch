import React, { Component } from "react";
import { Platform } from "react-native";
import { Icon } from "expo";
import PropTypes from "prop-types";

class DataRowIcon extends Component {
  static propTypes = {
    following: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { following } = this.props;

    let name = "";
    if (Platform.OS === "ios") {
      name = following ? TYPES.active.ios : TYPES.inactive.ios;
    } else {
      name = following ? TYPES.active.md : TYPES.inactive.md;
    }

    return (
      <Icon.Ionicons
        name={name}
        color={following ? "red" : "#999999"}
        size={25}
      />
    );
  }
}

const TYPES = {
  active: {
    ios: "ios-heart",
    md: "md-heart"
  },
  inactive: {
    ios: "ios-heart-empty",
    md: "md-heart-empty"
  }
};

export default DataRowIcon;
