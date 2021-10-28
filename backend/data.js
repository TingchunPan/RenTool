import bcrypt from 'bcryptjs';
/**
 * @author Ting-chun Pan
 * @reference https://github.com/basir/amazona/blob/master/backend/data.js
 */
const data = {
  users: [
    {
      name: 'Wendy',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1111', 8),
      postCode: 'B16 8OP',
      isAdmin: true,
    },
    {
      name: 'Wendy Cin',
      email: 'admintest@example.com',
      password: bcrypt.hashSync('11111', 8),
      postCode: 'B19 8OP',
      isAdmin: false,
    },
    {
      name: 'Peter',
      email: 'user@example.com',
      password: bcrypt.hashSync('1122', 8),
      postCode: 'B17 8OP',
      isAdmin: false,
    },
    {
      name: 'Jhon',
      email: 'sssss@example.com',
      password: bcrypt.hashSync('1234', 8),
      postCode: 'B13 9LQ',
      isAdmin: false,
    },
    {
      name: 'Cindy',
      email: 'qsadaa@example.com',
      password: bcrypt.hashSync('2222', 8),
      postCode: 'B10 3HX',
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Nike Slim Shirt',
      surface: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      deposit: 12,
      inStock: 10,
      brand: 'Nike',
      description: 'high quality product',
    },
    {

      name: 'Adidas Fit Shirt',
      surface: 'Shirts',
      image: '/images/p2.jpg',
      price: 100,
      inStock: 20,
      brand: 'Adidas',
      description: 'high quality product',
    },
    {

      name: 'Lacoste Free Shirt',
      surface: 'Shirts',
      image: '/images/p3.jpg',
      price: 220,
      inStock: 0,
      brand: 'Lacoste',
      description: 'high quality product',
    },
    {

      name: 'Nike Slim Pant',
      surface: 'Pants',
      image: '/images/p4.jpg',
      price: 78,
      inStock: 15,
      brand: 'Nike',
      description: 'high quality product',
    },
    {

      name: 'Puma Slim Pant',
      surface: 'Pants',
      image: '/images/p5.jpg',
      price: 65,
      inStock: 5,
      brand: 'Puma',
      description: 'high quality product',
    },
    {

      name: 'Adidas Fit Pant',
      surface: 'Pants',
      image: '/images/p1.jpg',
      price: 139,
      inStock: 12,
      brand: 'Adidas',
      description: 'high quality product',
    },
  ],
};
export default data;
