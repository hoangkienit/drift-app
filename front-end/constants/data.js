export const notifications = [
    { id: "1", type: "Order", title: "Order Shipped", message: "Your order #1234 is on the way!", icon: "cart" },
    { id: "2", type: "Promotion", title: "Discount Alert!", message: "Get 20% off your next meal!", icon: "pricetag" },
    { id: "3", type: "Order", title: "Order Delivered", message: "Your order #5678 has been delivered.", icon: "checkmark-circle" },
    { id: "4", type: "Promotion", title: "Limited Time Deal", message: "Buy one get one free today!", icon: "gift" },
];
  
export const restaurantData = [
  {
    id: "1",
    avatar: "https://fastly.picsum.photos/id/47/4272/2848.jpg?hmac=G8dXSLa-ngBieraQt5EORu-4r6tveX3fhvBTZM0Y8xM",
    name: "Sushi Place",
    rating: 4.0,
    distance: 1.2,
    minutes: 15,
    foodItems: [
      {
        id: 1,
        name: 'Sushi Roll',
        price: 12.99,
        toppings: ['Salmon', 'Avocado', 'Cucumber'],
        imageUrl: 'https://www.thefieryvegetarian.com/wp-content/uploads/2021/01/sweet-potato-sushi-1-10-720x720.jpg',
      },
      {
        id: 2,
        name: 'Sashimi',
        price: 15.99,
        toppings: ['Tuna', 'Salmon'],
        imageUrl: 'https://kokugyu.com.vn/wp-content/uploads/2022/05/Sashimi-de-salmao-e-reprovado-em-restaurantes-do-RJ-e-SP-scaled.jpg',
      },
    ],
  },
  {
    id: "2",
    avatar: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    name: "KFC",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
    foodItems: [
      {
        id: 3,
        name: 'Fried Chicken',
        price: 10.99,
        toppings: ['Spicy', 'Crispy'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQroS_nU5cMjnpKrBm6Um0QfK4J-eW4uFXAdw&s',
      },
      {
        id: 4,
        name: 'Mashed Potatoes',
        price: 4.99,
        toppings: ['Gravy'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctpdZOZYbYczYaS5Et7APFrxRo2cuBu93-g&s',
      },
    ],
  },
  {
    id: "3",
    avatar: "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    name: "Lotteria",
    rating: 5.0,
    distance: 1.2,
    minutes: 15,
    foodItems: [
      {
        id: 5,
        name: 'Chicken Burger',
        price: 7.99,
        toppings: ['Lettuce', 'Tomato', 'Cheese'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbsTircXEKD0-vBNgfYzMNpRiyxuwV9FW1IQ&s',
      },
      {
        id: 6,
        name: 'Fries',
        price: 3.99,
        toppings: ['Ketchup', 'Cheese'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLetnQTeyzm8StHzS_UpZDjW5m9M1uP4uPxg&s',
      },
    ],
  },
  {
    id: "4",
    avatar: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
    name: "Popeyes",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
    foodItems: [
      {
        id: 7,
        name: 'Spicy Chicken Wings',
        price: 8.99,
        toppings: ['Spicy Sauce'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9R0UUhoMRNKkgREBjmuvCBhxi9xl5Fsno6A&s',
      },
      {
        id: 8,
        name: 'Biscuits',
        price: 2.99,
        toppings: ['Honey Butter'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-pZe-KesyqH8ymqy8Civaa8F-y_MOxBh7SA&s',
      },
    ],
  },
  {
    id: "5",
    avatar: "https://fastly.picsum.photos/id/50/4608/3072.jpg?hmac=E6WgCk6MBOyuRjW4bypT6y-tFXyWQfC_LjIBYPUspxE",
    name: "Texas",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
    foodItems: [
      {
        id: 9,
        name: 'Steak',
        price: 19.99,
        toppings: ['Grilled', 'Garlic Butter'],
        imageUrl: 'https://www.allrecipes.com/thmb/3cixVDmAtbb2hYxoFLVJ4VPQ7rA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143809-best-steak-marinade-in-existence-ARMag-1x1-1-8105b6b8e5cb4931ba8061f0425243dd.jpg',
      },
      {
        id: 10,
        name: 'Ribs',
        price: 14.99,
        toppings: ['BBQ Sauce'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2-99kk_qOrRIzJeoxXhkLomzvUvQ4PC5xaw&s',
      },
    ],
  },
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
    restaurantName: 'Sushi Place',
    orderDateTime: '2025-02-01 15:00',
    totalPrice: 18.50,
    shipperName: 'Sarah Lee',
    status: 'Processing',
  },
  {
    orderId: 'ORD123458',
    restaurantAvatar: 'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY',
    restaurantName: 'Lotteria',
    orderDateTime: '2025-02-01 16:00',
    totalPrice: 30.75,
    shipperName: 'David Smith',
    status: 'Delivered',
  },
];


