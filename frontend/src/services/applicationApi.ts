import type {
  Application,
  ApplicationsResponse,
  UpdateApplication,
} from "./../types/applications";

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

export const createApplication = async (
  application: Omit<Application, "id" | "created_at">,
) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(application),
  });
  if (!response.ok) {
    throw new Error("Failed to create application");
  }
  return response.json();
};

export const editApplication = async (application: UpdateApplication) => {
  const response = await fetch(`${API_BASE_URL}/${application.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(application),
  });
  if (!response.ok) {
    throw new Error("Failed to update application");
  }
  return response.json();
};

export const deleteApplication = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
};

export const getApplicationDetails = async (
  id: number,
): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch application");
  }
  return response.json();
};

export const deleteSelectedApplications = async (ids: number[]) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error || "Failed to delete applications");
  }
  return response.json();
};
