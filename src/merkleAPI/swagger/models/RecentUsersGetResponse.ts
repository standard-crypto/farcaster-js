/* tslint:disable */

import { PaginationInfo } from "./PaginationInfo";
import { User } from "./User";

/* eslint-disable */
export interface RecentUsersGetResponse {
  result: RecentUsersGetResponseResult;
  next?: PaginationInfo;
}

export interface RecentUsersGetResponseResult {
  users: Array<User>;
}
