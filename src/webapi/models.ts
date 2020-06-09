import { HttpMethod } from "../types/httpMethods";

export interface RouteMethod {
  route: string;
  method: HttpMethod;
}
