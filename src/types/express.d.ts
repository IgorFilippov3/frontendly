import { SessionData } from "express-session";

declare global {
  namespace Express {
    interface Request {
      session: SessionData & {
        destroy(callback: (err?: any) => void): void;
        regenerate(callback: (err?: any) => void): void;
        save(callback: (err?: any) => void): void;
        reload(callback: (err?: any) => void): void;
        touch(): void;
      };
    }
  }
}
