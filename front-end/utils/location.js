import * as Location from "expo-location";

// Request location permission and fetch current location
export const getLocation = async (setLocation) => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Convert coordinates to a detailed address (house number, street, district, etc.)
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        
        // Extract detailed information from address data
        if (address.length > 0) {
          const { name, street, city, district, country } = address[0];
          const detailedAddress = {
            name,
            street,
            city,
            district,
            country,
          };
            setLocation(detailedAddress); // Store detailed address in state
        }
      } else {
        console.log("Location permission denied");
      }
};
    
export const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };