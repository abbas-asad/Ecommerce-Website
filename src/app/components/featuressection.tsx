const features = [
  {
    title: "Fast & Free Shipping",
    description: "Enjoy free shipping on all orders over $75 with quick delivery to your doorstep.",
  },
  {
    title: "Hassle-Free Returns",
    description: "Easily return or exchange items within 30 days, no questions asked.",
  },
  {
    title: "Secure Payments",
    description: "Your payments are 100% secure with end-to-end encryption and trusted gateways.",
  },
];


const Featuressection = () => {
  return (
    <div className="bg-[#FAF4F4]">
      <div className="container mx-auto px-medium lg:px-large py-10 lg:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="py-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-[#9F9F9F] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featuressection;
