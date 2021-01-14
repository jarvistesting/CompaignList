import React, { useState } from "react";

import { getCompaignList } from "./helper";

import "./compaign.css";

export default () => {
  // State section
  const [cPage, setCPage] = useState(1);
  const [search, setSearch] = useState("");

  // fetching API data based on the search
  const { items, totalPages } = getCompaignList({
    page: cPage,
    query: search
  });

  const handleNextPage = () => {
    if (cPage !== totalPages) {
      setCPage(cPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (cPage > 1) {
      setCPage(cPage - 1);
    }
  };

  const handlePagination = (page = 1) => {
    setCPage(page);
  };

  const renderBtn = () => {
    const element = [];
    for (let i = 0; i < totalPages; i++) {
      element.push(
        <button
          key={`pagination_btn_${i}`}
          className={`pageBtn ${cPage === i + 1 ? "activePage" : ""}`}
          onClick={() => handlePagination(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
    return element;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const renderCompaignData = () => {
    return items.map((compaign, index) => {
      return (
        <tr key={`compaign_${compaign._id}_${index}`}>
          <td>{compaign.name}</td>
          <td>{compaign.type}</td>
          <td>{compaign.company}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <section className={"searchSection"}>
        <input
          type="search"
          name={"compaignSearch"}
          id={"compaignSearch"}
          onChange={handleSearchChange}
        />
      </section>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>{renderCompaignData()}</tbody>
      </table>
      <div className={"paginationContainer"}>
        <button
          disabled={cPage === 1}
          onClick={handlePrevPage}
          className={"prevBtn"}
        >
          {"<"}
        </button>
        {renderBtn()}
        <button
          disabled={cPage === totalPages}
          onClick={handleNextPage}
          className={"nextBtn"}
        >
          {">"}
        </button>
      </div>
    </>
  );
};
