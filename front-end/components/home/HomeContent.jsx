import React from "react";
import { View, FlatList } from "react-native";
import ImageCarousel from "../home/ImageCarousel";
import FoodCategory from "../home/FoodCategory";
import FilterFacets from "../home/FilterFacets";
import RestaurantList from "../home/RestaurantList";

const HomeContent = ({ t, restaurants }) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={
        <>
          <ImageCarousel nestedScrollEnabled={true} />
          <FoodCategory t={t} nestedScrollEnabled={true} />
          <FilterFacets t={t} />
        </>
      }
      data={[]} // Empty array to avoid unnecessary rendering
      keyExtractor={(_, index) => index.toString()}
      renderItem={null}
      ListEmptyComponent={<View style={{ height: 10 }} />}
      ListFooterComponent={<RestaurantList t={t} restaurants={restaurants} />}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

export default HomeContent;
