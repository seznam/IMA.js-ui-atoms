import Visibility from '../Visibility';

import _window from '../mocks/window';
import _dispatcher from '../mocks/dispatcher';

describe('Visibility', () => {
  let reader = () => {};
  let writer = () => {};
  let options = { visibilityInterval: 180 };

  let visibility = null;

  beforeEach(() => {
    visibility = new Visibility(_window, _dispatcher);
  });

  describe('register method', () => {
    it('should return visibilityId', () => {
      expect(
        typeof visibility.register(reader, writer, options) === 'string'
      ).toEqual(true);
    });

    it('should start listening on scroll and resize events', () => {
      spyOn(visibility, '_listenOnEvents');

      visibility.register(reader, writer, options);

      expect(visibility._listenOnEvents).toHaveBeenCalled();
    });

    it('should notify if registering after handle route', () => {
      const notify = jest.spyOn(visibility, 'notify');

      visibility.register(reader, writer, options);

      expect(visibility.notify).not.toHaveBeenCalled();
      notify.mockClear();

      visibility._afterHandleRoute({});
      visibility.register(reader, writer, options);

      expect(visibility.notify).toHaveBeenCalled();
      notify.mockClear();

      visibility._beforeHandleRoute();
      visibility.register(reader, writer, options);

      expect(visibility.notify).not.toHaveBeenCalled();
    });
  });

  describe('unregister method', () => {
    let visibilityId = null;

    beforeEach(() => {
      visibilityId = visibility.register(reader, writer, options);
    });

    it('should stop listening on scroll and resize events', () => {
      spyOn(visibility, '_unlistenOnEvents');

      visibility.unregister(visibilityId);

      expect(visibility._unlistenOnEvents).toHaveBeenCalled();
    });
  });
});
