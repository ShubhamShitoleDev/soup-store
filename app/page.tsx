import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ReelsShow from "@/components/ReelsShow";
import Reviews from "@/components/Reviews";
import FeaturedIn from "@/components/FeaturedIn";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <ReelsShow />
        <Reviews />
        <FeaturedIn />
      </main>
      <Footer />
    </>
  );
}
