import Hero from "@/components/home/Hero";
import HomeCards from "@/components/home/HomeCards";
import Reviews from "@/components/home/Reviews";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeCards />
      <Reviews />
      <Footer />
    </>
  );
}
