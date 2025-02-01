import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import NotificationCategory from '../components/NotificationCategory';
import NotificationList from '../components/NotificationList';
import { useNavigation } from 'expo-router';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const notifications = {
    "Cập nhật đơn hàng": [
      { id: '1', text: 'Đơn hàng #12345 đã được giao thành công.' },
      { id: '2', text: 'Đơn hàng #67890 đang được vận chuyển.' }
    ],
    "Khuyến mãi": [
      { id: '3', text: 'Giảm 50% cho đơn hàng đầu tiên!' },
      { id: '4', text: 'Flash Sale diễn ra vào 20:00 tối nay.' }
    ],
    "Thông tin đơn hàng": [
      { id: '5', text: 'Bạn đã đặt hàng vào ngày 01/02/2025.' },
      { id: '6', text: 'Hãy đánh giá sản phẩm bạn đã mua.' }
    ]
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.header}>Thông báo</Text>
      
      {/* Hiển thị danh mục thông báo */}
      {Object.keys(notifications).map((category) => (
        <NotificationCategory
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}

      {/* Hiển thị danh sách thông báo khi chọn danh mục */}
      {selectedCategory && (
        <NotificationList notifications={notifications[selectedCategory]} />
      )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  }
});
