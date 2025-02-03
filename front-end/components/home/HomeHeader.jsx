import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { Colors } from "../../constants/Colors";
import LocationBar from "./LocationBar";
import CartIcon from "./CartIcon";
import SearchBar from "../home/SearchBar";

const HomeHeader = ({ location, cartItems = [], t }) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.topRow}>
        <LocationBar location={location} />
        <CartIcon cartItems={cartItems}/>
      </View>
      <SearchBar t={t} />
    </SafeAreaView>
  );
};

const styles = {
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default HomeHeader;
