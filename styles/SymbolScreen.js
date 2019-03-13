import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  showMoreSpinner: {
    padding: 20,
    alignSelf: 'center',
    color: "#009688"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    width: width
  },
  heading: {
    margin: 20,
    fontSize: 25,
    alignSelf: 'center'
  },
  chart: {
    width: width,
    height: 200
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  subTitle: {
    color: "#009688",
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  descriptionText: {
    color: "#999999"
  },
  newsContainer: {
    width: width - 40,
  },
  newsTitle: {
    marginTop: 10
  },
  newsDate: {
    paddingBottom: 5,
    color: "#999999"
  },
  showMore: {
    padding: 20,
    alignSelf: 'center',
    fontWeight: "bold",
    color: "#009688",
  },
});
