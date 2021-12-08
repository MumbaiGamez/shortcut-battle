import { getVar, setVar } from '../css';

describe('css', () => {
  it('should get and set variables', () => {
    expect(getVar('--color-primary')).toBe('');
    setVar('--color-primary', 'red');
    expect(getVar('--color-primary')).toBe('red');
  });
});
