export interface Executable {
  command: string;
  data?: {
    query: string;
  };
  describe?: boolean;
  responseType?: string;
}
