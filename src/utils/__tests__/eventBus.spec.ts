import { eventBus } from '../eventBus';

describe('eventBus', () => {
  it('should call callbacks', () => {
    const eventBusInstance = eventBus();
    const callback = jest.fn();

    eventBusInstance.subscribe('test', callback);
    eventBusInstance.emit('test', 'a', 'b');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('a', 'b');
  });
});
