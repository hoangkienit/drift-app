import { useNavigation } from "expo-router";
import React, { useState, useEffect ,useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants/Colors";

const CreateRestaurantScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tạo Nhà Hàng", // Tiêu đề của header
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTitleStyle: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: 'montserrat-bold'
      },
      headerTintColor: "#fff",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [openCity, setOpenCity] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json")
      .then((res) => res.json())
      .then((data) => {
        const cityOptions = Object.keys(data).map((city) => ({
          label: city,
          value: data[city].code,
        }));
        setCities(cityOptions);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    fetch(`https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${selectedCity}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.district) return;

        const districtOptions = data.district.map((district) => ({
          label: `${district.pre ? district.pre + " " : ""}${district.name}`,
          value: district.name,
        }));

        setDistricts(districtOptions);
        setSelectedDistrict(null);
        setWards([]);
      })
      .catch((err) => console.error("Error fetching districts:", err));
  }, [selectedCity]);

  useEffect(() => {
  if (!selectedDistrict || !selectedCity) return;

  fetch(`https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${selectedCity}.json`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.district) return;

      const districtData = data.district.find((d) => d.name === selectedDistrict);
      if (!districtData || !Array.isArray(districtData.ward)) return;

      const wardSet = new Set();
      const uniqueWards = districtData.ward
        .map((ward, index) => {
          const fullName = `${ward.pre ? ward.pre + " " : ""}${ward.name}`;
          const uniqueValue = `${ward.pre ? ward.pre + "_" : ""}${ward.name}_${index}`; // Ensure uniqueness
          return { label: fullName, value: uniqueValue };
        })
        .filter((ward) => {
          if (wardSet.has(ward.value)) return false;
          wardSet.add(ward.value);
          return true;
        });

      setWards(uniqueWards);
      setSelectedWard(null);
    })
    .catch((err) => console.error("Error fetching wards:", err));
}, [selectedDistrict, selectedCity]);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn Tỉnh/Thành phố:</Text>
      <DropDownPicker
        open={openCity}
        value={selectedCity}
        items={cities}
        setOpen={setOpenCity}
        setValue={setSelectedCity}
        setItems={setCities}
        placeholder="Chọn tỉnh/thành phố..."
        containerStyle={styles.dropdown}
        zIndex={4000}
      />

      <Text style={styles.label}>Chọn Quận/Huyện:</Text>
      <DropDownPicker
        open={openDistrict}
        value={selectedDistrict}
        items={districts}
        setOpen={setOpenDistrict}
        setValue={setSelectedDistrict}
        setItems={setDistricts}
        placeholder="Chọn quận/huyện..."
        containerStyle={styles.dropdown}
        disabled={!selectedCity}
        zIndex={3000}
      />

      <Text style={styles.label}>Chọn Phường/Xã:</Text>
      <DropDownPicker
        open={openWard}
        value={selectedWard}
        items={wards}
        setOpen={setOpenWard}
        setValue={setSelectedWard}
        setItems={setWards}
        placeholder="Chọn phường/xã..."
        containerStyle={styles.dropdown}
        disabled={!selectedDistrict}
        zIndex={2000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 20,
  },
});

export default CreateRestaurantScreen;
