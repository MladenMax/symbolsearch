import React, { Component } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";

import { styles } from "../styles/TextField";

class TextField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    errMsg: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onChange = val => {
    this.setState({
      value: val
    });

    if (this.props.onChange) {
      this.props.onChange(val);
    }
  };

  render() {
    const { container, input, text } = styles;
    const { label, type, errMsg } = this.props;
    const secure = type === TYPES.password ? true : false;
    return (
      <View style={container}>
        <TextInput
          label={label}
          value={this.state.value}
          secureTextEntry={secure}
          onChangeText={val => this.onChange(val)}
          style={input}
          error={!!errMsg}
        />
        {!!errMsg && <Text style={text}>{errMsg}</Text>}
      </View>
    );
  }
}

const TYPES = {
  text: "text",
  password: "password"
};


export default TextField;
