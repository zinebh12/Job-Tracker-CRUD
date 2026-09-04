import { useState } from "react";
import type { SearchProps } from "../types/applications";
const Search = ({ onSearch }: SearchProps) => {
  // Implement search functionality here
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4"
      />
    </div>
  );
};

export default Search;
