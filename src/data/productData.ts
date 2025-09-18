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
      id: "c1",
      name: "Premium Business Suit - Charcoal Grey",
      price: 45999.99,
      originalPrice: 52999.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 189,
      category: "Men's Corporate"
    },
    {
      id: "c2", 
      name: "Executive Dress Shirt - Egyptian Cotton",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 267,
      category: "Men's Shirts"
    },
    {
      id: "c3",
      name: "Corporate Polo Shirt - Navy Blue",
      price: 5999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Men's Casual"
    },
    {
      id: "c4",
      name: "Premium Cotton Singlet - 3 Pack",
      price: 3999.99,
      originalPrice: 5999.99,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 298,
      category: "Men's Undergarments"
    },
    {
      id: "c5",
      name: "Elegant Cocktail Dress - Black",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 198,
      category: "Women's Formal"
    },
    {
      id: "c6",
      name: "Professional Blazer - Navy Blue",
      price: 25999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Women's Corporate"
    },
    {
      id: "c7",
      name: "Casual Denim Jeans - Slim Fit",
      price: 12999.99,
      originalPrice: 16999.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 356,
      category: "Casual Wear"
    },
    {
      id: "c8",
      name: "Designer T-Shirt - Premium Cotton",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 287,
      category: "Casual Wear"
    },
    {
      id: "c9",
      name: "Luxury Silk Blouse - Ivory",
      price: 18999.99,
      originalPrice: 24999.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      category: "Women's Corporate"
    },
    {
      id: "c10",
      name: "Designer Polo Shirt - White",
      price: 7999.99,
      originalPrice: 11999.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 203,
      category: "Men's Casual"
    },
    {
      id: "c11",
      name: "Premium Chinos - Khaki",
      price: 9999.99,
      originalPrice: 14999.99,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 189,
      category: "Men's Casual"
    },
    {
      id: "c12",
      name: "Women's Office Shirt - White",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 167,
      category: "Women's Corporate"
    },
    {
      id: "c13",
      name: "Cotton Singlet - Black 3-Pack",
      price: 4999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      category: "Men's Undergarments"
    },
    {
      id: "c14",
      name: "Casual Summer Dress - Floral",
      price: 11999.99,
      originalPrice: 17999.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 298,
      category: "Women's Casual"
    }
  ],

  accessories: [
    // Bags
    {
      id: "a1",
      name: "Women's Leather Handbag - Premium",
      price: 35999.99,
      originalPrice: 45999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 245,
      category: "Women's Bags"
    },
    {
      id: "a2",
      name: "Men's Business Briefcase - Black Leather",
      price: 42999.99,
      originalPrice: 56999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 167,
      category: "Men's Bags"
    },
    {
      id: "a3",
      name: "Travel Suitcase - Hard Shell 24\"",
      price: 28999.99,
      originalPrice: 39999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 189,
      category: "Traveling Bags"
    },
    {
      id: "a4",
      name: "Luxury Travel Duffel Bag",
      price: 19999.99,
      originalPrice: 27999.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Traveling Bags"
    },
    // Jewelry & Watches
    {
      id: "a5",
      name: "Diamond Tennis Bracelet",
      price: 89999.99,
      originalPrice: 125999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 78,
      category: "Jewelry"
    },
    {
      id: "a6",
      name: "Gold-Plated Wrist Watch - Unisex",
      price: 25999.99,
      originalPrice: 35999.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Wrist Watches"
    },
    {
      id: "a7",
      name: "Traditional Hand Beads - Coral",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 167,
      category: "Hand & Waist Beads"
    },
    {
      id: "a8",
      name: "African Waist Beads - Multicolor",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 198,
      category: "Hand & Waist Beads"
    },
    // Belts & Footwear
    {
      id: "a9",
      name: "Genuine Leather Belt - Brown",
      price: 7999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 289,
      category: "Belts"
    },
    {
      id: "a10",
      name: "Designer Slippers - Comfort Sole",
      price: 5999.99,
      originalPrice: 8999.99,
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 345,
      category: "Slippers"
    },
    {
      id: "a11",
      name: "Palm Sandals - Handwoven",
      price: 4999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      category: "Palm Sandals"
    },
    {
      id: "a12",
      name: "Silk Tie - Executive Pattern",
      price: 3999.99,
      originalPrice: 6999.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      category: "Ties"
    },
    // Eyewear
    {
      id: "a13",
      name: "Designer Eyeglasses - Titanium Frame",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 123,
      category: "Designer Eyeglasses"
    },
    {
      id: "a14",
      name: "Luxury Sunglasses - Polarized",
      price: 12999.99,
      originalPrice: 18999.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 267,
      category: "Sunshades"
    },
    // Perfumes & Cosmetics
    {
      id: "a15",
      name: "Designer Perfume - Luxury Collection",
      price: 18999.99,
      originalPrice: 26999.99,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Designer Perfumes"
    },
    {
      id: "a16",
      name: "Professional Makeup Kit - Complete",
      price: 22999.99,
      originalPrice: 32999.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 145,
      category: "Makeup Kits"
    }
  ],

  groceries: [
    // Beverages & Wines
    {
      id: "g1",
      name: "Premium Red Wine - Cabernet Sauvignon",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Wines"
    },
    {
      id: "g2",
      name: "Champagne - French Collection",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 167,
      category: "Wines"
    },
    {
      id: "g3",
      name: "Craft Beer - Assorted Pack",
      price: 3999.99,
      originalPrice: 5999.99,
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 298,
      category: "Drinks"
    },
    {
      id: "g4",
      name: "Fresh Orange Juice - 1L",
      price: 1299.99,
      originalPrice: 1699.99,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 456,
      category: "Drinks"
    },
    {
      id: "g5",
      name: "Sparkling Water - Premium",
      price: 899.99,
      originalPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      category: "Drinks"
    },
    // Health Supplements
    {
      id: "g6",
      name: "Multivitamin Complex - 60 Capsules",
      price: 4999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Supplements"
    },
    {
      id: "g7",
      name: "Protein Powder - Chocolate",
      price: 12999.99,
      originalPrice: 17999.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 167,
      category: "Supplements"
    },
    {
      id: "g8",
      name: "Omega-3 Fish Oil - 90 Softgels",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      category: "Supplements"
    },
    // Fresh Produce
    {
      id: "g9",
      name: "Organic Fruits Basket",
      price: 3999.99,
      originalPrice: 5999.99,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 345,
      category: "Fresh Fruits"
    },
    {
      id: "g10",
      name: "Fresh Vegetables Bundle",
      price: 2999.99,
      originalPrice: 4299.99,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 267,
      category: "Fresh Vegetables"
    }
  ],

  household: [
    // Kitchen & Dining
    {
      id: "h1",
      name: "Designer Coffee Mug Set - Ceramic",
      price: 8999.99,
      originalPrice: 12999.99,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Expensive Cups"
    },
    {
      id: "h2",
      name: "Premium Kitchen Knife Set",
      price: 15999.99,
      originalPrice: 22999.99,
      image: "https://images.unsplash.com/photo-1556909045-f58de08b02f0?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 145,
      category: "Kitchen Accessories"
    },
    {
      id: "h3",
      name: "Stainless Steel Cookware Set",
      price: 25999.99,
      originalPrice: 35999.99,
      image: "https://images.unsplash.com/photo-1556909045-f58de08b02f0?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 234,
      category: "Kitchen Accessories"
    },
    {
      id: "h4",
      name: "Luxury Tea Cup Set - Porcelain",
      price: 12999.99,
      originalPrice: 18999.99,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 167,
      category: "Expensive Cups"
    },
    {
      id: "h5",
      name: "Electric Kitchen Scale",
      price: 4999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1556909045-f58de08b02f0?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 298,
      category: "Kitchen Accessories"
    },
    // Bathroom & Linens
    {
      id: "h6",
      name: "Egyptian Cotton Towel Set",
      price: 9999.99,
      originalPrice: 14999.99,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 234,
      category: "Towels"
    },
    {
      id: "h7",
      name: "Luxury Bath Towels - White",
      price: 7999.99,
      originalPrice: 11999.99,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: "Towels"
    },
    {
      id: "h8",
      name: "Premium Hand Towels - Set of 6",
      price: 5999.99,
      originalPrice: 8999.99,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 167,
      category: "Towels"
    },
    // Home Decor
    {
      id: "h9",
      name: "Decorative Ceramic Vase",
      price: 6999.99,
      originalPrice: 9999.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 145,
      category: "Home Decor"
    },
    {
      id: "h10",
      name: "Scented Candles - Luxury Set",
      price: 4999.99,
      originalPrice: 7999.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Home Decor"
    }
  ],

  specials: [
    // Gift Items
    {
      id: "s1",
      name: "Luxury Gift Hamper - Premium",
      price: 35999.99,
      originalPrice: 49999.99,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 78,
      category: "Gifts"
    },
    {
      id: "s2",
      name: "Romantic Gift Set - Valentine's",
      price: 18999.99,
      originalPrice: 27999.99,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      category: "Gifts"
    },
    {
      id: "s3",
      name: "Corporate Gift Package",
      price: 25999.99,
      originalPrice: 35999.99,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 89,
      category: "Gifts"
    },
    {
      id: "s4",
      name: "Birthday Surprise Box",
      price: 12999.99,
      originalPrice: 18999.99,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "Gifts"
    },
    {
      id: "s5",
      name: "Weekend Flash Deal - Mixed Bundle",
      price: 9999.99,
      originalPrice: 19999.99,
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 345,
      category: "Weekly Deals"
    },
    {
      id: "s6",
      name: "Clearance Sale - Fashion Items",
      price: 7999.99,
      originalPrice: 15999.99,
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 267,
      category: "Weekly Deals"
    }
  ]
};