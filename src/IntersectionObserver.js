import { Circle } from 'infinite-circle';

/**
 * Visibility helper.
 */
export default class IntersectionObserver {

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
        this.circle = this._createObserverCircle();
	}

    /**
     * Create observer circle.
     *
     * @return {Circle} The circle instance
     */
    _createObserverCircle() {
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
	 * The visibility helper start checking visibility of registered entries.
	 */
	_listenOnEvents(notify) {
        this._intersectionObserver = new IntersectionObserver(() => {
            notify();
        }, {
            rootMargin: '50px'
        });
	}

	/**
	 * The visibility helper stop checking visibility of registered entries.
	 */
	_unlistenOnEvents(notify) {
        this._intersectionObserver.disconnect();
		this._window.unbindEventListener(this._window.getWindow(), 'resize', notify);
		this._window.unbindEventListener(this._window.getWindow(), 'scroll', notify);
	}

}
