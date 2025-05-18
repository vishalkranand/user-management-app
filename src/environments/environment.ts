// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Base URL
  BASE_URL: 'https://localhost:44300/api',

  // Controllers
  AUTH: '/Auth',
  USER: '/User',

  // Actions
  LOGIN: '/login',
  REGISTER: '/register',
  GET_ALL_USERS: '/users',
  UPDATE_USER_DETAILS: '/update-user-details',
  DELETE_USER: '/delete-user',
  DELETE_MULTIPLE_USERS: '/delete-multiple',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
