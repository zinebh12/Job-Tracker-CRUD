// src/hooks/useApplications.ts
import { useEffect, useState, useCallback } from "react";
import { getApplications } from "../services/applicationApi";
import type { ApplicationsResponse } from "../types/applications";

export function useApplications(
  page: number,
  searchTerm: string,
  statusFilter: string,
) {
  const [data, setData] = useState<ApplicationsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await getApplications(
          page,
          10,
          searchTerm,
          statusFilter,
        );
        if (!cancelled) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError("Error fetching applications");
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [page, searchTerm, statusFilter, refreshFlag]);

  const refetch = useCallback(() => setRefreshFlag((f) => f + 1), []);

  return { data, loading, error, refetch };
}
