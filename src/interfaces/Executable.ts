export interface Executable {
  command: string;
  data?: {
    query: string;
    count?: number;
  };
  describe?: boolean;
}
