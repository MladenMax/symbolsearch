import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nameCell: {
    flexGrow: 3
  },
  valueCell: {
    flexGrow: 2,
    justifyContent: "center"
  },
  valueText: {
    color: "#999999"
  },
  isActiveCell: {
    flexGrow: 1,
    justifyContent: "center"
  }
});
