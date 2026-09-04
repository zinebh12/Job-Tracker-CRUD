import type { ApplicationsResponse } from "./../types/applications";

const API_BASE_URL = "http://localhost:5000/api/applications";

export const getApplications = async (
  page = 1,
  limit = 10,
): Promise<ApplicationsResponse> => {
  const reponse = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);

  if (!reponse.ok) {
    throw new Error("Failed to fetch applications");
  }

  return reponse.json();
};
