/* eslint-disable import/no-anonymous-default-export */

import { memoize } from "@/utils/memoize";

export default {
  rootPath: () => "/",
  examplePath: () => "/example",

  /* prototype */
  prototypePath: () => "/prototype",
  homeOfficePath: () => "/prototype/home-office",
  franchisesPath: () => "/prototype/franchises",

  /* examples */
  exampleDynamicRouteWithParam: memoize((param: string) => `/route/${param}/`)
};
