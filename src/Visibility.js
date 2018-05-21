import { Circle } from 'infinite-circle';

/**
 * Visibility helper.
 */
export default class Visibility {

	static get $dependencies() {
		return [
			'$Window'
		];
	}

	constructor(window) {
		/**
		 * @property _window
		 * @type {ima.window.Window}
		 */
		this._window = window;

        /**
		 * @property circle
		 * @type {Circle}
		 */
        this.circle = this._createVisibilityCircle();
	}

    /**
     * Create visibility circle.
     *
     * @return {Circle} The circle instance
     */
    _createVisibilityCircle() {
        return new Circle({
            listen: (notify) => this._listenOnEvents(notify),
            unlisten: (notify) => this._unlistenOnEvents(notify)
        });
    }

	/**
	 * Register handlers to visibility loop
	 *
	 * @param {function} reader
	 * @param {function} writer
	 * @param {{ visibilityInterval: number }} options
	 * @return {number} The registered id
	 */
	register(read, write, options = { visibilityInterval: 180 }) {
        return this.circle.register({
            read,
            write,
            options: { interval: options.visibilityInterval }
        });
	}

	/**
	 * Unregister handlers from visibility loop
	 *
	 * @param {number} The registered id
	 */
	unregister(id) {
		this.circle.unregister(id);
	}

	/**
	 * It cut down calling the event handler for defined interval. The throttle
	 * method use requestAnimationFrame function which is called during page
	 * scrolling.
	 *
	 * @method throttl
	 * @param {function(...)} eventHandler
	 * @param {number?} interval
	 * @param {Object?} context
	 * @return {function(...)} The throttled event
	 */
	throttle(eventHandler, interval, context) {
		let win = this._window.getWindow();
		interval = interval || 0;
		let callTime = 0;
		let lastArguments = null;

		if (context) {
			eventHandler = eventHandler.bind(context);
		}

		if (!this._window.isClient()) {
			return eventHandler;
		}

		function suspendAction() {
			if (callTime <= Date.now() || !win.requestAnimationFrame) {
				callTime = 0;
				eventHandler(...lastArguments);
			} else {
				win.requestAnimationFrame(suspendAction);
			}
		}

		return function throttle(...rest) {
			lastArguments = rest;

			if (!callTime) {
				callTime = Date.now() + interval;
				suspendAction();
			}
		};
	}

	/**
	 * The visibility helper start checking visibility of registered entries.
	 */
	_listenOnEvents(notify) {
		this._window.bindEventListener(this._window.getWindow(), 'resize', notify);
		this._window.bindEventListener(this._window.getWindow(), 'scroll', notify);
	}

	/**
	 * The visibility helper stop checking visibility of registered entries.
	 */
	_unlistenOnEvents(notify) {
		this._window.unbindEventListener(this._window.getWindow(), 'resize', notify);
		this._window.unbindEventListener(this._window.getWindow(), 'scroll', notify);
	}

}
