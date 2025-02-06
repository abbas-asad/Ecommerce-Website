import Image from "next/image";
import Featuressection from "../../components/layout/featuressection";

export default function BlogPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12 lg:w-3/4">
          {/* First Post */}
          <article>
            <Image
              height={'400'}
              width={'400'}
              src="/blog1.png"
              alt="Laptop on wooden desk"
              className="w-full mb-4"
            />
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Admin
              </span>
              <span>14 Oct 2022</span>
              <span>Wood</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Going all-in with millennial design</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <a href="#" className="text-gray-600 hover:text-gray-900">Read more</a>
          </article>

          {/* Second Post */}
          <article>
            <Image
              height={'400'}
              width={'400'}
              src="/blog2.png"
              alt="Writing in notebook"
              className="w-full mb-4"
            />
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Admin
              </span>
              <span>13 Oct 2022</span>
              <span>Handmade</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Exploring new ways of decorating</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <a href="#" className="text-gray-600 hover:text-gray-900">Read more</a>
          </article>

          {/* Third Post */}
          <article>
            <Image
              height={'400'}
              width={'400'}
              src="/blog3.png"
              alt="Coffee and notebook"
              className="w-full mb-4"
            />
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Admin
              </span>
              <span>14 Oct 2022</span>
              <span>Wood</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Handmade pieces that took time to make</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <a href="#" className="text-gray-600 hover:text-gray-900">Read more</a>
          </article>

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-8">
            <a href="#" className="px-3 py-1 bg-gray-100 text-gray-800">1</a>
            <a href="#" className="px-3 py-1 hover:bg-gray-100 text-gray-800">2</a>
            <a href="#" className="px-3 py-1 hover:bg-gray-100 text-gray-800">3</a>
            <a href="#" className="px-3 py-1 hover:bg-gray-100 text-gray-800">Next</a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="w-full border rounded-md py-2 px-4 pr-10"
            />
            <button className="absolute right-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <a href="#" className="text-gray-600 hover:text-gray-900">Crafts</a>
                <span className="text-gray-400">2</span>
              </li>
              <li className="flex justify-between">
                <a href="#" className="text-gray-600 hover:text-gray-900">Design</a>
                <span className="text-gray-400">8</span>
              </li>
              <li className="flex justify-between">
                <a href="#" className="text-gray-600 hover:text-gray-900">Handmade</a>
                <span className="text-gray-400">7</span>
              </li>
              <li className="flex justify-between">
                <a href="#" className="text-gray-600 hover:text-gray-900">Interior</a>
                <span className="text-gray-400">1</span>
              </li>
              <li className="flex justify-between">
                <a href="#" className="text-gray-600 hover:text-gray-900">Wood</a>
                <span className="text-gray-400">8</span>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              <a href="#" className="flex gap-4 group">
                <Image
                  height={'400'}
                  width={'400'}
                  src="/blog2.png"
                  alt="Going all-in with millennial design"
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h4 className="font-medium group-hover:text-gray-600">Going all-in with millennial design</h4>
                  <p className="text-sm text-gray-500">03 Aug 2023</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 group">
                <Image
                  height={'400'}
                  width={'400'}
                  src="/blog2.png"
                  alt="Exploring new ways of decorating"
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h4 className="font-medium group-hover:text-gray-600">Exploring new ways of decorating</h4>
                  <p className="text-sm text-gray-500">03 Aug 2023</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 group">
                <Image
                  height={'400'}
                  width={'400'}
                  src="/blog2.png"
                  alt="Modern home in Milan"
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h4 className="font-medium group-hover:text-gray-600">Modern home in Milan</h4>
                  <p className="text-sm text-gray-500">23 Aug 2023</p>
                </div>
              </a>
              <a href="#" className="flex gap-4 group">
                <Image
                  height={'400'}
                  width={'400'}
                  src="/blog2.png"
                  alt="Colorful office redesign"
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h4 className="font-medium group-hover:text-gray-600">Colorful office redesign</h4>
                  <p className="text-sm text-gray-500">17 Aug 2023</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Featuressection />
    </>

  )
}



// I will fix it for mobile
