import React from "react";

const Filter = ({filterText, setFilterText}) => {
    function handleFilter(event) {
        setFilterText(event.target.value)
    }

    return (
    <div>
        <input value={filterText} onChange={handleFilter}/>
    </div>)
}

export default Filter