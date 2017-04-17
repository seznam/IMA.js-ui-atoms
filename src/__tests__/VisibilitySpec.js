import Visibility from '../Visibility';

import _window from '../mocks/window';

describe('Visibility', () => {

	let reader = () => {};
	let writer = () => {};
	let options = { visibilityInterval: 180 };

	let visibility = null;

	beforeEach(() => {
		visibility = new Visibility(_window);
	});

	describe('register method', () => {

		it('should return visibilityId', () => {
			expect(visibility.register(reader, writer, options)).toEqual(1);
		});

		it('should the handlers must be called without scroll and resize events', () => {
			spyOn(visibility, '_throttledVisibilityLoop');

			visibility.register(reader, writer, options);

			expect(visibility._throttledVisibilityLoop).toHaveBeenCalled();
		});

		it('should start listening on scroll and resize events', () => {
			spyOn(visibility, '_listenOnEvents');

			visibility.register(reader, writer, options);

			expect(visibility._listenOnEvents).toHaveBeenCalled();
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
