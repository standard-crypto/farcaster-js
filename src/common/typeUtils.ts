/**
 * Typescript utility type to convert specific properties of a given type from optional to required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
