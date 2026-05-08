export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  badge?: string;
  inStock: boolean;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
  subcategories?: { name: string; slug: string; image?: string }[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isMegaMenu?: boolean;
}

export interface TrustItem {
  icon: any;
  title: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: Address;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}
