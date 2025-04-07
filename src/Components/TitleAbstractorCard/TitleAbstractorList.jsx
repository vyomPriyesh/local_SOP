import { useState } from "react";
import ReactPaginate from "react-paginate";
import TitleAbstractorCard from "./TitleAbstractorCard";
import backgroundImage from "./../../Images/office.jpg"
import logo from "./../../Images/logoListing.jpg"

const itemsPerPage = 6; // Har page me kitne cards dikhane hain

const TitleAbstractorList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  // Total Pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Filtered Data for Current Page
  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Page Change Handler
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {currentData.map((item) => (
          <TitleAbstractorCard key={item.id} {...item} />
        ))}
      </div>
      {currentData.length == 0 &&
        <div className="flex justify-center place-items-center">
          <h1>No Data Available</h1>
        </div>
      }

      {/* Pagination Controls */}
      {currentData.length > 0 &&
        <ReactPaginate
          previousLabel={"❮"}
          nextLabel={"❯"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center space-x-2 mt-[40px] mb-[10px] text-[18px] "
          pageClassName="px-2 py-1 text-gray-600"
          activeClassName="px-2 py-1"
          activeLinkClassName="text-blue-500"
          previousClassName="px-2 py-1 text-gray-600"
          nextClassName="px-2 py-1 text-gray-600"
          breakClassName="px-2 py-1 text-gray-400"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      }
    </div>
  );
};

export default TitleAbstractorList;
