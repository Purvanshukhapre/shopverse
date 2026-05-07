export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  category: string;
  badge?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
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
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}
