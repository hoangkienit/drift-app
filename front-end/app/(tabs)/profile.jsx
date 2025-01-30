import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Phần trên cùng: Thông tin người dùng */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/avatar.jpg')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Hoàng Kiện</Text>
          <Text style={styles.phone}>(+84)123456789</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      {/* Phần giữa: Các mục chức năng */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.item}>
          <Text>Notifications</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Payments</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Settings</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Your Orders</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Favourite Orders</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>My Address</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Privacy Policy</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>Customer Support</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text>LogOut</Text>
          <Image source={require('../../assets/images/avatar.jpg')} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Màu nền của trang
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // Hình tròn
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#ddd', // Màu nền của nút sửa
    borderRadius: 15, // Hình tròn
    padding: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10, // Góc bo tròn
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 'auto', // Đẩy mũi tên sang phải
  },
});