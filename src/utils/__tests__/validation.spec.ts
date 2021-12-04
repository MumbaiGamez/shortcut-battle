import { getValidationError } from '../validation';

describe('getValidationError', () => {
  it('should return true and empty string if there are no rules', () => {
    const result = getValidationError(undefined, 'test');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe('');
  });

  it('should return required error', () => {
    const result = getValidationError({ isRequired: true }, '');

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Field is required');
  });

  it('should validate required', () => {
    const result = getValidationError({ isRequired: true }, 'test');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe('');
  });

  it('should return min-symbols error', () => {
    const result = getValidationError({ minSymbols: 5 }, 'test');

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Less then 5 symbols');
  });

  it('should validate min-symbols', () => {
    const result = getValidationError({ minSymbols: 3 }, 'test');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe('');
  });

  it('should return phone error', () => {
    const result = getValidationError({ phone: true }, 'test');

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Invalid phone');
  });

  it('should validate phone', () => {
    const result = getValidationError({ phone: true }, '+79140000000');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe('');
  });

  it('should return email error', () => {
    const result = getValidationError({ email: true }, 'test');

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Invalid email');
  });

  it('should validate email', () => {
    const result = getValidationError({ email: true }, 'test@test.com');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe('');
  });
});
