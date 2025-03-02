import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const INDEX_URL = 'https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json';

const CreateRestaurantScreen = () => {
  const [provinces, setProvinces] = useState([]); 
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(INDEX_URL)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProvinces(data);
        } else {
          console.error('Error: Expected an array but received:', data);
          setProvinces([]);
        }
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProvinceChange = (provinceCode) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);

    if (provinceCode) {
      const provinceDataUrl = `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${provinceCode}.json`;
      fetch(provinceDataUrl)
        .then(response => response.json())
        .then(data => {
          if (data?.districts && Array.isArray(data.districts)) {
            setDistricts(data.districts);
          } else {
            console.error(`Invalid data for province ${provinceCode}:`, data);
            setDistricts([]);
          }
        })
        .catch(error => {
          console.error('Error fetching district data:', error);
          setDistricts([]);
        });
    }
  };

  const handleDistrictChange = (districtCode) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
    setWards([]);

    const district = districts.find(d => d.code === districtCode);
    if (district?.wards && Array.isArray(district.wards)) {
      setWards(district.wards);
    } else {
      console.error(`No wards found for district ${districtCode}`);
      setWards([]);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Province</Text>
      <RNPickerSelect
        onValueChange={handleProvinceChange}
        items={provinces.map(province => ({
          label: province.name,
          value: province.code
        }))}
        placeholder={{ label: "Select a province", value: null }}
        value={selectedProvince}
        style={pickerStyles}
      />

      <Text style={styles.label}>Select District</Text>
      <RNPickerSelect
        onValueChange={handleDistrictChange}
        items={districts.length ? districts.map(district => ({
          label: district.name,
          value: district.code
        })) : []}
        placeholder={{ label: "Select a district", value: null }}
        value={selectedDistrict}
        style={pickerStyles}
      />

      <Text style={styles.label}>Select Ward</Text>
      <RNPickerSelect
        onValueChange={setSelectedWard}
        items={wards.length ? wards.map(ward => ({
          label: ward.name,
          value: ward.code
        })) : []}
        placeholder={{ label: "Select a ward", value: null }}
        value={selectedWard}
        style={pickerStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  }
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 10,
  },
};

export default CreateRestaurantScreen;
