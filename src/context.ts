import _merge from "lodash.merge";
import { TemplateBuilderOptions } from "@babel/template";

const globalContext: Context = {
  parserOptions: {
    placeholderPattern: false,
    placeholderWhitelist: new Set(),
  },
};

export interface Context {
  parserOptions: TemplateBuilderOptions;
}

export function updateContext(context: Context): Context {
  Object.assign(globalContext, _merge(globalContext, context));
  return getContext();
}

export function getContext(): Context {
  return globalContext;
}

export default getContext();
