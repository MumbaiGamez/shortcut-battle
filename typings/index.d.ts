declare interface Window {
  __PRELOADED_STATE__?: object;
  __i18nStore__: any;
  __i18nLanguage__?: any;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare const PRODUCTION: string;
declare const REDIRECT_URI: string;

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
