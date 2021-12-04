import { eventBus } from '../eventBus';

describe('eventBus', () => {
  it('should be a function', () => {
    expect(typeof eventBus).toBe('function');
  });

  it('should return an object', () => {
    expect(typeof eventBus()).toBe('object');
  });

  it('should have subscribe function', () => {
    expect(typeof eventBus().subscribe).toBe('function');
  });

  it('should have unsubscribe function', () => {
    expect(typeof eventBus().unsubscribe).toBe('function');
  });

  it('should have emit function', () => {
    expect(typeof eventBus().emit).toBe('function');
  });

  describe('emit', () => {
    it('should call all callbacks', () => {
      const eventBusInstance = eventBus();
      const callback = jest.fn();

      eventBusInstance.subscribe('test', callback);
      eventBusInstance.emit('test', 'a', 'b');

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('a', 'b');
    });
  });
});
