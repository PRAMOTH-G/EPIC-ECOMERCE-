// ─────────────────────────────────────────────────────────────
//  FreshMart Departmental Store — Data Layer
//  15 Departments · 225 Products · Offers · Combo Deals
// ─────────────────────────────────────────────────────────────
import { EXTRA_PRODUCTS_1 } from './data-extra-1';
import { EXTRA_PRODUCTS_2 } from './data-extra-2';
import { EXTRA_PRODUCTS_3 } from './data-extra-3';

export const DEPARTMENTS = [
    {
        id: 1, name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥦", color: "green",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&auto=format&fit=crop&q=80",
        description: "Farm-fresh fruits, veggies & greens delivered daily"
    },
    {
        id: 2, name: "Spices", slug: "spices", icon: "🌶️", color: "red",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80",
        description: "Whole, ground & blended spices from origin farms"
    },
    {
        id: 3, name: "Masala Products", slug: "masala-products", icon: "🫙", color: "orange",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?w=300&auto=format&fit=crop&q=80",
        description: "Ready-to-use masalas, curry powders & blends"
    },
    {
        id: 4, name: "Flour Varieties", slug: "flour-varieties", icon: "🌾", color: "yellow",
        image: "https://images.unsplash.com/photo-1621496832759-a0d2e3ab0a98?w=300&auto=format&fit=crop&q=80",
        description: "Stone-ground whole wheat, millets & specialty flours"
    },
    {
        id: 5, name: "Meat Varieties", slug: "meat-varieties", icon: "🍗", color: "rose",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&auto=format&fit=crop&q=80",
        description: "Fresh & marinated chicken, mutton, fish & seafood"
    },
    {
        id: 6, name: "Dairy Products", slug: "dairy-products", icon: "🥛", color: "sky",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&auto=format&fit=crop&q=80",
        description: "Milk, paneer, curd, butter, cheese & more"
    },
    {
        id: 7, name: "Snacks & Packaged Foods", slug: "snacks-packaged", icon: "🍿", color: "purple",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80",
        description: "Chips, biscuits, namkeen, noodles & instant foods"
    },
    {
        id: 8, name: "Bathroom & Personal Care", slug: "personal-care", icon: "🧴", color: "teal",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&auto=format&fit=crop&q=80",
        description: "Soaps, shampoo, skincare, oral care & grooming"
    },
    {
        id: 9, name: "Ice Creams & Frozen Items", slug: "frozen-items", icon: "🍦", color: "indigo",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&auto=format&fit=crop&q=80",
        description: "Ice creams, frozen veg, frozen meals & more"
    },
    {
        id: 10, name: "Beverages", slug: "beverages", icon: "🥤", color: "cyan",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&auto=format&fit=crop&q=80",
        description: "Juices, soft drinks, tea, coffee & energy drinks"
    },
    {
        id: 11, name: "Household Essentials", slug: "household-essentials", icon: "🧹", color: "lime",
        image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=300&auto=format&fit=crop&q=80",
        description: "Cleaning supplies, detergents, mops & sanitisers"
    },
    {
        id: 12, name: "Bakery Products", slug: "bakery-products", icon: "🍞", color: "amber",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80",
        description: "Fresh-baked bread, cakes, cookies & pastries"
    },
    {
        id: 13, name: "Organic & Healthy Products", slug: "organic-healthy", icon: "🌿", color: "emerald",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=80",
        description: "Certified organic, superfoods & health snacks"
    },
    {
        id: 14, name: "Baby Care Products", slug: "baby-care", icon: "🍼", color: "pink",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80",
        description: "Diapers, formula, baby food & baby skin care"
    },
    {
        id: 15, name: "Pet Care Products", slug: "pet-care", icon: "🐾", color: "violet",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&auto=format&fit=crop&q=80",
        description: "Pet food, grooming, accessories & health care"
    },
];

// Backward-compatible alias
export const CATEGORIES = DEPARTMENTS;

// ─────────────────────────────────────────────────────────────
//  PRODUCTS  (70 products · corrected images)
// ─────────────────────────────────────────────────────────────
const PRODUCTS_BASE = [

    // ── Fruits & Vegetables ──────────────────────────────────
    {
        id: 1, title: "Organic Red Apples (1 kg)", price: 249, discount: 10, rating: 4.8, reviews: 214, stock: 80, unit: "kg",
        category: "Fruits & Vegetables",
        description: "Freshly harvested, crisp organic red apples. Rich in fibre, vitamins and natural antioxidants.",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80",
        isOrganic: true, isFeatured: true,
    },
    {
        id: 2, title: "Ripe Bananas (Bunch ~6 pcs)", price: 49, discount: 0, rating: 4.7, reviews: 186, stock: 120, unit: "bunch",
        category: "Fruits & Vegetables",
        description: "Sweet and energising ripe bananas, sourced directly from tropical farms.",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 3, title: "Juicy Alphonso Mangoes (Pack of 4)", price: 399, discount: 15, rating: 4.9, reviews: 322, stock: 50, unit: "pack",
        category: "Fruits & Vegetables",
        description: "Hand-picked, sun-ripened Alphonso mangoes bursting with tropical sweetness.",
        image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 4, title: "Fresh Strawberries (250g)", price: 199, discount: 0, rating: 4.8, reviews: 198, stock: 60, unit: "250g",
        category: "Fruits & Vegetables",
        description: "Plump, garden-fresh strawberries with a perfect balance of sweetness and tartness.",
        image: "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 5, title: "Baby Spinach Leaves (200g)", price: 89, discount: 0, rating: 4.6, reviews: 145, stock: 90, unit: "200g",
        category: "Fruits & Vegetables",
        description: "Tender, pesticide-free baby spinach packed with iron and vitamins.",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 6, title: "Broccoli Florets (500g)", price: 129, discount: 5, rating: 4.5, reviews: 95, stock: 75, unit: "500g",
        category: "Fruits & Vegetables",
        description: "Crisp, vibrant green broccoli florets — a powerhouse of vitamins C and K.",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 7, title: "Cherry Tomatoes (400g)", price: 119, discount: 0, rating: 4.7, reviews: 168, stock: 100, unit: "400g",
        category: "Fruits & Vegetables",
        description: "Sweet, bite-sized cherry tomatoes bursting with flavour.",
        image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 8, title: "Organic Carrots (1 kg)", price: 79, discount: 0, rating: 4.6, reviews: 132, stock: 110, unit: "kg",
        category: "Fruits & Vegetables",
        description: "Crunchy, naturally sweet organic carrots, freshly pulled from the farm.",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },

    // ── Spices ───────────────────────────────────────────────
    {
        id: 9, title: "Black Pepper Whole (100g)", price: 149, discount: 0, rating: 4.7, reviews: 110, stock: 150, unit: "100g",
        category: "Spices",
        description: "Bold, aromatic whole black peppercorns from Wayanad spice estates.",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 10, title: "Kashmiri Red Chilli (200g)", price: 189, discount: 10, rating: 4.8, reviews: 188, stock: 90, unit: "200g",
        category: "Spices",
        description: "Deep-red, mildly hot Kashmiri chillies that give dishes a vibrant colour.",
        image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 11, title: "Turmeric Powder (100g)", price: 99, discount: 0, rating: 4.9, reviews: 324, stock: 200, unit: "100g",
        category: "Spices",
        description: "Pure, single-origin turmeric powder with high curcumin content.",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 12, title: "Green Cardamom (50g)", price: 299, discount: 5, rating: 4.8, reviews: 97, stock: 60, unit: "50g",
        category: "Spices",
        description: "Aromatic green cardamom pods — the queen of spices.",
        image: "https://images.unsplash.com/photo-1612442443564-7a0a410ee3a5?w=600&auto=format&fit=crop&q=80",
    },

    // ── Masala Products ──────────────────────────────────────
    {
        id: 13, title: "Garam Masala Blend (100g)", price: 149, discount: 0, rating: 4.7, reviews: 210, stock: 120, unit: "100g",
        category: "Masala Products",
        description: "Authentic garam masala with 21 hand-selected spices.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 14, title: "Biryani Masala (80g)", price: 179, discount: 15, rating: 4.8, reviews: 156, stock: 80, unit: "80g",
        category: "Masala Products",
        description: "Restaurant-quality biryani masala with whole spices and saffron notes.",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 15, title: "Chaat Masala (100g)", price: 89, discount: 0, rating: 4.6, reviews: 88, stock: 100, unit: "100g",
        category: "Masala Products",
        description: "Tangy, spicy chaat masala that elevates fruits, snacks and street food.",
        image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 16, title: "Sambar Powder (200g)", price: 129, discount: 0, rating: 4.7, reviews: 134, stock: 90, unit: "200g",
        category: "Masala Products",
        description: "South Indian sambar powder with lentils, coriander and aromatic spices.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?w=600&auto=format&fit=crop&q=80",
    },

    // ── Flour Varieties ──────────────────────────────────────
    {
        id: 17, title: "Whole Wheat Atta (5 kg)", price: 349, discount: 5, rating: 4.7, reviews: 278, stock: 150, unit: "5 kg",
        category: "Flour Varieties",
        description: "Stone-ground whole wheat flour from heritage wheat varieties.",
        image: "https://images.unsplash.com/photo-1621496832759-a0d2e3ab0a98?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 18, title: "Ragi (Finger Millet) Flour (1 kg)", price: 179, discount: 0, rating: 4.6, reviews: 112, stock: 80, unit: "kg",
        category: "Flour Varieties",
        description: "Calcium-rich ragi flour ideal for rotis, porridge and dosas.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 19, title: "Chickpea (Besan) Flour (1 kg)", price: 129, discount: 10, rating: 4.8, reviews: 195, stock: 100, unit: "kg",
        category: "Flour Varieties",
        description: "Fine-ground gram flour used in pakoras, kadhi, ladoo and gluten-free baking.",
        image: "https://images.unsplash.com/photo-1618329340733-4f6b37e9f9e4?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 20, title: "Maida All-Purpose Flour (1 kg)", price: 59, discount: 0, rating: 4.5, reviews: 89, stock: 120, unit: "kg",
        category: "Flour Varieties",
        description: "Finely milled refined flour for baking cakes, pastries and naan.",
        image: "https://images.unsplash.com/photo-1621496832759-a0d2e3ab0a98?w=600&auto=format&fit=crop&q=80",
    },

    // ── Meat Varieties ───────────────────────────────────────
    {
        id: 21, title: "Fresh Chicken Curry Cut (1 kg)", price: 249, discount: 0, rating: 4.6, reviews: 234, stock: 40, unit: "kg",
        category: "Meat Varieties",
        description: "Hygienically cleaned and cut fresh chicken, ready to marinate or cook.",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 22, title: "Boneless Chicken Breast (500g)", price: 199, discount: 10, rating: 4.7, reviews: 198, stock: 35, unit: "500g",
        category: "Meat Varieties",
        description: "Lean, skinless boneless chicken breast — ideal for grilling and salads.",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 23, title: "Fresh Mutton (500g)", price: 499, discount: 0, rating: 4.5, reviews: 143, stock: 25, unit: "500g",
        category: "Meat Varieties",
        description: "Tender, farm-raised mutton cut in curry-size pieces.",
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 24, title: "Rohu Fish (1 kg)", price: 299, discount: 5, rating: 4.4, reviews: 88, stock: 30, unit: "kg",
        category: "Meat Varieties",
        description: "Fresh, cleaned river rohu fish — popular in Bengali and North Indian cuisine.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80",
    },

    // ── Dairy Products ───────────────────────────────────────
    {
        id: 25, title: "Farm Fresh Full Cream Milk (1L)", price: 68, discount: 0, rating: 4.9, reviews: 540, stock: 200, unit: "1L",
        category: "Dairy Products",
        description: "Pasteurised full-cream milk from free-range cows. Creamy and rich.",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80",
        isFeatured: true, isSubscribable: true,
    },
    {
        id: 26, title: "Amul Butter (500g)", price: 249, discount: 0, rating: 4.8, reviews: 420, stock: 100, unit: "500g",
        category: "Dairy Products",
        description: "Creamery butter with a rich, slightly salted flavour.",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 27, title: "Homestyle Paneer (200g)", price: 99, discount: 10, rating: 4.7, reviews: 315, stock: 80, unit: "200g",
        category: "Dairy Products",
        description: "Soft, crumbly fresh paneer made from whole milk.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
        isFeatured: true, isSubscribable: true,
    },
    {
        id: 28, title: "Greek Yoghurt (500g)", price: 149, discount: 10, rating: 4.7, reviews: 235, stock: 80, unit: "500g",
        category: "Dairy Products",
        description: "Thick, creamy and tangy Greek yoghurt — high in protein and probiotics.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },

    // ── Snacks & Packaged Foods ──────────────────────────────
    {
        id: 29, title: "Lay's Classic Salted Chips (130g)", price: 40, discount: 0, rating: 4.5, reviews: 320, stock: 200, unit: "130g",
        category: "Snacks & Packaged Foods",
        description: "Thin, crispy potato chips lightly salted with that classic, irresistible crunch.",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 30, title: "Maggi Noodles 2-Minute (Pack of 4)", price: 72, discount: 5, rating: 4.8, reviews: 680, stock: 300, unit: "4-pack",
        category: "Snacks & Packaged Foods",
        description: "India's favourite 2-minute masala noodles.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 31, title: "Haldiram's Aloo Bhujia (400g)", price: 149, discount: 0, rating: 4.7, reviews: 280, stock: 150, unit: "400g",
        category: "Snacks & Packaged Foods",
        description: "Crispy, spiced potato sev — a classic Indian namkeen.",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 32, title: "Oreo Sandwich Cookies (300g)", price: 130, discount: 10, rating: 4.8, reviews: 412, stock: 180, unit: "300g",
        category: "Snacks & Packaged Foods",
        description: "Classic chocolate biscuits with sweet cream filling.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80",
    },

    // ── Bathroom & Personal Care ─────────────────────────────
    {
        id: 33, title: "Dove Body Wash (250ml)", price: 199, discount: 15, rating: 4.7, reviews: 198, stock: 120, unit: "250ml",
        category: "Bathroom & Personal Care",
        description: "Gentle moisturising body wash with ¼ moisturising cream.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 34, title: "Head & Shoulders Shampoo (400ml)", price: 329, discount: 0, rating: 4.6, reviews: 234, stock: 90, unit: "400ml",
        category: "Bathroom & Personal Care",
        description: "Anti-dandruff shampoo that cleans, protects and leaves hair fresh.",
        image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 35, title: "Colgate Max Fresh Toothpaste (150g)", price: 109, discount: 0, rating: 4.7, reviews: 320, stock: 200, unit: "150g",
        category: "Bathroom & Personal Care",
        description: "Max Fresh with cooling crystals — 12-hour mouth freshness.",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 36, title: "Nivea Moisturising Cream (200ml)", price: 249, discount: 10, rating: 4.8, reviews: 280, stock: 100, unit: "200ml",
        category: "Bathroom & Personal Care",
        description: "Deep moisturising cream enriched with Eucerit® and glycerine.",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80",
    },

    // ── Ice Creams & Frozen Items ────────────────────────────
    {
        id: 37, title: "Amul Vanilla Ice Cream (1L)", price: 199, discount: 0, rating: 4.8, reviews: 432, stock: 60, unit: "1L",
        category: "Ice Creams & Frozen Items",
        description: "Classic, creamy vanilla ice cream from India's favourite dairy brand.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 38, title: "Kwality Walls Cornetto (Pack of 4)", price: 280, discount: 10, rating: 4.7, reviews: 198, stock: 45, unit: "4-pack",
        category: "Ice Creams & Frozen Items",
        description: "Crunchy waffle cone filled with chocolate and vanilla ice cream.",
        image: "https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 39, title: "McCain Frozen Fries (1 kg)", price: 199, discount: 5, rating: 4.5, reviews: 156, stock: 70, unit: "kg",
        category: "Ice Creams & Frozen Items",
        description: "Golden baked or fried McCain shoestring potato fries — ready in minutes.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 40, title: "Vadilal Alphonso Mango Kulfi (6 pcs)", price: 249, discount: 0, rating: 4.9, reviews: 216, stock: 50, unit: "6 pcs",
        category: "Ice Creams & Frozen Items",
        description: "Creamy Alphonso mango kulfi — a summer classic.",
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=80",
    },

    // ── Beverages ────────────────────────────────────────────
    {
        id: 41, title: "Tropicana Orange Juice (1L)", price: 149, discount: 0, rating: 4.7, reviews: 345, stock: 150, unit: "1L",
        category: "Beverages",
        description: "100% pure squeezed orange juice with Vitamin C. No added sugar.",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 42, title: "Coca-Cola Classic (6 × 330ml)", price: 180, discount: 5, rating: 4.6, reviews: 520, stock: 200, unit: "6-pack",
        category: "Beverages",
        description: "The original taste of Coca-Cola — refreshing, bubbly and timeless.",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 43, title: "Tata Tea Premium (500g)", price: 299, discount: 10, rating: 4.8, reviews: 412, stock: 100, unit: "500g",
        category: "Beverages",
        description: "Rich, full-bodied CTC black tea from Assam gardens.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },
    {
        id: 44, title: "Nescafe Classic Instant Coffee (100g)", price: 249, discount: 0, rating: 4.7, reviews: 388, stock: 90, unit: "100g",
        category: "Beverages",
        description: "Smooth, aromatic instant coffee with intense flavour.",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },

    // ── Household Essentials ─────────────────────────────────
    {
        id: 45, title: "Vim Dishwash Liquid (750ml)", price: 129, discount: 0, rating: 4.7, reviews: 280, stock: 200, unit: "750ml",
        category: "Household Essentials",
        description: "Powerful dishwash liquid with lime that cuts through grease.",
        image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 46, title: "Surf Excel Detergent Powder (2 kg)", price: 349, discount: 10, rating: 4.8, reviews: 510, stock: 150, unit: "2 kg",
        category: "Household Essentials",
        description: "Tough stain removal detergent with fresh fragrance.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 47, title: "Colin Glass Cleaner Spray (500ml)", price: 119, discount: 0, rating: 4.5, reviews: 145, stock: 120, unit: "500ml",
        category: "Household Essentials",
        description: "Crystal-clear glass cleaner with anti-streak formula.",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 48, title: "Harpic Toilet Cleaner (500ml)", price: 149, discount: 5, rating: 4.6, reviews: 198, stock: 100, unit: "500ml",
        category: "Household Essentials",
        description: "Power-plus toilet cleaner that removes stains and kills 99.9% germs.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80",
    },

    // ── Bakery Products ──────────────────────────────────────
    {
        id: 49, title: "Sourdough Artisan Bread", price: 199, discount: 0, rating: 4.9, reviews: 504, stock: 30, unit: "loaf",
        category: "Bakery Products",
        description: "Slow-fermented sourdough with crispy crust and soft, chewy crumb.",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 50, title: "Blueberry Muffins (6 pcs)", price: 249, discount: 0, rating: 4.8, reviews: 289, stock: 40, unit: "6 pcs",
        category: "Bakery Products",
        description: "Soft, fluffy muffins bursting with plump blueberries.",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 51, title: "Chocolate Truffle Cake (500g)", price: 649, discount: 15, rating: 4.9, reviews: 367, stock: 20, unit: "500g",
        category: "Bakery Products",
        description: "Decadent dark chocolate truffle cake layered with ganache.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 52, title: "Butter Croissants (4 pcs)", price: 199, discount: 0, rating: 4.7, reviews: 198, stock: 35, unit: "4 pcs",
        category: "Bakery Products",
        description: "Flaky, golden-brown all-butter croissants baked fresh each morning.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    },

    // ── Organic & Healthy Products ───────────────────────────
    {
        id: 53, title: "Chia Seeds (250g)", price: 299, discount: 0, rating: 4.8, reviews: 312, stock: 80, unit: "250g",
        category: "Organic & Healthy Products",
        description: "Certified organic chia seeds packed with Omega-3, fibre and protein.",
        image: "https://images.unsplash.com/photo-1514733670139-4d237900d7b8?w=600&auto=format&fit=crop&q=80",
        isOrganic: true, isFeatured: true,
    },
    {
        id: 54, title: "Wild Honey (350g)", price: 499, discount: 0, rating: 4.9, reviews: 320, stock: 55, unit: "350g",
        category: "Organic & Healthy Products",
        description: "Raw, unfiltered wild honey harvested from forest hives.",
        image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 55, title: "Quinoa (500g)", price: 349, discount: 10, rating: 4.7, reviews: 198, stock: 70, unit: "500g",
        category: "Organic & Healthy Products",
        description: "Protein-rich superfood with all 9 essential amino acids.",
        image: "https://images.unsplash.com/photo-1598449426314-8b02525e8733?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 56, title: "Almond Butter (250g)", price: 599, discount: 5, rating: 4.8, reviews: 156, stock: 45, unit: "250g",
        category: "Organic & Healthy Products",
        description: "100% natural almond butter — no added sugar or palm oil.",
        image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },

    // ── Baby Care Products ───────────────────────────────────
    {
        id: 57, title: "Pampers Diapers New Born (40 pcs)", price: 849, discount: 10, rating: 4.8, reviews: 456, stock: 100, unit: "40 pcs",
        category: "Baby Care Products",
        description: "Ultra-soft, leakproof newborn diapers — keeps baby dry up to 12 hours.",
        image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 58, title: "Johnson's Baby Shampoo (500ml)", price: 229, discount: 0, rating: 4.9, reviews: 540, stock: 80, unit: "500ml",
        category: "Baby Care Products",
        description: "Gentle no-tears baby shampoo. Clinically tested.",
        image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 59, title: "Nestum Baby Cereal (300g)", price: 279, discount: 0, rating: 4.7, reviews: 234, stock: 65, unit: "300g",
        category: "Baby Care Products",
        description: "Nutritious multi-grain baby cereal fortified with iron and vitamins.",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 60, title: "Himalaya Baby Lotion (400ml)", price: 169, discount: 5, rating: 4.8, reviews: 312, stock: 90, unit: "400ml",
        category: "Baby Care Products",
        description: "Mild, soothing baby lotion with natural olive oil.",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop&q=80",
    },

    // ── Pet Care Products ────────────────────────────────────
    {
        id: 61, title: "Pedigree Adult Dog Food (3 kg)", price: 899, discount: 10, rating: 4.7, reviews: 312, stock: 60, unit: "3 kg",
        category: "Pet Care Products",
        description: "Complete balanced nutrition for adult dogs.",
        image: "https://images.unsplash.com/photo-1589924691995-400dc9eef119?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 62, title: "Whiskas Cat Food Pouches (12 × 85g)", price: 599, discount: 0, rating: 4.6, reviews: 198, stock: 80, unit: "12-pack",
        category: "Pet Care Products",
        description: "Tender chunks in jelly — wholesome meals your cat will love.",
        image: "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 63, title: "Pet Dog Shampoo — Neem & Aloe (200ml)", price: 249, discount: 5, rating: 4.5, reviews: 112, stock: 70, unit: "200ml",
        category: "Pet Care Products",
        description: "Natural neem and aloe vera dog shampoo — repels ticks & fleas.",
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 64, title: "Bird Seed Mix (1 kg)", price: 149, discount: 0, rating: 4.7, reviews: 78, stock: 50, unit: "kg",
        category: "Pet Care Products",
        description: "Premium seed mix for parrots, budgies and finches.",
        image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&auto=format&fit=crop&q=80",
    },

    // ── Extra Pantry ─────────────────────────────────────────
    {
        id: 65, title: "Extra Virgin Olive Oil (500ml)", price: 699, discount: 0, rating: 4.8, reviews: 162, stock: 70, unit: "500ml",
        category: "Organic & Healthy Products",
        description: "Cold-pressed, single-origin extra virgin olive oil from Mediterranean groves.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
        isOrganic: true,
    },
    {
        id: 66, title: "Basmati Rice (2 kg)", price: 280, discount: 5, rating: 4.7, reviews: 278, stock: 150, unit: "2 kg",
        category: "Flour Varieties",
        description: "Aged, long-grain basmati rice with fragrant aroma and fluffy texture.",
        image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 67, title: "Farm Fresh Eggs (12 pcs)", price: 129, discount: 0, rating: 4.9, reviews: 410, stock: 200, unit: "12 pcs",
        category: "Dairy Products",
        description: "Free-range eggs from happy hens. Rich, golden yolks for all cooking.",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80",
        isSubscribable: true,
    },
    {
        id: 68, title: "Red Bull Energy Drink (250ml × 4)", price: 480, discount: 0, rating: 4.6, reviews: 234, stock: 120, unit: "4-pack",
        category: "Beverages",
        description: "Energising drink with taurine, B-vitamins and caffeine.",
        image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
    {
        id: 69, title: "Fresh Lemons (6 pcs)", price: 49, discount: 0, rating: 4.6, reviews: 109, stock: 130, unit: "6 pcs",
        category: "Fruits & Vegetables",
        description: "Bright, zesty lemons packed with Vitamin C.",
        image: "https://images.unsplash.com/photo-1587496679742-bad502958fbf?w=600&auto=format&fit=crop&q=80",
    },
    {
        id: 70, title: "Watermelon (1 whole ~3kg)", price: 149, discount: 0, rating: 4.8, reviews: 190, stock: 40, unit: "piece",
        category: "Fruits & Vegetables",
        description: "Juicy, sweet seedless watermelon — hydrating and refreshing.",
        image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600&auto=format&fit=crop&q=80",
        isFeatured: true,
    },
];

export const PRODUCTS = [
    ...PRODUCTS_BASE,
    ...EXTRA_PRODUCTS_1,
    ...EXTRA_PRODUCTS_2,
    ...EXTRA_PRODUCTS_3,
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
        validTill: "2026-03-30", code: "FRESH30",
    },
    {
        id: "O2", title: "Dairy Daily Deal",
        desc: "Subscribe to dairy products and save 20% on every order",
        discount: "20% OFF", category: "Dairy Products", color: "sky",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-04-01", code: "DAIRY20",
    },
    {
        id: "O3", title: "Spice Up Your Kitchen",
        desc: "Buy any 3 spice products and get the cheapest one free",
        discount: "3+1 Free", category: "Spices", color: "red",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-03-28", code: "SPICE3",
    },
    {
        id: "O4", title: "Personal Care Mega Sale",
        desc: "Flat 15% off on all personal care products above ₹500",
        discount: "15% OFF", category: "Bathroom & Personal Care", color: "teal",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-04-10", code: "CARE15",
    },
    {
        id: "O5", title: "Snack Attack",
        desc: "Buy 2 snack packs, get 1 free. Limited items!",
        discount: "Buy 2 Get 1", category: "Snacks & Packaged Foods", color: "purple",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=900&auto=format&fit=crop&q=80",
        validTill: "2026-03-25", code: "SNACK3",
    },
];

// ─────────────────────────────────────────────────────────────
//  COMBO DEALS
// ─────────────────────────────────────────────────────────────
export const COMBO_DEALS = [
    {
        id: "C1", title: "Breakfast Starter Pack",
        products: [49, 25, 67],
        originalPrice: 396, comboPrice: 299, savings: 97,
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80",
        badge: "Best Value",
    },
    {
        id: "C2", title: "Masala Kitchen Bundle",
        products: [13, 14, 11],
        originalPrice: 417, comboPrice: 299, savings: 118,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
        badge: "Chef's Pick",
    },
    {
        id: "C3", title: "Health & Wellness Combo",
        products: [53, 54, 55],
        originalPrice: 1147, comboPrice: 849, savings: 298,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
        badge: "Organic Pick",
    },
    {
        id: "C4", title: "Party Snack Box",
        products: [29, 31, 32],
        originalPrice: 319, comboPrice: 229, savings: 90,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80",
        badge: "Party Special",
    },
];

// ─────────────────────────────────────────────────────────────
//  DELIVERY SLOTS
// ─────────────────────────────────────────────────────────────
export const DELIVERY_SLOTS = [
    { id: "S1", label: "Express (2 Hours)", time: "Within 2 hours", price: 49, icon: "⚡" },
    { id: "S2", label: "Morning", time: "7 AM – 12 PM", price: 0, icon: "🌅" },
    { id: "S3", label: "Afternoon", time: "12 PM – 5 PM", price: 0, icon: "☀️" },
    { id: "S4", label: "Evening", time: "5 PM – 9 PM", price: 0, icon: "🌆" },
    { id: "S5", label: "Scheduled", time: "Pick your date", price: 29, icon: "📅" },
];
