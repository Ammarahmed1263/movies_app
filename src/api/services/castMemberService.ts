import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";

const MEMBER_BASE = ENDPOINTS.castMember;

export const getMemberDetails = (personId: number) => apiClient(MEMBER_BASE.details(personId));
export const getMemberCredits = (personId: number) => apiClient(MEMBER_BASE.movieCredits(personId));