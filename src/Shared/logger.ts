interface ILogger {
  log(message: string, arguments?: any): void;
}

declare var logger: ILogger;

declare module "logger" {
  export default logger;
}