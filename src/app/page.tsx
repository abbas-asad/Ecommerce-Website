import Hero from "./components/hero";
import Productcards from "./components/productcards";
import Newarrivalssection from "./components/newarrivalssection";
import Blogsection from "./components/blogsection";
import Instagramsection from "./components/instagramsection";
import CategorySection from "./components/categories";

export default function Home() {
  return (
    <main className="bg-[#FFF9F3]">
      <Hero />
      <CategorySection />
      <Productcards headingName="Top Picks For You" para="Discover the perfect blend of style and comfort with our exceptional range of premium furniture." limit={4}  showPagination={false} />
      <Newarrivalssection />
      <Blogsection />
      <Instagramsection />
    </main>
  )
}

