export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  tag?: string;
};

export type Reel = {
  id: string;
  title: string;
  price: number;
  mrp: number;
  video: string;
  poster: string;
};

// Swap `image` / `video` / `poster` paths with real files in /public once you have them.
export const products: Product[] = [
  {
    id: "p1",
    slug: "tomato-basil-soup",
    name: "Tomato Basil Soup",
    price: 240,
    mrp: 280,
    image: "/products/tomato-basil.jpg",
    tag: "Bestseller",
  },
  {
    id: "p2",
    slug: "sweet-corn-soup",
    name: "Sweet Corn Soup",
    price: 220,
    mrp: 260,
    image: "/products/sweet-corn.jpg",
  },
  {
    id: "p3",
    slug: "hot-sour-soup",
    name: "Hot & Sour Soup",
    price: 250,
    mrp: 290,
    image: "/products/hot-sour.jpg",
    tag: "Spicy",
  },
  {
    id: "p4",
    slug: "mushroom-soup",
    name: "Cream of Mushroom",
    price: 270,
    mrp: 300,
    image: "/products/mushroom.jpg",
  },
];

// "Reels" style shelf — vertical 9:16 clips, same idea as your "Spice Up Show" rail.
export const reels: Reel[] = [
  {
    id: "r1",
    title: "Tomato Basil Soup",
    price: 240,
    mrp: 280,
    video: "/reels/tomato-basil.mp4",
    poster: "/reels/tomato-basil.jpg",
  },
  {
    id: "r2",
    title: "Sweet Corn Soup",
    price: 220,
    mrp: 260,
    video: "/reels/sweet-corn.mp4",
    poster: "/reels/sweet-corn.jpg",
  },
  {
    id: "r3",
    title: "Hot & Sour Soup",
    price: 250,
    mrp: 290,
    video: "/reels/hot-sour.mp4",
    poster: "/reels/hot-sour.jpg",
  },
  {
    id: "r4",
    title: "Cream of Mushroom",
    price: 270,
    mrp: 300,
    video: "/reels/mushroom.mp4",
    poster: "/reels/mushroom.jpg",
  },
];
