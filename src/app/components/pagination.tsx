import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers.
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <section className="container mx-auto py-8 px-4 lg:px-8">
      {/* Mobile View: Simplified pagination */}
      <div className="flex md:hidden justify-center items-center gap-4 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FBEBB5] hover:bg-[#E1C987] text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FFF9E5] hover:bg-[#E5D7B3] text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop View: Full pagination */}
      <div className="hidden md:flex justify-center items-center gap-5 mt-12">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-[#FBEBB5] hover:bg-[#E1C987] text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 flex items-center justify-center rounded-md ${
              page === currentPage ? "bg-[#FBEBB5]" : "bg-[#FFF9E5]"
            } hover:bg-[#E5D7B3] text-gray-600`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 px-4 flex items-center justify-center rounded-md bg-[#FFF9E5] hover:bg-[#E5D7B3] text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Pagination
