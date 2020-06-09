/* eslint-disable import/prefer-default-export */
// / <reference types="draft-js" />

declare module "draft-js-import-markdown" {
  import draftjs = require("draft-js");

  export function stateFromMarkdown(content: string): draftjs.ContentState;
}
