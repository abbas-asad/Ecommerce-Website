import React from 'react'

const WhyChooseUs = () => {

    return (
        //   Why Choose Us 
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We&apos;re committed to providing the best shopping experience for our customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform">
                        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Quality Products</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            We carefully select every product to ensure the highest quality standards
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform">
                        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast Shipping</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Quick delivery with real-time tracking for all your orders
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform">
                        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Payments</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Multiple secure payment options with encrypted transactions
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform">
                        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">24/7 Support</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our customer service team is available around the clock to assist you
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
