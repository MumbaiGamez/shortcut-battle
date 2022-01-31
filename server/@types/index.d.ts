import { UserAttributes, SettingsAttributes } from '../models';

declare global {
  namespace Express {
    interface Response {
      renderReact(): void;
    }
  }

  namespace ESTree {
    type Literal = any;
    type Declaration = any;
    type Identifier = any;
    type Expression = any;
    type BlockStatement = any;
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: UserAttributes;
    userSettings?: SettingsAttributes | null;
  }
}

export {};
