import React, { useState } from "react";

import { compaignData } from "../../mockData/compaignJson";

import "./compaign.css";

export default () => {
  const [cPage, setCPage] = useState(1);
  const [totalPage, setTotalPage] = useState(
    Math.floor(compaignData.length / 10)
  );
  const [search, setSearch] = useState("");

  const handleNextPage = () => {
    if (cPage !== totalPage) {
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
    for (let i = 0; i < totalPage; i++) {
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

  const handleSearch = () => {};

  console.log("cPage", cPage, totalPage, compaignData.length, search);

  return (
    <>
      <section className={"searchSection"}>
        <input
          type="search"
          name={"compaignSearch"}
          id={"compaignSearch"}
          onChange={handleSearchChange}
        />
        <button disabled={search.length < 2} onClick={handleSearch}>
          {"search"}
        </button>
      </section>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {compaignData
            .slice(cPage * 10 - 10, 10 * cPage)
            .map((compaign, index) => {
              return (
                <tr key={`compaign_${compaign._id}_${index}`}>
                  <td>{compaign.name}</td>
                  <td>{compaign.type}</td>
                  <td>{compaign.company}</td>
                </tr>
              );
            })}
        </tbody>
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
          disabled={cPage === totalPage}
          onClick={handleNextPage}
          className={"nextBtn"}
        >
          {">"}
        </button>
      </div>
    </>
  );
};
