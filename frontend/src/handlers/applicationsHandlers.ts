import {
  createApplication,
  editApplication,
  deleteApplication,
  deleteSelectedApplications,
} from "../services/applicationApi";

import type {
  NewApplicationFormProps,
  UpdateApplication,
} from "../types/applications";

export const handleCreateApplication = async (
  application: NewApplicationFormProps,
  refetch: () => void,
) => {
  try {
    await createApplication(application);
    refetch();
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

export const handleEditApplication = async (
  application: UpdateApplication,
  refetch: () => void,
) => {
  try {
    await editApplication(application);
    refetch();
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
};

export const handleDeleteApplication = async (
  id: number,
  refetch: () => void,
) => {
  try {
    await deleteApplication(id);
    refetch();
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};

export const handleDeleteMultipleApplications = async (
  ids: number[],
  refetch: () => void,
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  if (ids.length === 0) return;

  try {
    await deleteSelectedApplications(ids);
    setSelectedIds([]);
    refetch();
  } catch (error) {
    console.error("Error deleting multiple applications:", error);
    throw error;
  }
};
