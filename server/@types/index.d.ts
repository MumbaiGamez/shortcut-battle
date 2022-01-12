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

export {};
