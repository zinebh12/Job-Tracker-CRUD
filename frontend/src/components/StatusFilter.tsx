import type { StatusFilterProps } from "../types/applications";
import { useState } from "react";
const StatusFilter = ({ onStatusChange }: StatusFilterProps) => {
//   const [selectedStatus, setSelectedStatus] = useState("");

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedStatus = event.target.value;
//     setSelectedStatus(selectedStatus);
//     onStatusChange(selectedStatus);
//     console.log("Selected status:", selectedStatus);
//     // You can implement the logic to filter applications based on the selected status here
//   };

  return (
    <select
    //   value={selectedStatus}
      onChange={(event) => onStatusChange(event.target.value)}
      defaultValue=""
    >
      <option value="">All Statuses</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
};

export default StatusFilter;
