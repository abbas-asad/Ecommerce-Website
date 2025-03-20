import React from 'react'
import HeroSlider from './components/hero-slider'
import ProductCategories from './components/product-categories'
import WhyChooseUs from './components/layout/why-choose-us'
import OurPartners from './components/our-partners'
// import Navbar from './components/layout/navbar'
import SpecificProductCards from './components/specific-product-cards'

// const categories = [
//   { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: 120 },
//   { id: 2, name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: 350 },
//   { id: 3, name: "Home Decor", image: "/placeholder.svg?height=200&width=200", count: 210 },
//   { id: 4, name: "Beauty", image: "/placeholder.svg?height=200&width=200", count: 180 },
//   { id: 5, name: "Sports", image: "/placeholder.svg?height=200&width=200", count: 95 },
//   { id: 6, name: "Books", image: "/placeholder.svg?height=200&width=200", count: 275 },
// ]


const Home = () => {
  return (
    <main className="min-h-screen">
      {/* <Navbar categories={categories} /> */}
      <HeroSlider />
      {/* <ProductCategories /> */}

      <div className="min-h-screen flex flex-col">
  <main className="flex-grow">
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SpecificProductCards title="Featured Products" queryCondition="isFeatured == true" subtitle="Check out our top featured items!" />
    </div>
  </main>
</div>

<div className="min-h-screen flex flex-col">
  <main className="flex-grow">
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SpecificProductCards title="Trending Now" queryCondition="isTrending == true" subtitle="Explore what's trending right now!" />
    </div>
  </main>
</div>

<div className="min-h-screen flex flex-col">
  <main className="flex-grow">
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SpecificProductCards title="Recommended for You" queryCondition="isRecommended == true" subtitle="Handpicked recommendations just for you!" />
    </div>
  </main>
</div>

      {/* <div className="min-h-screen flex flex-col">
             <main className="flex-grow">
               <div className="container mx-auto px-4 py-8 space-y-12">
               <SpecificProductCards title="New Arrivals" queryCondition="isFeatured == true" subtitle="featured subtitles" />
               </div>
             </main>
           </div>    
       <div className="min-h-screen flex flex-col">
             <main className="flex-grow">
               <div className="container mx-auto px-4 py-8 space-y-12">
               <SpecificProductCards title="Recommended for you" queryCondition="isFeatured == true" subtitle="featured subtitles" />
               </div>
             </main>
           </div>     */}

      <OurPartners />
      <WhyChooseUs />
    </main>
  )
}

export default Home
