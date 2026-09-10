import { useState } from "react";
import type { SearchProps } from "../types/applications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
const Search = ({ onSearch }: SearchProps) => {
  // Implement search functionality here
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      className="relative w-full"
    >
      <FontAwesomeIcon
        icon={faSearch}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-sage"
      />

      <motion.input
        type="text"
        placeholder="Search applications..."
        value={searchTerm}
        onChange={handleSearch}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
        className="w-full rounded-xl border border-sage/40 bg-sage-light/30 px-4 py-3 pl-11 text-sm text-deep-forest outline-none transition placeholder:text-forest/40 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/10"
      />
    </motion.div>
  );
};

export default Search;
