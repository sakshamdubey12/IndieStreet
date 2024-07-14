import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/slices/user/productFilterSortSlice";

const Filter = ({ onClose, onApplyFilters, savedFilters }) => {
  const dispatch = useDispatch();
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);

  useEffect(() => {
    if (savedFilters && savedFilters.priceRange) {
      setSelectedPriceRange(savedFilters.priceRange);
    }
  }, [savedFilters]);

  const priceRanges = [
    { label: "0 - ₹500", value: [0, 500] },
    { label: "₹500 - ₹1000", value: [500, 1000] },
    { label: "₹1000 - ₹1500", value: [1000, 1500] },
    { label: "₹1500 - ₹2000", value: [1500, 2000] },
    { label: "₹2000+", value: [2000, Infinity] },
  ];

  const handleApplyFilters = () => {
    const filters = { priceRange: selectedPriceRange };
    dispatch(setFilters(filters));
    localStorage.setItem("filters", JSON.stringify(filters)); // Save filters to local storage
    onApplyFilters(filters);
    onClose(); // Close the filter sheet after applying
  };

  return (
    <div className="p-4">
      

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block mb-2">Price Range:</label>
        {priceRanges.map((range, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              id={`price-range-${index}`}
              name="priceRange"
              value={range.value}
              checked={
                selectedPriceRange[0] === range.value[0] &&
                selectedPriceRange[1] === range.value[1]
              }
              onChange={() => setSelectedPriceRange(range.value)}
              className="mr-2"
            />
            <label htmlFor={`price-range-${index}`}>{range.label}</label>
          </div>
        ))}
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
