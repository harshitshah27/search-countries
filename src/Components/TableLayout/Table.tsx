import React, { useState, useEffect } from "react";

interface Props {
  data: any[];
  itemsPerPage: number;
  loading: boolean;
}

function Table({ data, itemsPerPage, loading }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data) setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    data && data.length && data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="p-4 text-center">Sr No.</th>
            <th className="p-4 text-center">Country Name</th>
            <th className="p-4 text-center">Flag</th>
          </tr>
        </thead>
        {loading ? (
          <tr>
            <td colSpan={3} className="p-4 text-center">
              Fetching the data......
            </td>
          </tr>
        ) : (
          <tbody>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="p-4 text-center">{item?.name?.common}</td>
                  <td className="p-4 text-center">{item?.flag}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {!loading && data && data.length > 0 && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 30,
          }}
        >
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {currentPage * itemsPerPage - 10}
                {"  "}
              </span>
              to
              <span className="font-medium">
                {" "}
                {currentPage * itemsPerPage}{" "}
              </span>
              of
              <span className="font-medium"> {totalPages} </span>
              Pages
            </p>
            <div className="">
              <button
                style={{ marginRight: "8px" }}
                onClick={() => {
                  prevPage();
                }}
                type="button"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <button
                onClick={() => {
                  nextPage();
                }}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
