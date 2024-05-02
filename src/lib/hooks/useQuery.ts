import { useState, useEffect, useRef } from "react";
import _ from "lodash";

export type QueryKey = readonly unknown[];

export type QueryFunction<TData = unknown> = () => TData | Promise<TData>;

export interface QueryOptions<TData = unknown> {
  initialData?: TData;
  /**
   * If set to `true`, the query will refetch on mount if the data is stale.
   * If set to `false`, will disable additional instances of a query to trigger background refetches.
   * @Defaults to `true`.
   */
  refetchOnMount?: boolean;
}

export type QueryError<TError> = TError | Error | null | unknown;

type QueryResult<TData, TError> = {
  data: TData | null;
  isLoading: boolean;
  error: QueryError<TError>;
};

function useQuery<TData = unknown, TError = unknown, TQueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TData>,
  options: QueryOptions<TData>,
): QueryResult<TData, TError> & { refetch: () => void } {
  const { refetchOnMount = true, initialData = null } = options;
  const [state, setState] = useState<QueryResult<TData, TError>>({
    data: initialData,
    isLoading: true,
    error: null,
  });
  const prevQueryKeyRef = useRef<TQueryKey | null>(null);

  const fetchData = async () => {
    try {
      prevQueryKeyRef.current = queryKey; // Update prevQueryKeyRef
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const data: TData = await queryFn();
      setState({ data, isLoading: false, error: null });
    } catch (error: any) {
      setState({ data: null, isLoading: false, error });
    }
  };

  useEffect(() => {
    if (!_.isEqual(prevQueryKeyRef.current, queryKey)) {
      if (refetchOnMount) {
        fetchData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, refetchOnMount]);

  return {
    ...state,
    refetch: () => fetchData(),
  };
}

export { useQuery };
