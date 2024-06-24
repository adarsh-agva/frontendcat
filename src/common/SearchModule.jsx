import React from "react";

function SearchModule() {
  return (
    <div
      className="input_section"
      style={{
        display: "flex",
        backgroundColor: "rgb(152, 0, 76)",
        width: "100%",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <input
        className="search_input"
        type="text"
        placeholder="Enter Device ID"
        onChange={handleSearchChange}
        style={{
          padding: "0.7rem",
          border: "0px",
          width: "100%",
        }}
      />
      <button className={Style.searchBtn} onClick={handleClickSearch}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            color: "#ffff",
            padding: "0px 8px",
          }}
        />
      </button>
    </div>
  );
}

export default SearchModule;
