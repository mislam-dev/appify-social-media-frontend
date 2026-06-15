import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import type { Paginated, PaginationMeta } from "@/modules/shared/types";

/* Network helper shared by the feed api modules. The global axios client
   (`lib/api-client`) stays generic; this adapts its envelope into the
   `Paginated<T>` view-model and maps raw DTOs to view-models. */

type PageParams = { page?: number; limit?: number };

/** GET a paginated collection and map each raw item to a view-model. */
export async function getList<Raw, Out>(
  url: string,
  params: PageParams,
  map: (raw: Raw) => Out,
): Promise<Paginated<Out>> {
  const res = await apiClient.get<ApiEnvelope<Raw[]>>(url, { params });
  const meta = (res.data.meta ?? {}) as Partial<PaginationMeta>;

  const page = Number(meta.page ?? params.page ?? 1);
  const limit = Number(meta.limit ?? params.limit ?? 10);
  const total = Number(meta.total ?? res.data.data.length);
  return {
    items: res.data.data.map(map),
    meta: {
      page,
      limit,
      total,
      total_pages: Math.max(1, Math.ceil(total / Math.max(1, limit))),
    },
  };
}

const identity = <T>(raw: T): T => raw;

/** GET a single entity and map the unwrapped payload to a view-model. */
export async function getOne<Raw, Out = Raw>(
  url: string,
  map: (raw: Raw) => Out = identity as (raw: Raw) => Out,
): Promise<Out> {
  const res = await apiClient.get<ApiEnvelope<Raw>>(url);
  return map(res.data.data);
}

/** POST a body and map the created entity from the envelope. */
export async function postOne<Raw, Out = Raw>(
  url: string,
  body?: unknown,
  map: (raw: Raw) => Out = identity as (raw: Raw) => Out,
): Promise<Out> {
  const res = await apiClient.post<ApiEnvelope<Raw>>(url, body);
  return map(res.data.data);
}

/** PATCH a body and map the updated entity from the envelope. */
export async function patchOne<Raw, Out = Raw>(
  url: string,
  body: unknown,
  map: (raw: Raw) => Out = identity as (raw: Raw) => Out,
): Promise<Out> {
  const res = await apiClient.patch<ApiEnvelope<Raw>>(url, body);
  return map(res.data.data);
}

/** DELETE an entity; nothing to unwrap. */
export async function del(url: string): Promise<void> {
  await apiClient.delete(url);
}
