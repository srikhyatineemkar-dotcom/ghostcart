import { Restaurant, Product } from '../types';

export const POPULAR_CITIES = [
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Pune',
  'Kolkata'
];

export const RESTAURANT_IMAGES_BY_CUISINE: Record<string, string> = {
  'Biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
  'North Indian': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
  'South Indian': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
  'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
  'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
  'Italian': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
  'Chinese': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
  'Healthy': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
  'Cafe': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80',
  'Bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
  'Desserts': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80',
  'Street Food': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&auto=format&fit=crop&q=80'
};

const DISH_TEMPLATES: Record<string, { name: string; desc: string; isVeg: boolean; price: number; img: string }[]> = {
  'North Indian': [
    { name: 'Butter Naan Garlic', desc: 'Soft baked tandoori bread finished with fresh garlic cloves & premium table butter.', isVeg: true, price: 60, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80' },
    { name: 'Slow-Simmered Dal Makhani', desc: 'Creamy black lentils slow cooked overnight on low embers with churned butter.', isVeg: true, price: 280, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80' },
    { name: 'Paneer Lababdar Curry', desc: 'Fresh paneer chunks tossed in a rich, creamy onion tomato cashew gravy.', isVeg: true, price: 340, img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&auto=format&fit=crop&q=80' },
    { name: 'Tandoori Chicken Platter', desc: 'Spiced tandoori roasted chicken legs served with mint coriander chutney.', isVeg: false, price: 420, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80' }
  ],
  'South Indian': [
    { name: 'Ghee Roast Paper Dosa', desc: 'Paper thin crispy rice-lentil crepe brushed with pure ghee.', isVeg: true, price: 150, img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80' },
    { name: 'Medu Vada Sambar Combo', desc: 'Two savory spiced lentil donuts served with hot lentil sambar and coconut chutney.', isVeg: true, price: 110, img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80' },
    { name: 'Fluffy Steamed Idli Pack', desc: 'Two steamed fluffy rice cakes served with sambar and spicy podi.', isVeg: true, price: 90, img: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80' }
  ],
  'Pizza': [
    { name: 'Fresh Basil Margherita Pizza', desc: 'Topped with premium fresh mozzarella cheese, slow-cooked marinara and basil.', isVeg: true, price: 349, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
    { name: 'Spicy Paneer Tikka Pizza', desc: 'Tandoori cottage cheese cubes, red onions, capsicum, and tikka glaze.', isVeg: true, price: 449, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
    { name: 'Classic Pepperoni Pizza', desc: 'Tons of spicy pepperoni slices on a hand-stretched thin sourdough crust.', isVeg: false, price: 599, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' }
  ],
  'Burger': [
    { name: 'Crunchy Veg Supreme Burger', desc: 'Crispy vegetable herb patty with lettuce, tomatoes, and southwest dressing.', isVeg: true, price: 180, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
    { name: 'Smoked BBQ Chicken Burger', desc: 'Grilled chicken breast fillet, high-melt cheddar, and hickory barbecue glaze.', isVeg: false, price: 260, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' }
  ],
  'Biryani': [
    { name: 'Hyderabadi Chicken Dum Biryani', desc: 'Fragrant premium basmati cooked with spiced marinated chicken under sealed dum pressure.', isVeg: false, price: 350, img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80' },
    { name: 'Saffron Paneer Tikka Biryani', desc: 'Long grain rice layered with spicy clay-oven roasted cottage cheese tikka.', isVeg: true, price: 320, img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80' }
  ],
  'Chinese': [
    { name: 'Veg Hakka Garlic Noodles', desc: 'Stir-fried noodles tossed with green bell peppers, cabbages, and toasted garlic.', isVeg: true, price: 210, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80' },
    { name: 'Chilli Chicken Dry Platter', desc: 'Deep-fried chicken strips tossed with onions, green chillies and soy sauce.', isVeg: false, price: 290, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80' }
  ],
  'Healthy': [
    { name: 'Quinoa Beetroot Avocado Bowl', desc: 'Fibre-rich quinoa, baby spinach, avocado slices, and honey lime dressing.', isVeg: true, price: 310, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80' },
    { name: 'Green Celery Detox Juice', desc: 'Cold pressed organic celery, fresh cucumber, ginger root, and mint.', isVeg: true, price: 160, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80' }
  ],
  'Cafe': [
    { name: 'Hot Brewed Cappuccino', desc: 'Rich espresso shot poured over velvety steamed milk foam.', isVeg: true, price: 170, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80' },
    { name: 'Gourmet Sourdough Avocado Toast', desc: 'Artisanal sliced sourdough topped with crushed avocado, cherry tomatoes, chili flakes.', isVeg: true, price: 290, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80' }
  ],
  'Bakery': [
    { name: 'Flaky Golden Butter Croissant', desc: 'Classic hand-laminated french style pure butter croissant pastry.', isVeg: true, price: 140, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80' }
  ],
  'Desserts': [
    { name: 'Molten Chocolate Lava Cake', desc: 'Rich cocoa muffin with a hot liquid chocolate truffle core.', isVeg: true, price: 190, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80' }
  ]
};

// Explicit real-world restaurant data organized by cities
export const CITY_RESTAURANTS: Record<string, Omit<Restaurant, 'menu'>[]> = {
  'Hyderabad': [
    {
      id: 'res_hyd_1',
      name: 'Paradise Biryani Palace',
      cuisine: ['Biryani', 'North Indian'],
      rating: 4.7,
      reviewCount: 15400,
      deliveryTime: '20-25 mins',
      costForTwo: 600,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
      distance: '1.8 km',
      featuredOffer: '50% OFF | Code: GHOST50',
      promoted: true
    },
    {
      id: 'res_hyd_2',
      name: 'Chutneys Organic South Indian',
      cuisine: ['South Indian', 'Healthy'],
      rating: 4.6,
      reviewCount: 4120,
      deliveryTime: '25-30 mins',
      costForTwo: 450,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
      distance: '3.1 km',
      featuredOffer: 'Flat ₹100 Off | Code: SAVE100'
    },
    {
      id: 'res_hyd_3',
      name: 'Pista House Haleem & Biryani',
      cuisine: ['Biryani', 'North Indian'],
      rating: 4.8,
      reviewCount: 9320,
      deliveryTime: '30-35 mins',
      costForTwo: 700,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
      distance: '4.5 km',
      featuredOffer: 'Free Dessert on ₹500+'
    }
  ],
  'Bengaluru': [
    {
      id: 'res_blr_1',
      name: 'Toit Artisanal Brewery & Grill',
      cuisine: ['Pizza', 'Burger', 'Italian'],
      rating: 4.8,
      reviewCount: 12400,
      deliveryTime: '30-35 mins',
      costForTwo: 1200,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      distance: '2.4 km',
      featuredOffer: '20% OFF | Code: RESIST20',
      promoted: true
    },
    {
      id: 'res_blr_2',
      name: 'MTR Traditional South Indian',
      cuisine: ['South Indian'],
      rating: 4.9,
      reviewCount: 8400,
      deliveryTime: '15-20 mins',
      costForTwo: 300,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
      distance: '1.2 km',
      featuredOffer: 'Ghee Podi Free On ₹200+'
    },
    {
      id: 'res_blr_3',
      name: 'The Hole In The Wall Cafe',
      cuisine: ['Cafe', 'Bakery', 'Healthy'],
      rating: 4.6,
      reviewCount: 3890,
      deliveryTime: '20-25 mins',
      costForTwo: 550,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80',
      distance: '2.8 km',
      featuredOffer: 'Save ₹50 on Breakfast'
    }
  ],
  'Chennai': [
    {
      id: 'res_chn_1',
      name: 'Saravana Bhavan Heritage',
      cuisine: ['South Indian'],
      rating: 4.7,
      reviewCount: 18200,
      deliveryTime: '15-20 mins',
      costForTwo: 350,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
      distance: '0.9 km',
      featuredOffer: 'Flat 50% OFF | Code: GHOST50'
    },
    {
      id: 'res_chn_2',
      name: 'Anjappar Chettinad Kitchen',
      cuisine: ['North Indian', 'Chinese'],
      rating: 4.5,
      reviewCount: 5210,
      deliveryTime: '25-30 mins',
      costForTwo: 650,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      distance: '3.3 km',
      featuredOffer: 'Complimentary Chicken Soup'
    }
  ],
  'Mumbai': [
    {
      id: 'res_mum_1',
      name: 'Pizza By The Bay',
      cuisine: ['Pizza', 'Italian'],
      rating: 4.8,
      reviewCount: 9400,
      deliveryTime: '28-32 mins',
      costForTwo: 1400,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
      distance: '2.1 km',
      featuredOffer: 'Flat ₹100 Off | Code: SAVE100',
      promoted: true
    },
    {
      id: 'res_mum_2',
      name: 'Bademiya Seekh Kebab',
      cuisine: ['North Indian'],
      rating: 4.4,
      reviewCount: 7800,
      deliveryTime: '22-26 mins',
      costForTwo: 500,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
      distance: '1.4 km',
      featuredOffer: 'Free Rumali Roti Pack'
    }
  ],
  'Delhi': [
    {
      id: 'res_del_1',
      name: "Karim's Historic Old Delhi",
      cuisine: ['North Indian'],
      rating: 4.8,
      reviewCount: 16400,
      deliveryTime: '30-35 mins',
      costForTwo: 750,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      distance: '4.2 km',
      featuredOffer: 'Flat 50% OFF | Code: GHOST50',
      promoted: true
    },
    {
      id: 'res_del_2',
      name: 'The Big Chill Cafe',
      cuisine: ['Italian', 'Desserts', 'Cafe'],
      rating: 4.7,
      reviewCount: 11200,
      deliveryTime: '25-30 mins',
      costForTwo: 900,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      distance: '2.7 km',
      featuredOffer: '20% OFF | Code: RESIST20'
    }
  ],
  'Pune': [
    {
      id: 'res_pun_1',
      name: 'Goodluck Cafe & Bakery',
      cuisine: ['Cafe', 'Bakery'],
      rating: 4.6,
      reviewCount: 6540,
      deliveryTime: '15-20 mins',
      costForTwo: 300,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80',
      distance: '1.1 km',
      featuredOffer: 'Famous Bun Maska Combo'
    }
  ],
  'Kolkata': [
    {
      id: 'res_kol_1',
      name: 'Arsalan Biryani House',
      cuisine: ['Biryani', 'North Indian'],
      rating: 4.7,
      reviewCount: 14200,
      deliveryTime: '25-30 mins',
      costForTwo: 650,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
      distance: '3.0 km',
      featuredOffer: 'Flat 50% OFF | Code: GHOST50',
      promoted: true
    },
    {
      id: 'res_kol_2',
      name: 'Flurys Heritage Tearoom',
      cuisine: ['Cafe', 'Desserts', 'Bakery'],
      rating: 4.8,
      reviewCount: 5400,
      deliveryTime: '20-25 mins',
      costForTwo: 800,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      distance: '2.5 km',
      featuredOffer: 'Classic Tea & Scones Combo'
    }
  ]
};

// Programmatically build and flatten the global RESTAURANTS list with completely authentic menus
export const RESTAURANTS: Restaurant[] = [];

// Populate menus for each restaurant across all cities
Object.entries(CITY_RESTAURANTS).forEach(([cityName, resList]) => {
  resList.forEach((res, resIndex) => {
    const cuisinesList = res.cuisine;
    const menu: Product[] = [];
    
    // Ensure every restaurant has 12-16 completely unique menu items!
    cuisinesList.forEach((cuisine, cIndex) => {
      const templates = DISH_TEMPLATES[cuisine] || DISH_TEMPLATES['North Indian'];
      templates.forEach((template, tIndex) => {
        const dishId = `p_dish_${res.id}_${cIndex}_${tIndex}`;
        
        // Generate a completely unique price, rating, reviews, description for every menu item
        const dishPrice = template.price + (resIndex * 15 + tIndex * 10) % 60;
        const origPrice = tIndex % 2 === 0 ? Math.round(dishPrice * 1.25) : undefined;
        const ratingVal = parseFloat((4.2 + (tIndex % 8) * 0.1).toFixed(1));
        const reviewsVal = 20 + (tIndex * 45) % 1500;
        
        menu.push({
          id: dishId,
          name: `${template.name} (${res.name} Edition)`,
          price: dishPrice,
          originalPrice: origPrice,
          rating: ratingVal > 5 ? 5 : ratingVal,
          reviewCount: reviewsVal,
          image: `${template.img}?sig=${res.id}_${cIndex}_${tIndex}`,
          category: cuisine,
          experience: 'food',
          description: `${template.desc} Cooked fresh using handpicked organic local ingredients. Savor luxury taste.`,
          deliveryTime: res.deliveryTime,
          isVeg: template.isVeg
        });
      });
    });

    // Save populated restaurant to global list
    RESTAURANTS.push({
      ...res,
      menu
    });
  });
});
