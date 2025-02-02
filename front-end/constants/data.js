export const notifications = [
    { id: "1", type: "Order", title: "Order Shipped", message: "Your order #1234 is on the way!", icon: "cart" },
    { id: "2", type: "Promotion", title: "Discount Alert!", message: "Get 20% off your next meal!", icon: "pricetag" },
    { id: "3", type: "Order", title: "Order Delivered", message: "Your order #5678 has been delivered.", icon: "checkmark-circle" },
    { id: "4", type: "Promotion", title: "Limited Time Deal", message: "Buy one get one free today!", icon: "gift" },
];
  
export const fakeOrders = [
  {
    orderId: 'ORD123456',
    restaurantAvatar: 'https://fastly.picsum.photos/id/47/4272/2848.jpg?hmac=G8dXSLa-ngBieraQt5EORu-4r6tveX3fhvBTZM0Y8xM',
    restaurantName: 'Pizza Palace',
    orderDateTime: '2025-02-01 14:30',
    totalPrice: 25.99,
    shipperName: 'Mike Brown',
    status: 'Pending',
  },
  {
    orderId: 'ORD123457',
    restaurantAvatar: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
    restaurantName: 'Sushi Express',
    orderDateTime: '2025-02-01 15:00',
    totalPrice: 18.50,
    shipperName: 'Sarah Lee',
    status: 'Processing',
  },
  {
    orderId: 'ORD123458',
    restaurantAvatar: 'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY',
    restaurantName: 'Burger Town',
    orderDateTime: '2025-02-01 16:00',
    totalPrice: 30.75,
    shipperName: 'David Smith',
    status: 'Delivered',
  },
];

export const restaurantData = [
  {
    id: "1",
    avatar: "https://fastly.picsum.photos/id/47/4272/2848.jpg?hmac=G8dXSLa-ngBieraQt5EORu-4r6tveX3fhvBTZM0Y8xM",
    name: "Sushi Place",
    rating: 4.0,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "2",
    avatar: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    name: "KFC",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "3",
    avatar: "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    name: "Lotteria",
    rating: 5.0,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "4",
    avatar: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
    name: "Popeyes",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "5",
    avatar: "https://fastly.picsum.photos/id/50/4608/3072.jpg?hmac=E6WgCk6MBOyuRjW4bypT6y-tFXyWQfC_LjIBYPUspxE",
    name: "Texas",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
];

export const foodItems = [
  {
    id: 1,
    name: 'Pizza',
    price: 10.99,
    toppings: ['Cheese', 'Pepperoni', 'Olives'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
  },
  {
    id: 2,
    name: 'Burger',
    price: 8.99,
    toppings: ['Lettuce', 'Tomato', 'Cheese'],
    imageUrl: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',  // Replace with actual image URL
  },
];

