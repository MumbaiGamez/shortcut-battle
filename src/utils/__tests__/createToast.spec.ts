import { ToastTheme } from '../../redux/slices/settingsSlice';
import {
  createErrorToast,
  createSuccessToast,
  createToast,
} from '../createToast';

describe('createToast', () => {
  it('should return an object with the correct shape', () => {
    const expected = {
      id: expect.any(Number),
      message: expect.any(String),
      theme: expect.any(String),
    };

    const actual = createToast('toast message', ToastTheme.Error);

    expect(actual).toMatchObject(expected);
  });

  it('should return a correct toast success text and type', () => {
    expect(createToast('Success message', ToastTheme.Success)).toEqual({
      id: expect.any(Number),
      message: 'Success message',
      theme: ToastTheme.Success,
    });
  });

  it('should return a correct error toast', () => {
    expect(createToast('Error message', ToastTheme.Error)).toEqual({
      id: expect.any(Number),
      message: 'Error message',
      theme: ToastTheme.Error,
    });
  });

  it('should return a correct success toast', () => {
    expect(createSuccessToast('Success message')).toEqual({
      id: expect.any(Number),
      message: 'Success message',
      theme: ToastTheme.Success,
    });
  });

  it('should return a correct error toast', () => {
    expect(createErrorToast('Error message')).toEqual({
      id: expect.any(Number),
      message: 'Error message',
      theme: ToastTheme.Error,
    });
  });
});
