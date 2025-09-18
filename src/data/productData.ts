// Comprehensive product data for all categories
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export const productData = {
  clothing: [
    // Men's Corporate Wear
    {
      id: "1",
      name: "Premium Business Suit - Charcoal Grey",
      price: 45999.99,
      originalPrice: 52999.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 189,
      category: "Men's Corporate"
    },
    {
      id: "2", 
      name: "Executive Dress Shirt - Egyptian Cotton",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 267,
      category: "Men's Shirts"
    },
    {
      id: "3",
      name: "Corporate Polo Shirt - Navy Blue",
      price: 5999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Men's Casual"
    },
    {
      id: "4",
      name: "Premium Cotton Singlet - 3 Pack",
      price: 3999.99,
      originalPrice: 5999.99,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 298,
      category: "Men's Undergarments"
    },
    {
      id: "5",
      name: "Elegant Cocktail Dress - Black",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 198,
      category: "Women's Formal"
    },
    {
      id: "6",
      name: "Professional Blazer - Navy Blue",
      price: 25999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Women's Corporate"
    },
    {
      id: "7",
      name: "Casual Denim Jeans - Slim Fit",
      price: 12999.99,
      originalPrice: 16999.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 356,
      category: "Casual Wear"
    },
    {
      id: "8",
      name: "Designer T-Shirt - Premium Cotton",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 287,
      category: "Casual Wear"
    },
    // Additional Clothing Items
    {
      id: "9",
      name: "Luxury Silk Blouse - Ivory",
      price: 18999.99,
      originalPrice: 24999.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      category: "Women's Formal"
    },
    {
      id: "10",
      name: "Tailored Chino Pants - Khaki",
      price: 9999.99,
      originalPrice: 13999.99,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      category: "Men's Casual"
    }
  ],

  accessories: [
    // Bags
    {
      id: "11",
      name: "Luxury Leather Handbag - Italian Crafted", 
      price: 35999.99,
      originalPrice: 45999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Women's Bags"
    },
    {
      id: "12",
      name: "Executive Travel Briefcase",
      price: 28999.99,
      originalPrice: 35999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 156,
      category: "Men's Bags"
    },
    {
      id: "13",
      name: "Rolling Travel Suitcase - Hard Shell",
      price: 45999.99,
      originalPrice: 55999.99,
      image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 234,
      category: "Travel Bags"
    },
    {
      id: "14",
      name: "Designer Backpack - Premium Leather",
      price: 22999.99,
      originalPrice: 29999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 178,
      category: "Casual Bags"
    },
    // Watches & Jewelry
    {
      id: "15",
      name: "Swiss Movement Wrist Watch - Gold",
      price: 125999.99,
      originalPrice: 149999.99,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 267,
      category: "Luxury Watches"
    },
    {
      id: "16",
      name: "Diamond Stud Earrings - 14K Gold",
      price: 89999.99,
      originalPrice: 119999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 134,
      category: "Fine Jewelry"
    },
    {
      id: "17",
      name: "Pearl Necklace Set - Cultured",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 198,
      category: "Fine Jewelry"
    },
    {
      id: "18",
      name: "African Hand Beads - Traditional Design",
      price: 3999.99,
      originalPrice: 5999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 89,
      category: "Traditional Jewelry"
    },
    {
      id: "19",
      name: "Waist Beads Set - Colorful African Style",
      price: 2999.99,
      originalPrice: 4999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Traditional Jewelry"
    },
    // Belts, Ties & Eyewear
    {
      id: "20",
      name: "Genuine Leather Belt - Italian Crafted",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Men's Accessories"
    },
    {
      id: "21",
      name: "Silk Tie Collection - Executive 3 Pack",
      price: 7999.99,
      originalPrice: 11999.99,
      image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 321,
      category: "Men's Formal"
    },
    {
      id: "22",
      name: "Designer Sunglasses - UV Protection",
      price: 15999.99,
      originalPrice: 19999.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 189,
      category: "Eyewear"
    },
    {
      id: "23",
      name: "Prescription Eyeglasses - Designer Frame",
      price: 25999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 156,
      category: "Eyewear"
    },
    // Footwear
    {
      id: "24",
      name: "Italian Leather Dress Shoes",
      price: 18999.99,
      originalPrice: 25999.99,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 278,
      category: "Men's Shoes"
    },
    {
      id: "25",
      name: "Designer High Heels - Patent Leather",
      price: 12999.99,
      originalPrice: 17999.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 156,
      category: "Women's Shoes"
    },
    {
      id: "26",
      name: "Premium Leather Slippers - Handcrafted",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 198,
      category: "Casual Footwear"
    },
    {
      id: "27",
      name: "Palm Sandals - Traditional Nigerian",
      price: 5999.99,
      originalPrice: 8999.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 134,
      category: "Traditional Footwear"
    }
  ],

  groceries: [
    // Wines & Beverages
    {
      id: "28",
      name: "Premium Red Wine - French Bordeaux",
      price: 15999.99,
      originalPrice: 19999.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 145,
      category: "Fine Wines"
    },
    {
      id: "29",
      name: "Champagne - Dom Pérignon Vintage",
      price: 89999.99,
      originalPrice: 109999.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      category: "Premium Wines"
    },
    {
      id: "30",
      name: "Artisanal Coffee Beans - Ethiopian Premium",
      price: 3999.99,
      originalPrice: 4999.99,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 287,
      category: "Premium Beverages"
    },
    {
      id: "31",
      name: "Imported Sparkling Water - San Pellegrino",
      price: 2499.99,
      originalPrice: 2999.99,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 198,
      category: "Luxury Beverages"
    },
    // Supplements & Health
    {
      id: "32",
      name: "Premium Multivitamin Complex",
      price: 8999.99,
      originalPrice: 11999.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 234,
      category: "Health Supplements"
    },
    {
      id: "33",
      name: "Omega-3 Fish Oil - High Potency",
      price: 6999.99,
      originalPrice: 8999.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Health Supplements"
    },
    {
      id: "34",
      name: "Protein Powder - Whey Isolate",
      price: 12999.99,
      originalPrice: 15999.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 345,
      category: "Fitness Supplements"
    },
    // Fresh Foods & Drinks
    {
      id: "35",
      name: "Premium Green Tea - Jasmine Blend",
      price: 3499.99,
      originalPrice: 4999.99,
      image: "https://images.unsplash.com/photo-1594631661960-36cdb9b0e686?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Premium Beverages"
    },
    {
      id: "36",
      name: "Organic Honey - Wild Forest",
      price: 4999.99,
      originalPrice: 6999.99,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 289,
      category: "Organic Foods"
    }
  ],

  household: [
    // Towels & Bathroom
    {
      id: "37",
      name: "Egyptian Cotton Towel Set - 6 Pieces",
      price: 15999.99,
      originalPrice: 19999.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 167,
      category: "Bath Towels"
    },
    {
      id: "38",
      name: "Luxury Spa Towel Collection",
      price: 25999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 123,
      category: "Premium Towels"
    },
    // Makeup & Beauty
    {
      id: "39",
      name: "Professional Makeup Kit - Complete Set",
      price: 35999.99,
      originalPrice: 45999.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 289,
      category: "Makeup Kits"
    },
    {
      id: "40",
      name: "Designer Lipstick Collection - 12 Shades",
      price: 18999.99,
      originalPrice: 24999.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 198,
      category: "Beauty Products"
    },
    // Perfumes
    {
      id: "41",
      name: "Designer Perfume - Chanel No. 5",
      price: 45999.99,
      originalPrice: 55999.99,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 456,
      category: "Designer Perfumes"
    },
    {
      id: "42",
      name: "Men's Cologne - Dior Sauvage",
      price: 38999.99,
      originalPrice: 45999.99,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 334,
      category: "Designer Perfumes"
    },
    // Kitchen & Cups
    {
      id: "43",
      name: "Royal Bone China Tea Set - 12 Pieces",
      price: 89999.99,
      originalPrice: 119999.99,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Luxury Tableware"
    },
    {
      id: "44",
      name: "Crystal Wine Glasses - Hand Blown Set of 6",
      price: 25999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      category: "Premium Glassware"
    },
    {
      id: "45",
      name: "Professional Kitchen Knife Set - German Steel",
      price: 35999.99,
      originalPrice: 45999.99,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 234,
      category: "Kitchen Accessories"
    },
    {
      id: "46",
      name: "Marble Cutting Board - Italian Carrara",
      price: 15999.99,
      originalPrice: 19999.99,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 178,
      category: "Kitchen Accessories"
    }
  ],

  specials: [
    {
      id: "47",
      name: "Executive Wardrobe Bundle - Complete Set",
      price: 189999.99,
      originalPrice: 249999.99,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      category: "Premium Bundle"
    },
    {
      id: "48",
      name: "Luxury Lifestyle Gift Set",
      price: 299999.99,
      originalPrice: 399999.99,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 45,
      category: "VIP Collection"
    },
    {
      id: "49",
      name: "Beauty & Wellness Complete Package",
      price: 125999.99,
      originalPrice: 159999.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 89,
      category: "Gift Sets"
    },
    {
      id: "50",
      name: "Home Entertainment & Kitchen Bundle",
      price: 159999.99,
      originalPrice: 199999.99,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 134,
      category: "Home Collections"
    }
  ]
};