import Link from "next/link";
import siteConfig from "@site.config";

const Footer = () => {
  const shopLinks = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const helpLinks = [
    { name: "Payment Options", href: "#" },
    { name: "Returns & Refunds", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "FAQs", href: "#" },
  ];

  return (
    <footer className="bg-gray-50 text-gray-800 border-t">
      <div className="container mx-auto px-medium lg:px-large py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Address Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-[#9F9F9F]">Address</h4>
          <address className="not-italic text-sm text-[#9F9F9F]">
            400 University Drive Suite 200 Coral <br />
            Gables, <br /> FL 33134 USA
          </address>
          <p className="text-sm text-[#9F9F9F]">{siteConfig.contact.email}</p>
          <p className="text-sm text-[#9F9F9F]">{siteConfig.contact.phone}</p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-[#9F9F9F]">Shop</h4>
          <ul className="space-y-2 text-sm font-medium">
            {shopLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="hover:underline text-gray-700">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-[#9F9F9F]">Help</h4>
          <ul className="space-y-2 text-sm font-medium">
            {helpLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="hover:underline text-gray-700">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-[#9F9F9F]">Newsletter</h4>
          <p className="text-sm text-[#9F9F9F] mb-4">
            Subscribe to get the latest updates and offers.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 py-2 px-4 text-sm focus:outline-none focus:border-gray-500 rounded"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>


      {/* Footer Bottom */}
      <hr className="border-gray-200" />
      <div className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
