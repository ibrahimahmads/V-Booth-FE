import type { EventResponse, EventSearch, EventUpdateRequest } from "@/types/event.types";
import type { PageResponse, QueryParams } from "@/types/page.types";
import { api } from "./api";
import { cleanParams } from "@/utils/helper/params";

export async function getAllMyEvents(param:QueryParams<EventSearch>={}): Promise<PageResponse<EventResponse>> {
    const { page, size, sortBy, direction, search } = param;
    const res = await api.get<PageResponse<EventResponse>>("/event/me",{params:{
        page: page??1,
        size: size ?? 20,
        sortBy: sortBy ?? "createdAt",
        direction: direction ?? "DESC",
        ...cleanParams(search)
      }});
    return res.data;
}

export async function getMyDetailEvent(id:string):Promise<EventResponse>{
  const res = await api.get<EventResponse>(`/event/me/${id}`);
  return res.data;
}

export async function updateEvent(id: string, payload: EventUpdateRequest): Promise<EventResponse> {
  const res = await api.put<EventResponse>(`/event/${id}`, payload);
  return res.data;
}