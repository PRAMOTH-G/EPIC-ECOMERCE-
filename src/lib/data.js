// ─────────────────────────────────────────────────────────────
//  FreshMart Departmental Store — Data Layer
//  15 Departments · 70+ Products · Offers · Combo Deals
// ─────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
    { id: 1, name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥦", color: "green", description: "Farm-fresh fruits, veggies & greens delivered daily" },
    { id: 2, name: "Spices", slug: "spices", icon: "🌶️", color: "red", description: "Whole, ground & blended spices from origin farms" },
    { id: 3, name: "Masala Products", slug: "masala-products", icon: "🫙", color: "orange", description: "Ready-to-use masalas, curry powders & blends" },
    { id: 4, name: "Flour Varieties", slug: "flour-varieties", icon: "🌾", color: "yellow", description: "Stone-ground whole wheat, millets & specialty flours" },
    { id: 5, name: "Meat Varieties", slug: "meat-varieties", icon: "🍗", color: "rose", description: "Fresh & marinated chicken, mutton, fish & seafood" },
    { id: 6, name: "Dairy Products", slug: "dairy-products", icon: "🥛", color: "sky", description: "Milk, paneer, curd, butter, cheese & more" },
    { id: 7, name: "Snacks & Packaged Foods", slug: "snacks-packaged", icon: "🍿", color: "purple", description: "Chips, biscuits, namkeen, noodles & instant foods" },
    { id: 8, name: "Bathroom & Personal Care", slug: "personal-care", icon: "🧴", color: "teal", description: "Soaps, shampoo, skincare, oral care & grooming" },
    { id: 9, name: "Ice Creams & Frozen Items", slug: "frozen-items", icon: "🍦", color: "indigo", description: "Ice creams, frozen veg, frozen meals & more" },
    { id: 10, name: "Beverages", slug: "beverages", icon: "🥤", color: "cyan", description: "Juices, soft drinks, tea, coffee & energy drinks" },
    { id: 11, name: "Household Essentials", slug: "household-essentials", icon: "🧹", color: "lime", description: "Cleaning supplies, detergents, mops & sanitisers" },
    { id: 12, name: "Bakery Products", slug: "bakery-products", icon: "🍞", color: "amber", description: "Fresh-baked bread, cakes, cookies & pastries" },
    { id: 13, name: "Organic & Healthy Products", slug: "organic-healthy", icon: "🌿", color: "emerald", description: "Certified organic, superfoods & health snacks" },
    { id: 14, name: "Baby Care Products", slug: "baby-care", icon: "🍼", color: "pink", description: "Diapers, formula, baby food & baby skin care" },
    { id: 15, name: "Pet Care Products", slug: "pet-care", icon: "🐾", color: "violet", description: "Pet food, grooming, accessories & health care" },
];

// Backward-compatible alias used by existing components
export const CATEGORIES = DEPARTMENTS;

// ─────────────────────────────────────────────────────────────
//  PRODUCTS  (70 products across 15 departments)
// ─────────────────────────────────────────────────────────────
export const PRODUCTS = [

    // ── Fruits & Vegetables ─────────────────────────────────
    {
        id: 1, title: "Organic Red Apples (1 kg)", price: 2.99, discount: 10, rating: 4.8, reviews: 214, stock: 80, unit: "kg",
        category: "Fruits & Vegetables",
        description: "Freshly harvested, crisp organic red apples. Rich in fibre, vitamins and natural antioxidants.",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80",
        isOrganic: true, isFeatured: true,
    },
    {
        id: 2, title: "Ripe Bananas (Bunch ~6 pcs)", price: 1.49, discount: 0, rating: 4.7, reviews: 186, stock: 120, unit: "bunch",
        category: "Fruits & Vegetables",
        description: "Sweet and energising ripe bananas, sourced directly from tropical farms.",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 3, title: "Juicy Alphonso Mangoes (Pack of 4)", price: 4.99, discount: 15, rating: 4.9, reviews: 322, stock: 50, unit: "pack",
        category: "Fruits & Vegetables",
        description: "Hand-picked, sun-ripened Alphonso mangoes bursting with tropical sweetness.",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 4, title: "Fresh Strawberries (250g)", price: 3.49, discount: 0, rating: 4.8, reviews: 198, stock: 60, unit: "250g",
        category: "Fruits & Vegetables",
        description: "Plump, garden-fresh strawberries with a perfect balance of sweetness and tartness.",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 5, title: "Baby Spinach Leaves (200g)", price: 2.29, discount: 0, rating: 4.6, reviews: 145, stock: 90, unit: "200g",
        category: "Fruits & Vegetables",
        description: "Tender, pesticide-free baby spinach packed with iron and vitamins.",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 6, title: "Broccoli Florets (500g)", price: 2.79, discount: 5, rating: 4.5, reviews: 95, stock: 75, unit: "500g",
        category: "Fruits & Vegetables",
        description: "Crisp, vibrant green broccoli florets — a powerhouse of vitamins C and K.",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 7, title: "Cherry Tomatoes (400g)", price: 2.99, discount: 0, rating: 4.7, reviews: 168, stock: 100, unit: "400g",
        category: "Fruits & Vegetables",
        description: "Sweet, bite-sized cherry tomatoes bursting with flavour.",
        image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 8, title: "Organic Carrots (1 kg)", price: 1.99, discount: 0, rating: 4.6, reviews: 132, stock: 110, unit: "kg",
        category: "Fruits & Vegetables",
        description: "Crunchy, naturally sweet organic carrots, freshly pulled from the farm.",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },

    // ── Spices ───────────────────────────────────────────────
    {
        id: 9, title: "Black Pepper Whole (100g)", price: 2.49, discount: 0, rating: 4.7, reviews: 110, stock: 150, unit: "100g",
        category: "Spices",
        description: "Bold, aromatic whole black peppercorns from Wayanad spice estates. Use in gravies, marinades or freshly ground.",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 10, title: "Kashmiri Red Chilli (200g)", price: 3.49, discount: 10, rating: 4.8, reviews: 188, stock: 90, unit: "200g",
        category: "Spices",
        description: "Deep-red, mildly hot Kashmiri chillies that give dishes a vibrant colour and subtle heat.",
        image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 11, title: "Turmeric Powder (100g)", price: 1.99, discount: 0, rating: 4.9, reviews: 324, stock: 200, unit: "100g",
        category: "Spices",
        description: "Pure, single-origin turmeric powder with high curcumin content. Earthy, anti-inflammatory superfood.",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 12, title: "Green Cardamom (50g)", price: 4.99, discount: 5, rating: 4.8, reviews: 97, stock: 60, unit: "50g",
        category: "Spices",
        description: "Aromatic green cardamom pods — the queen of spices. Perfect for chai, biryanis and Indian sweets.",
        image: "https://images.unsplash.com/photo-1600880292089-90a7e086d67d?w=500&auto=format&fit=crop&q=80",
    },

    // ── Masala Products ──────────────────────────────────────
    {
        id: 13, title: "Garam Masala Blend (100g)", price: 2.79, discount: 0, rating: 4.7, reviews: 210, stock: 120, unit: "100g",
        category: "Masala Products",
        description: "Authentic garam masala with 21 hand-selected spices. Adds depth and warmth to every dish.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 14, title: "Biryani Masala (80g)", price: 3.29, discount: 15, rating: 4.8, reviews: 156, stock: 80, unit: "80g",
        category: "Masala Products",
        description: "Restaurant-quality biryani masala with whole spices, saffron notes and fried onion flavour.",
        image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 15, title: "Chaat Masala (100g)", price: 1.99, discount: 0, rating: 4.6, reviews: 88, stock: 100, unit: "100g",
        category: "Masala Products",
        description: "Tangy, spicy chaat masala that elevates fruits, snacks and street food instantly.",
        image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 16, title: "Sambar Powder (200g)", price: 2.49, discount: 0, rating: 4.7, reviews: 134, stock: 90, unit: "200g",
        category: "Masala Products",
        description: "South Indian sambar powder with lentils, coriander and a medley of aromatic spices.",
        image: "https://images.unsplash.com/photo-1559181567-c3190ebb4f79?w=500&auto=format&fit=crop&q=80",
    },

    // ── Flour Varieties ──────────────────────────────────────
    {
        id: 17, title: "Whole Wheat Atta (5 kg)", price: 7.49, discount: 5, rating: 4.7, reviews: 278, stock: 150, unit: "5 kg",
        category: "Flour Varieties",
        description: "Stone-ground whole wheat flour from heritage wheat varieties. High fibre, perfect for soft rotis.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 18, title: "Ragi (Finger Millet) Flour (1 kg)", price: 3.99, discount: 0, rating: 4.6, reviews: 112, stock: 80, unit: "kg",
        category: "Flour Varieties",
        description: "Calcium-rich ragi flour ideal for rotis, porridge, dosas and healthy baking.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 19, title: "Chickpea (Besan) Flour (1 kg)", price: 2.99, discount: 10, rating: 4.8, reviews: 195, stock: 100, unit: "kg",
        category: "Flour Varieties",
        description: "Fine-ground gram flour used in pakoras, kadhi, ladoo and gluten-free baking.",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 20, title: "Maida All-Purpose Flour (1 kg)", price: 1.99, discount: 0, rating: 4.5, reviews: 89, stock: 120, unit: "kg",
        category: "Flour Varieties",
        description: "Finely milled refined flour for baking cakes, pastries, naan and more.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    },

    // ── Meat Varieties ───────────────────────────────────────
    {
        id: 21, title: "Fresh Chicken Curry Cut (1 kg)", price: 6.99, discount: 0, rating: 4.6, reviews: 234, stock: 40, unit: "kg",
        category: "Meat Varieties",
        description: "Hygienically cleaned and cut fresh chicken, ready to marinate or cook. No preservatives.",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 22, title: "Boneless Chicken Breast (500g)", price: 5.49, discount: 10, rating: 4.7, reviews: 198, stock: 35, unit: "500g",
        category: "Meat Varieties",
        description: "Lean, skinless boneless chicken breast — ideal for grilling, salads and healthy meals.",
        image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 23, title: "Fresh Mutton (500g)", price: 9.99, discount: 0, rating: 4.5, reviews: 143, stock: 25, unit: "500g",
        category: "Meat Varieties",
        description: "Tender, farm-raised mutton cut in curry-size pieces. Rich flavour for biryanis and curries.",
        image: "https://images.unsplash.com/photo-1602470521006-aaea8b2e7736?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 24, title: "Rohu Fish (1 kg)", price: 5.99, discount: 5, rating: 4.4, reviews: 88, stock: 30, unit: "kg",
        category: "Meat Varieties",
        description: "Fresh, cleaned river rohu fish — popular in Bengali, North Indian and Odia cuisine.",
        image: "https://images.unsplash.com/photo-1564834724105-918b73d2359e?w=500&auto=format&fit=crop&q=80",
    },

    // ── Dairy Products ───────────────────────────────────────
    {
        id: 25, title: "Farm Fresh Full Cream Milk (1L)", price: 1.49, discount: 0, rating: 4.9, reviews: 540, stock: 200, unit: "1L",
        category: "Dairy Products",
        description: "Pasteurised full-cream milk from free-range cows. Creamy, rich and fresh every morning.",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80",
        isFeatured: true, isSubscribable: true,
    },
    {
        id: 26, title: "Amul Butter (500g)", price: 3.99, discount: 0, rating: 4.8, reviews: 420, stock: 100, unit: "500g",
        category: "Dairy Products",
        description: "Creamery butter with a rich, slightly salted flavour. Perfect for cooking, baking and spreading.",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 27, title: "Homestyle Paneer (200g)", price: 2.99, discount: 10, rating: 4.7, reviews: 315, stock: 80, unit: "200g",
        category: "Dairy Products",
        description: "Soft, crumbly fresh paneer made from whole milk — a protein-rich staple of Indian cooking.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80",
        isFeatured: true, isSubscribable: true,
    },
    {
        id: 28, title: "Greek Yoghurt (500g)", price: 3.99, discount: 10, rating: 4.7, reviews: 235, stock: 80, unit: "500g",
        category: "Dairy Products",
        description: "Thick, creamy and tangy Greek yoghurt — high in protein and probiotics.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },

    // ── Snacks & Packaged Foods ──────────────────────────────
    {
        id: 29, title: "Lay's Classic Salted Chips (130g)", price: 1.49, discount: 0, rating: 4.5, reviews: 320, stock: 200, unit: "130g",
        category: "Snacks & Packaged Foods",
        description: "Thin, crispy potato chips lightly salted with that classic, irresistible crunch.",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 30, title: "Maggi Noodles 2-Minute (Pack of 4)", price: 2.49, discount: 5, rating: 4.8, reviews: 680, stock: 300, unit: "4-pack",
        category: "Snacks & Packaged Foods",
        description: "India's favourite 2-minute masala noodles. Quick, tasty and endlessly customisable.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 31, title: "Haldiram's Aloo Bhujia (400g)", price: 3.29, discount: 0, rating: 4.7, reviews: 280, stock: 150, unit: "400g",
        category: "Snacks & Packaged Foods",
        description: "Crispy, spiced potato sev — a classic Indian namkeen for snacking and garnishing.",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 32, title: "Oreo Sandwich Cookies (300g)", price: 2.99, discount: 10, rating: 4.8, reviews: 412, stock: 180, unit: "300g",
        category: "Snacks & Packaged Foods",
        description: "Classic chocolate biscuits with sweet cream filling. The original twist-lick-dunk experience.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80",
    },

    // ── Bathroom & Personal Care ─────────────────────────────
    {
        id: 33, title: "Dove Body Wash (250ml)", price: 3.99, discount: 15, rating: 4.7, reviews: 198, stock: 120, unit: "250ml",
        category: "Bathroom & Personal Care",
        description: "Gentle moisturising body wash with ¼ moisturising cream. Leaves skin soft and smooth.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 34, title: "Head & Shoulders Shampoo (400ml)", price: 5.49, discount: 0, rating: 4.6, reviews: 234, stock: 90, unit: "400ml",
        category: "Bathroom & Personal Care",
        description: "Anti-dandruff shampoo that cleans, protects and leaves hair clean and fresh.",
        image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 35, title: "Colgate Max Fresh Toothpaste (150g)", price: 2.29, discount: 0, rating: 4.7, reviews: 320, stock: 200, unit: "150g",
        category: "Bathroom & Personal Care",
        description: "Max Fresh with cooling crystals — 12-hour mouth freshness and cavity protection.",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 36, title: "Nivea Moisturising Cream (200ml)", price: 4.49, discount: 10, rating: 4.8, reviews: 280, stock: 100, unit: "200ml",
        category: "Bathroom & Personal Care",
        description: "Deep moisturising cream for normal to dry skin. Enriched with Eucerit® and glycerine.",
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b03?w=500&auto=format&fit=crop&q=80",
    },

    // ── Ice Creams & Frozen Items ────────────────────────────
    {
        id: 37, title: "Amul Vanilla Ice Cream (1L)", price: 4.99, discount: 0, rating: 4.8, reviews: 432, stock: 60, unit: "1L",
        category: "Ice Creams & Frozen Items",
        description: "Classic, creamy vanilla ice cream from India's favourite dairy brand.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 38, title: "Kwality Walls Cornetto (Pack of 4)", price: 5.99, discount: 10, rating: 4.7, reviews: 198, stock: 45, unit: "4-pack",
        category: "Ice Creams & Frozen Items",
        description: "Crunchy waffle cone filled with chocolate and vanilla ice cream, topped with almonds.",
        image: "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 39, title: "McCain Frozen Fries (1 kg)", price: 3.99, discount: 5, rating: 4.5, reviews: 156, stock: 70, unit: "kg",
        category: "Ice Creams & Frozen Items",
        description: "Golden baked or fried McCain shoestring potato fries — ready in minutes.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 40, title: "Vadilal Alphonso Mango Kulfi (6 pcs)", price: 4.49, discount: 0, rating: 4.9, reviews: 216, stock: 50, unit: "6 pcs",
        category: "Ice Creams & Frozen Items",
        description: "Creamy Alphonso mango kulfi with a rich, authentic taste. A summer classic.",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&auto=format&fit=crop&q=80",
    },

    // ── Beverages ────────────────────────────────────────────
    {
        id: 41, title: "Tropicana Orange Juice (1L)", price: 3.49, discount: 0, rating: 4.7, reviews: 345, stock: 150, unit: "1L",
        category: "Beverages",
        description: "100% pure squeezed orange juice with the goodness of Vitamin C. No added sugar.",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 42, title: "Coca-Cola Classic (6 × 330ml)", price: 4.99, discount: 5, rating: 4.6, reviews: 520, stock: 200, unit: "6-pack",
        category: "Beverages",
        description: "The original taste of Coca-Cola — refreshing, bubbly and timeless.",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 43, title: "Tata Tea Premium (500g)", price: 5.99, discount: 10, rating: 4.8, reviews: 412, stock: 100, unit: "500g",
        category: "Beverages",
        description: "Rich, full-bodied CTC black tea from Assam gardens. Strong brew, bold flavour.",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },
    {
        id: 44, title: "Nescafe Classic Instant Coffee (100g)", price: 4.99, discount: 0, rating: 4.7, reviews: 388, stock: 90, unit: "100g",
        category: "Beverages",
        description: "Smooth, aromatic instant coffee with an intense flavour. Ready in seconds.",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },

    // ── Household Essentials ─────────────────────────────────
    {
        id: 45, title: "Vim Dishwash Liquid (750ml)", price: 2.99, discount: 0, rating: 4.7, reviews: 280, stock: 200, unit: "750ml",
        category: "Household Essentials",
        description: "Powerful dishwash liquid with lime that cuts through grease and kills germs.",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 46, title: "Surf Excel Detergent Powder (2 kg)", price: 6.99, discount: 10, rating: 4.8, reviews: 510, stock: 150, unit: "2 kg",
        category: "Household Essentials",
        description: "Tough stain removal detergent with a fresh fragrance. Works in cold water too.",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 47, title: "Colin Glass Cleaner Spray (500ml)", price: 2.49, discount: 0, rating: 4.5, reviews: 145, stock: 120, unit: "500ml",
        category: "Household Essentials",
        description: "Crystal-clear glass cleaner with anti-streak formula. Perfect for windows and mirrors.",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 48, title: "Harpic Toilet Cleaner (500ml)", price: 3.29, discount: 5, rating: 4.6, reviews: 198, stock: 100, unit: "500ml",
        category: "Household Essentials",
        description: "Power-plus toilet cleaner that removes stains, limescale and 99.9% of germs.",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=80",
    },

    // ── Bakery Products ──────────────────────────────────────
    {
        id: 49, title: "Sourdough Artisan Bread", price: 4.49, discount: 0, rating: 4.9, reviews: 504, stock: 30, unit: "loaf",
        category: "Bakery Products",
        description: "Slow-fermented sourdough with crispy crust and soft, chewy crumb. Baked fresh daily.",
        image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 50, title: "Blueberry Muffins (6 pcs)", price: 5.49, discount: 0, rating: 4.8, reviews: 289, stock: 40, unit: "6 pcs",
        category: "Bakery Products",
        description: "Soft, fluffy muffins bursting with plump blueberries. Baked fresh every morning.",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 51, title: "Chocolate Truffle Cake (500g)", price: 9.99, discount: 15, rating: 4.9, reviews: 367, stock: 20, unit: "500g",
        category: "Bakery Products",
        description: "Decadent dark chocolate truffle cake layered with ganache and topped with cocoa dust.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 52, title: "Butter Croissants (4 pcs)", price: 3.99, discount: 0, rating: 4.7, reviews: 198, stock: 35, unit: "4 pcs",
        category: "Bakery Products",
        description: "Flaky, golden-brown all-butter croissants baked fresh each morning. Pairs with jam or cheese.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80",
    },

    // ── Organic & Healthy Products ───────────────────────────
    {
        id: 53, title: "Chia Seeds (250g)", price: 4.99, discount: 0, rating: 4.8, reviews: 312, stock: 80, unit: "250g",
        category: "Organic & Healthy Products",
        description: "Certified organic chia seeds packed with Omega-3, fibre and protein. Add to smoothies or pudding.",
        image: "https://images.unsplash.com/photo-1519060825751-b137b56c48ab?w=500&auto=format&fit=crop&q=80",
        isOrganic: true, isFeatured: true,
    },
    {
        id: 54, title: "Wild Honey (350g)", price: 6.99, discount: 0, rating: 4.9, reviews: 320, stock: 55, unit: "350g",
        category: "Organic & Healthy Products",
        description: "Raw, unfiltered wild honey harvested from forest hives. Deeply aromatic natural sweetener.",
        image: "https://images.unsplash.com/photo-1546552768-9e3a94b38a59?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 55, title: "Quinoa (500g)", price: 5.49, discount: 10, rating: 4.7, reviews: 198, stock: 70, unit: "500g",
        category: "Organic & Healthy Products",
        description: "Protein-rich superfood grain with all 9 essential amino acids. Great for salads and bowls.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 56, title: "Almond Butter (250g)", price: 7.99, discount: 5, rating: 4.8, reviews: 156, stock: 45, unit: "250g",
        category: "Organic & Healthy Products",
        description: "100% natural almond butter — no added sugar or palm oil. Smooth, creamy and nutritious.",
        image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },

    // ── Baby Care Products ───────────────────────────────────
    {
        id: 57, title: "Pampers Diapers New Born (40 pcs)", price: 12.99, discount: 10, rating: 4.8, reviews: 456, stock: 100, unit: "40 pcs",
        category: "Baby Care Products",
        description: "Ultra-soft, leakproof newborn diapers that keep baby dry up to 12 hours with gentle elastic waist.",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 58, title: "Johnson's Baby Shampoo (500ml)", price: 4.99, discount: 0, rating: 4.9, reviews: 540, stock: 80, unit: "500ml",
        category: "Baby Care Products",
        description: "Gentle no-tears baby shampoo that cleans without irritating eyes. Clinically tested.",
        image: "https://images.unsplash.com/photo-1607004468138-e7e23ea26947?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 59, title: "Nestum Baby Cereal (300g)", price: 3.99, discount: 0, rating: 4.7, reviews: 234, stock: 65, unit: "300g",
        category: "Baby Care Products",
        description: "Nutritious multi-grain baby cereal fortified with iron and vitamins for 6+ months babies.",
        image: "https://images.unsplash.com/photo-1584308518571-dac93d1dfc9f?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 60, title: "Himalaya Baby Lotion (400ml)", price: 3.49, discount: 5, rating: 4.8, reviews: 312, stock: 90, unit: "400ml",
        category: "Baby Care Products",
        description: "Mild, soothing baby lotion with natural olive oil and country mallow for soft baby skin.",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80",
    },

    // ── Pet Care Products ────────────────────────────────────
    {
        id: 61, title: "Pedigree Adult Dog Food (3 kg)", price: 14.99, discount: 10, rating: 4.7, reviews: 312, stock: 60, unit: "3 kg",
        category: "Pet Care Products",
        description: "Complete balanced nutrition for adult dogs. Chicken and veg flavour with omega fatty acids.",
        image: "https://images.unsplash.com/photo-1584309108498-af4d78b80a0a?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 62, title: "Whiskas Cat Food Pouches (12 × 85g)", price: 8.99, discount: 0, rating: 4.6, reviews: 198, stock: 80, unit: "12-pack",
        category: "Pet Care Products",
        description: "Tender chunks in jelly — wholesome and delicious meals your cat will love.",
        image: "https://images.unsplash.com/photo-1589924691995-400dc9eef119?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 63, title: "Pet Dog Shampoo — Neem & Aloe (200ml)", price: 3.99, discount: 5, rating: 4.5, reviews: 112, stock: 70, unit: "200ml",
        category: "Pet Care Products",
        description: "Natural neem and aloe vera dog shampoo that cleanses, conditions and repels ticks & fleas.",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 64, title: "Bird Seed Mix (1 kg)", price: 2.99, discount: 0, rating: 4.7, reviews: 78, stock: 50, unit: "kg",
        category: "Pet Care Products",
        description: "Premium seed mix for parrots, budgies and finches. Sunflower seeds, millet, oats and more.",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&auto=format&fit=crop&q=80",
    },

    // ── Extra Pantry (Organic & extras) ─────────────────────
    {
        id: 65, title: "Extra Virgin Olive Oil (500ml)", price: 8.99, discount: 0, rating: 4.8, reviews: 162, stock: 70, unit: "500ml",
        category: "Organic & Healthy Products",
        description: "Cold-pressed, single-origin extra virgin olive oil from Mediterranean groves.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 66, title: "Basmati Rice (2 kg)", price: 5.49, discount: 5, rating: 4.7, reviews: 278, stock: 150, unit: "2 kg",
        category: "Flour Varieties",
        description: "Aged, long-grain basmati rice with a fragrant aroma and fluffy texture.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 67, title: "Farm Fresh Eggs (12 pcs)", price: 3.29, discount: 0, rating: 4.9, reviews: 410, stock: 200, unit: "12 pcs",
        category: "Dairy Products",
        description: "Free-range eggs from happy hens. Rich, golden yolks for breakfast, baking and cooking.",
        image: "https://images.unsplash.com/photo-1569288063389-cf2f6a50a3c6?w=500&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },
    {
        id: 68, title: "Red Bull Energy Drink (250ml × 4)", price: 6.99, discount: 0, rating: 4.6, reviews: 234, stock: 120, unit: "4-pack",
        category: "Beverages",
        description: "Energising drink with taurine, B-vitamins and caffeine. Wings when you need them.",
        image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 69, title: "Fresh Lemons (6 pcs)", price: 1.99, discount: 0, rating: 4.6, reviews: 109, stock: 130, unit: "6 pcs",
        category: "Fruits & Vegetables",
        description: "Bright, zesty lemons with thin, juicy flesh. Packed with Vitamin C.",
        image: "https://images.unsplash.com/photo-1582287014914-1db2e3d9c776?w=500&auto=format&fit=crop&q=80",
    },
    {
        id: 70, title: "Watermelon (1 whole ~3kg)", price: 3.99, discount: 0, rating: 4.8, reviews: 190, stock: 40, unit: "piece",
        category: "Fruits & Vegetables",
        description: "Juicy, sweet seedless watermelon. Perfect summer fruit — hydrating and refreshing.",
        image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
];

// ─────────────────────────────────────────────────────────────
//  OFFERS
// ─────────────────────────────────────────────────────────────
export const OFFERS = [
    {
        id: "O1", title: "Weekend Freshness Sale",
        desc: "Get up to 30% off on all Fruits & Vegetables this weekend",
        discount: "30% OFF", category: "Fruits & Vegetables", color: "green",
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-02-23", code: "FRESH30",
    },
    {
        id: "O2", title: "Dairy Daily Deal",
        desc: "Subscribe to dairy products and save 20% on every order",
        discount: "20% OFF", category: "Dairy Products", color: "sky",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-03-01", code: "DAIRY20",
    },
    {
        id: "O3", title: "Spice Up Your Kitchen",
        desc: "Buy any 3 spice products and get the cheapest one free",
        discount: "3+1 Free", category: "Spices", color: "red",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-02-28", code: "SPICE3",
    },
    {
        id: "O4", title: "Personal Care Mega Sale",
        desc: "Flat 15% off on all personal care products above ₹500",
        discount: "15% OFF", category: "Bathroom & Personal Care", color: "teal",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-03-10", code: "CARE15",
    },
    {
        id: "O5", title: "Snack Attack",
        desc: "Buy 2 snack packs, get 1 free. Limited items!",
        discount: "Buy 2 Get 1", category: "Snacks & Packaged Foods", color: "purple",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-02-25", code: "SNACK3",
    },
];

// ─────────────────────────────────────────────────────────────
//  COMBO DEALS
// ─────────────────────────────────────────────────────────────
export const COMBO_DEALS = [
    {
        id: "C1", title: "Breakfast Starter Pack",
        products: [49, 25, 67],   // Sourdough bread, Milk, Eggs
        originalPrice: 9.27, comboPrice: 7.49, savings: 1.78,
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80",
        badge: "Best Value",
    },
    {
        id: "C2", title: "Masala Kitchen Bundle",
        products: [13, 14, 11],   // Garam masala, Biryani masala, Turmeric
        originalPrice: 9.07, comboPrice: 6.99, savings: 2.08,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
        badge: "Chef's Pick",
    },
    {
        id: "C3", title: "Health & Wellness Combo",
        products: [53, 54, 55],   // Chia seeds, Wild honey, Quinoa
        originalPrice: 17.47, comboPrice: 13.99, savings: 3.48,
        image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&auto=format&fit=crop&q=80",
        badge: "Organic Pick",
    },
    {
        id: "C4", title: "Party Snack Box",
        products: [29, 31, 32],   // Lay's, Aloo Bhujia, Oreo
        originalPrice: 7.77, comboPrice: 5.99, savings: 1.78,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80",
        badge: "Party Special",
    },
];

// ─────────────────────────────────────────────────────────────
//  DELIVERY SLOTS
// ─────────────────────────────────────────────────────────────
export const DELIVERY_SLOTS = [
    { id: "S1", label: "Express (2 Hours)", time: "Within 2 hours", price: 2.99, icon: "⚡" },
    { id: "S2", label: "Morning", time: "7 AM – 12 PM", price: 0, icon: "🌅" },
    { id: "S3", label: "Afternoon", time: "12 PM – 5 PM", price: 0, icon: "☀️" },
    { id: "S4", label: "Evening", time: "5 PM – 9 PM", price: 0, icon: "🌆" },
    { id: "S5", label: "Scheduled", time: "Pick your date", price: 1.49, icon: "📅" },
];
