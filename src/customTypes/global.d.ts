declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare const NODE_ENV: string;
declare const API_URL: string;
declare const API_MODE: 'local' | 'dev' | 'live';
