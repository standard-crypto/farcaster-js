import { Cast } from "./Cast";

export interface GetCastResponse {
  result: GetCastResponseResult;
}

export interface GetCastResponseResult {
  cast: Cast;
}
