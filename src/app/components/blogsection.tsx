import Image from 'next/image'
import Link from 'next/link';

const blogPosts = [
    {
        id: 1,
        title: "Going all-in with millennial design",
        description: "Explore modern ideas for design inspiration.",
        date: "12 Oct 2022",
        readTime: "5 min",
        image: "/blog1.avif",
    },
    {
        id: 2,
        title: "Going all-in with millennial design",
        description: "Explore modern ideas for design inspiration.",
        date: "12 Oct 2022",
        readTime: "5 min",
        image: "/blog2.avif",
    },
    {
        id: 3,
        title: "Going all-in with millennial design",
        description: "Explore modern ideas for design inspiration.",
        date: "12 Oct 2022",
        readTime: "5 min",
        image: "/blog3.avif",
    },
];

const Blogsection = () => {


    return (
        <section className="py-16 bg-white text-center">
            <div className="container mx-auto px-medium lg:px-large">
                {/* Title Section */}
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2">Our Blogs</h2>
                <p className="text-gray-600 text-center mb-8">
                    Find a bright idea to suit your taste with our great selection
                </p>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <Image
                                src={blog.image}
                                alt={`Blog post ${blog.id}`}
                                width={400}
                                height={300}
                                className="w-full h-auto"
                            />
                            <div className="p-6">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                                {/* <p className="text-gray-600 mb-4">{blog.description}</p> */}
                                <div className="flex items-center justify-center text-gray-500 text-sm">
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.25-9.75V6.25a.75.75 0 011.5 0v4.25a.75.75 0 01-.75.75H7.25a.75.75 0 010-1.5h2.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {blog.readTime}
                                    </span>
                                    <span className="mx-4">|</span>
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm7 4a1 1 0 10-2 0v4a1 1 0 001 1h3a1 1 0 100-2h-2V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {blog.date}
                                    </span>
                                </div>
                                <button className="mt-4 border-b border-black">Read More</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Posts Button */}
                <div className="text-center mt-8">
                    <Link className="py-2 border-b border-black transition-colors" href="/">
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>

    )
}

export default Blogsection
