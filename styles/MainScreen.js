import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    width: width
  },
  searchbar: {
    margin: 10
  },
  datatable: {
    width: width - 20
  },
  activityIndicator: {
    flexGrow: 1,
    justifyContent: "center",
    alignSelf: "center",
    color: "#009688"
  },
  snackbar: {
    backgroundColor: "#009688"
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999
  }
});
