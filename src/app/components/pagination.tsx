import React from 'react'

const Pagination = () => {
    return (
        <section className='container mx-auto py-8 px-medium lg:px-large'>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-5 mt-12">
                <button className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FBEBB5] hover:bg-[#E1C987] text-gray-600">
                    1
                </button>
                <button className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FFF9E5] hover:bg-[#E5D7B3] text-gray-600">
                    2
                </button>
                <button className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FFF9E5] hover:bg-[#E5D7B3] text-gray-600">
                    3
                </button>
                <button className="h-10 px-4 flex items-center justify-center rounded-md bg-[#FFF9E5] hover:bg-[#E5D7B3] text-gray-600">
                    Next
                </button>
            </div>
        </section>
    )
}

export default Pagination
