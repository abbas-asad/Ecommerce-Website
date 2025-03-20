import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import siteConfig from "@site.config"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* App Download Banner */}
        <div className="bg-neutral-900 rounded-xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Download Our Mobile App</h3>
            <p className="text-white/80 max-w-md">Shop on the go and get exclusive app-only offers and notifications</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#" className="transform transition-transform hover:">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                alt="App Store"
                width={1280}
                height={420}
                className="h-12 w-auto"
              />
            </Link>
            <Link href="#" className="transform transition-transform hover:">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                width={1024}
                height={420}
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {siteConfig.name} is your one-stop destination for all your shopping needs. We offer a wide range of products at
              competitive prices with excellent customer service.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "FAQs", "Terms & Conditions", "Privacy Policy", "Shipping Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:underline flex items-center gap-1 group">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Customer Service</h3>
            <ul className="space-y-3">
              {["My Account", "Track Order", "Wishlist", "Shopping Cart", "Return Policy", "Help Center"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:underline flex items-center gap-1 group">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates on new arrivals, special offers and other discount information.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-neutral-900 hover:bg-">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-white">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                  alt="Visa"
                  width={2560}
                  height={1000}
                  className="h-8 w-12 object-contain bg-white rounded p-1"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                  alt="Mastercard"
                  width={1280}
                  height={1000}
                  className="h-8 w-12 object-contain bg-white rounded p-1"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
                  alt="PayPal"
                  width={1280}
                  height={1000}
                  className="h-8 w-12 object-contain bg-white rounded p-1"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
                  alt="Apple Pay"
                  width={1667}
                  height={1000}
                  className="h-8 w-12 object-contain bg-white rounded p-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
