import { ToastTheme } from '../../redux/slices/settingsSlice';
import { createErrorToast, createSuccessToast } from '../createToast';

describe('createToast', () => {
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
