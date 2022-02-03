export class SchemaMismatchError extends Error {
  constructor(modelName: string) {
    super(`${modelName} data doesn't match schema`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
