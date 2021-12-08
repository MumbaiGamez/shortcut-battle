import { setFormFieldValueFactory } from '../setFormFieldValueFactory';

describe('setFormFieldValueFactory', () => {
  it('should return a function', () => {
    expect(typeof setFormFieldValueFactory(jest.fn())).toBe('function');
  });

  it('should return a function that takes fieldName and return function', () => {
    const callback = jest.fn();
    const setFormFieldValue = setFormFieldValueFactory(callback);

    expect(typeof setFormFieldValue).toBe('function');

    expect(typeof setFormFieldValue('fieldName')).toBe('function');
  });

  it('should call callback', () => {
    const callback = jest.fn();
    const setFormFieldValue = setFormFieldValueFactory(callback);

    setFormFieldValue('key')('value');

    expect(callback).toHaveBeenCalled();
  });
});
