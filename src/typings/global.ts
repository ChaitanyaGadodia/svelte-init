declare namespace NodeJS {
  interface Global {
    __PROD__: boolean;
    __SERVER__: boolean;
  }

  interface ProcessEnv {
    PORT?: string;
    SECURE?: "true" | "false";
  }
}
