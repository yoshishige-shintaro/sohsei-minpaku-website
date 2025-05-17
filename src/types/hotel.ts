// ホテル情報の型定義
export type Hotel = {
  id: 'kasai' | 'sushi-art';
  name: string;
  subtitle: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  price: {
    weekday: number;
    weekend: number;
  };
  maxGuests: number;
  size: number;
  parking: boolean;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  amenities: string[];
  images: {
    src: string;
    alt: string;
  }[];
  location: {
    address: string;
    mapUrl: string;
    nearbySpots: {
      name: string;
      distance: string;
      transportMethod: string;
    }[];
  };
  rules: string[];
  reviews: {
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
  airbnbUrl: string;
};

// レビューの型定義
export type Review = {
  author: string;
  date: string;
  rating: number;
  text: string;
  hotel: 'kasai' | 'sushi-art';
};