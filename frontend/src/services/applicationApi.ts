import type { ApplicationsResponse } from "./../types/applications";

const API_BASE_URL = "http://localhost:5000/api/applications";

export const getApplications = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
): Promise<ApplicationsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append("search", search);
  }
  if (status) {
    params.append("status", status);
  }
  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
};
