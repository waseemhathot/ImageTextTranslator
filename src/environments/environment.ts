// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  corsProxy: 'https://cors-anywhere.herokuapp.com/',
  textDetectionApiKey: 'c62a0ba2bb904b9db6a0b554afd5cf8c',
  textDetectionApiUrl: 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr',
  textTranslationApiKey: 'trnsl.1.1.20191103T204853Z.203b194a23a589e3.59e47c0f82f64fc33b27373ef13fa184a31e353a',
  textTranslationApiUrl: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
