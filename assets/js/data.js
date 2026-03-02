// Global Product Data
const productDataTemplate = [
    // Electronics -> Mobile
    { name: "Flagship Smartphone X", cat: "Electronics", sub: "Mobile", price: 349999, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Budget Friendly Android", cat: "Electronics", sub: "Mobile", price: 45000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Foldable 5G Phone", cat: "Electronics", sub: "Mobile", price: 285000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Gaming Phone Pro", cat: "Electronics", sub: "Mobile", price: 180000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },

    // Electronics -> Laptops
    { name: "Ultra-Thin Book 13", cat: "Electronics", sub: "Laptops", price: 145000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Gaming Beast Laptop", cat: "Electronics", sub: "Laptops", price: 320000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Creator Pro Studio", cat: "Electronics", sub: "Laptops", price: 280000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Budget Student Laptop", cat: "Electronics", sub: "Laptops", price: 65000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },

    // Electronics -> General
    { name: "Premium Smart Watch", cat: "Electronics", sub: null, price: 45000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Noise Cancelling Headphones", cat: "Electronics", sub: null, price: 65000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Wireless Earbuds pro", cat: "Electronics", sub: null, price: 25000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Gaming Mouse RGB", cat: "Electronics", sub: null, price: 12000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Console Controller", cat: "Electronics", sub: null, price: 18000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },

    // Fashion -> Men's Clothing
    { name: "Premium Oxford Shirt", cat: "Fashion", sub: "Men's Clothing", price: 4500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Tailored Wool Suit", cat: "Fashion", sub: "Men's Clothing", price: 35000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Casual Men's Jacket", cat: "Fashion", sub: "Men's Clothing", price: 12500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Slim Fit Men's Trousers", cat: "Fashion", sub: "Men's Clothing", price: 3800, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Fashion -> Women's Clothing
    { name: "Elegant Evening Dress", cat: "Fashion", sub: "Women's Clothing", price: 15000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Floral Summer Blouse", cat: "Fashion", sub: "Women's Clothing", price: 3500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Designer Winter Coat", cat: "Fashion", sub: "Women's Clothing", price: 22000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "High-Waist Skirt", cat: "Fashion", sub: "Women's Clothing", price: 4200, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Fashion -> General
    { name: "Minimalist Cotton Tee", cat: "Fashion", sub: null, price: 1500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Merino Wool Sweater", cat: "Fashion", sub: null, price: 8500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Leather Crossbody Bag", cat: "Fashion", sub: null, price: 12000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Urban Sneakers", cat: "Fashion", sub: null, price: 18000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Home Decor -> Lighting
    { name: "Industrial Pendant Light", cat: "Home Decor", sub: "Lighting", price: 8500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Modern Floor Lamp", cat: "Home Decor", sub: "Lighting", price: 14000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Vintage Desk Lamp", cat: "Home Decor", sub: "Lighting", price: 4200, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Smart LED Strips", cat: "Home Decor", sub: "Lighting", price: 6500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Home Decor -> Furniture
    { name: "Ergonomic Office Chair", cat: "Home Decor", sub: "Furniture", price: 35000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Velvet Lounge Sofa", cat: "Home Decor", sub: "Furniture", price: 120000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Minimalist Coffee Table", cat: "Home Decor", sub: "Furniture", price: 18000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Oak Wood Nightstand", cat: "Home Decor", sub: "Furniture", price: 14500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Home Decor -> General
    { name: "Artisan Ceramic Vase", cat: "Home Decor", sub: null, price: 4500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Macrame Wall Hanging", cat: "Home Decor", sub: null, price: 3200, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Abstract Canvas Print", cat: "Home Decor", sub: null, price: 15000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "House Plant Terracotta", cat: "Home Decor", sub: null, price: 2500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Beauty & Personal Care -> Skincare
    { name: "Hyaluronic Acid Serum", cat: "Beauty & Personal Care", sub: "Skincare", price: 3800, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Vitamin C Brightening Cream", cat: "Beauty & Personal Care", sub: "Skincare", price: 4500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Organic Clay Mask", cat: "Beauty & Personal Care", sub: "Skincare", price: 2200, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Night Repair Oil", cat: "Beauty & Personal Care", sub: "Skincare", price: 5600, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Beauty & Personal Care -> Fragrances
    { name: "Midnight Rose EDP", cat: "Beauty & Personal Care", sub: "Fragrances", price: 18500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Ocean Breeze Cologne", cat: "Beauty & Personal Care", sub: "Fragrances", price: 14000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Oud Wood Intense", cat: "Beauty & Personal Care", sub: "Fragrances", price: 28000, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },
    { name: "Vanilla Floral Mist", cat: "Beauty & Personal Care", sub: "Fragrances", price: 4500, img1: "assets/images/dummy_2.png", img2: "assets/images/dummy_2.png" },

    // Sports & Outdoors -> Fitness
    { name: "Adjustable Dumbbell Set", cat: "Sports & Outdoors", sub: "Fitness", price: 35000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Premium Yoga Mat", cat: "Sports & Outdoors", sub: "Fitness", price: 4200, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Resistance Bands Pro", cat: "Sports & Outdoors", sub: "Fitness", price: 2500, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Protein Shaker Bottle", cat: "Sports & Outdoors", sub: "Fitness", price: 1200, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },

    // Sports & Outdoors -> Outdoor Gear
    { name: "2-Person Camping Tent", cat: "Sports & Outdoors", sub: "Outdoor Gear", price: 18000, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Thermal Sleeping Bag", cat: "Sports & Outdoors", sub: "Outdoor Gear", price: 8500, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Tactical Hiking Backpack", cat: "Sports & Outdoors", sub: "Outdoor Gear", price: 12500, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" },
    { name: "Stainless Steel Thermos", cat: "Sports & Outdoors", sub: "Outdoor Gear", price: 3500, img1: "assets/images/dummy_1.png", img2: "assets/images/dummy_1.png" }
];

// Image mapping for robust local AI-generated images tailored perfectly to product names
const subImages = {
    "Mobile": "assets/images/cat_mobile_1772055929107.png",
    "Laptops": "assets/images/cat_laptops_1772054943673.png",
    "Men's Clothing": "assets/images/cat_mens_clothing_1772054998597.png",
    "Women's Clothing": "assets/images/cat_womens_clothing_1772055115959.png",
    "Lighting": "assets/images/cat_lighting_1772055179549.png",
    "Furniture": "assets/images/cat_furniture_1772055304107.png",
    "Skincare": "assets/images/cat_skincare_1772055356715.png",
    "Fragrances": "assets/images/cat_fragrances_1772055508799.png",
    "Fitness": "assets/images/cat_fitness_1772055589543.png",
    "Outdoor Gear": "assets/images/cat_outdoor_1772055866811.png"
};

const catImages = {
    "Electronics": "assets/images/dummy_1.png",
    "Fashion": "assets/images/dummy_2.png",
    "Home Decor": "assets/images/dummy_2.png",
    "Beauty & Personal Care": "assets/images/cat_skincare_1772055356715.png",
    "Sports & Outdoors": "assets/images/cat_outdoor_1772055866811.png"
};

// Generate consistent product array with IDs
const globalProducts = productDataTemplate.map((p, index) => {
    // Select the perfectly matching local AI image for this product's name/sub-type
    const matchingImage = p.sub ? subImages[p.sub] : catImages[p.cat];

    return {
        id: index + 1,
        name: p.name,
        category: p.cat,
        subcategory: p.sub,
        price: p.price,
        originalPrice: p.price + Math.floor(p.price * 0.2), // 20% fake markup
        reviews: Math.floor(Math.random() * (450 - 10 + 1)) + 10,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        isSale: Math.random() > 0.7,
        isNew: Math.random() > 0.8,
        imgPrimary: matchingImage,
        imgSecondary: matchingImage
    };
});
