/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

export interface Logger {
  trace: (message?: any, ...optionalParams: any[]) => void;
  debug: (message?: any, ...optionalParams: any[]) => void;
  info: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  [x: string]: any;
}

export const silentLogger: Logger = {
  trace: (_message?: any, ..._optionalParams: any[]) => {},
  debug: (_message?: any, ..._optionalParams: any[]) => {},
  info: (_message?: any, ..._optionalParams: any[]) => {},
  warn: (_message?: any, ..._optionalParams: any[]) => {},
  error: (_message?: any, ..._optionalParams: any[]) => {},
};

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-empty-function */
