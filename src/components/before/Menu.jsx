import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Menu.css';

const foodItems = [
  // Breakfast
  { id: 'BR1', name: 'Masala Dosa', price: 50, category: 'Breakfast', image: 'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg',available: true},
  { id: 'BR2', name: 'Pav Bhaji', price: 60, category: 'Breakfast', image: 'https://static.toiimg.com/photo/52416693.cms',available: true },
  { id: 'BR3', name: 'Samosa', price: 20, category: 'Breakfast', image: 'https://sinfullyspicy.com/wp-content/uploads/2010/09/5.jpg',available: false },
  { id: 'BR4', name: 'Idli with Sambar', price: 40, category: 'Breakfast', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbc-3FoAFlG-sxKm8_MF33MXcmybRE7J11hw&s',available: true },
  { id: 'BR5', name: 'Upma', price: 35, category: 'Breakfast', image: 'https://d1uz88p17r663j.cloudfront.net/original/ba32df908435796279e3d79f0d5fbdc1_Rava_Upma_-_Twist.jpg',available: true },
  { id: 'BR6', name: 'Poori with Aloo', price: 45, category: 'Breakfast', image: 'https://sinfullyspicy.com/wp-content/uploads/2010/09/5.jpg',available: true },
  { id: 'BR7', name: 'Medu Vada', price: 30, category: 'Breakfast', image: 'https://www.chefkunalkapur.com/wp-content/uploads/2021/06/Medu-Vada-scaled.jpg?v=1623509746' },
  { id: 'BR8', name: 'Chai (Tea)', price: 15, category: 'Breakfast', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS49YHg5WE-Ap_O3lfQBB0qNCM4pxjv7_OliQ&s' },

  // Lunch
  { id: 'L1', name: 'Chicken Biryani', price: 120, category: 'Lunch', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg' },
  { id: 'L2', name: 'Paneer Butter Masala', price: 100, category: 'Lunch', image: 'https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala.jpg' },
  { id: 'L3', name: 'Veg Thali', price: 90, category: 'Lunch', image: 'https://images.jdmagicbox.com/quickquotes/listicle/listicle_1683697362867_zui6n_1040x500.jpg' },
  { id: 'L4', name: 'Rajma Chawal', price: 70, category: 'Lunch', image: 'https://images.healthshots.com/healthshots/hi/uploads/2022/07/03180005/rajma-chawal.jpg' },
  { id: 'L5', name: 'Aloo Paratha with Curd', price: 60, category: 'Lunch', image: 'https://i.pinimg.com/736x/6e/e7/51/6ee751d49e12277ca1d348c11ac2dc1e.jpg' },
  { id: 'L6', name: 'Egg Curry with Rice', price: 85, category: 'Lunch', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXeHviSuwFIpjZi06eajUewzI-KF4gzI1s3Q&s' },
  { id: 'L7', name: 'Chole Bhature', price: 75, category: 'Lunch', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHuqEQvNy--dkfLm4j4WW74dgvb2tb4HilQ&s' },
  { id: 'L8', name: 'Curd Rice', price: 40, category: 'Lunch', image: 'https://www.yellowthyme.com/wp-content/uploads/2019/04/South-indian-curd-rice-08751.jpg' },

  // Drinks
  { id: 'B1', name: 'Masala Chai', price: 15, category: 'Drinks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAkVlbaiN5NvSP0cs-JgDCVg6E6tEq8wF_eg&s' },
  { id: 'B2', name: 'Cold Coffee', price: 40, category: 'Drinks', image: 'https://amritfood.com/wp-content/uploads/2021/11/Cold-Coffee.png' },
  { id: 'B3', name: 'Lassi', price: 30, category: 'Drinks', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/1200px-Salt_lassi.jpg' },
  { id: 'B4', name: 'Buttermilk', price: 20, category: 'Drinks', image: 'https://delishbite.in/wp-content/uploads/2023/07/Blog_1.jpg' },
  { id: 'B5', name: 'Mango Milkshake', price: 50, category: 'Drinks', image: 'https://www.amulcafe.in/wp-content/uploads/2024/03/Mango-Milkshake.webp' },
  { id: 'B6', name: 'Lemon Soda', price: 25, category: 'Drinks', image: 'https://alidasfood.com/wp-content/uploads/2021/08/Limonada-Gasosa.jpg' },
  { id: 'B7', name: 'Filter Coffee', price: 25, category: 'Drinks', image: 'https://truesouth.in/cdn/shop/files/southindian1.jpg?v=1707477021' },
  { id: 'B8', name: 'Rose Milk', price: 30, category: 'Drinks', image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2015/03/rose-milk-recipe.jpg' },

  // Snacks
  { id: 'S1', name: 'Veg Sandwich', price: 35, category: 'Snacks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtmSasYKVRU_f1oioSzYOwU1GDgoUUcxLBw&s' },
  { id: 'S2', name: 'French Fries', price: 45, category: 'Snacks', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdU6PILG8sKcDKNYZ2vwb3UfH-zOcinAP82w&s' },
  { id: 'S3', name: 'Paneer Roll', price: 60, category: 'Snacks', image: 'https://spicecravings.com/wp-content/uploads/2020/12/Paneer-kathi-Roll-Featured-1.jpg' },
  { id: 'S4', name: 'Spring Rolls', price: 50, category: 'Snacks', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg' },
  { id: 'S5', name: 'Bhel Puri', price: 25, category: 'Snacks', image: 'https://shwetainthekitchen.com/wp-content/uploads/2022/01/bhel-puri.jpg' },
  { id: 'S6', name: 'Samosa', price: 20, category: 'Snacks', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg' },
  { id: 'S7', name: 'Kathi Roll', price: 55, category: 'Snacks', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2024/02/paneer-kathi-roll-recipe.jpg' },
  { id: 'S8', name: 'Chilli Paneer', price: 70, category: 'Snacks', image: 'https://www.cookwithmanali.com/wp-content/uploads/2016/01/Chilli-Paneer-Restaurant-Style-500x500.jpg' },
];
 

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// your foodItems array here...

const Menu = ({ cart, addToCart, removeFromCart }) => {
  const { filter } = useParams();
  const query = useQuery();
  const searchTerm = query.get('search') || '';

  let filteredItems = foodItems;

  if (filter) {
    filteredItems = filteredItems.filter(
      item => item.category.toLowerCase() === filter.toLowerCase()
    );
  }

  if (searchTerm.trim()) {
    filteredItems = filteredItems.filter(
      item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  let paddingTop = 0;
  if (searchTerm.trim()) {
    const count = filteredItems.length;
    if (count <= 4) {
  paddingTop = 0;
  } else if (count <= 8) {
  paddingTop = 200;
  } else {
  paddingTop = 200 + (Math.ceil((count - 8) / 4)) * 350;
  }
  } else if (filter) {
    paddingTop = 200;
  } else {
    paddingTop = 2300;
  }

  return (
    <div className="menu-container" style={{ paddingTop: `${paddingTop}px` }}>
      <div className="food-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="food-card">
              <img src={item.image} alt={item.name} className="food-image" />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <div className="cart-controls">
                {cart[item.id] ? (
                  <>
                    <button className="qty-btn" onClick={() => removeFromCart(item)}>-</button>
                    <span>{cart[item.id].quantity}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                  </>
                ) : (
                  <button className="add-button" onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
            No matching items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
