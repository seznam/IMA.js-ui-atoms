/**
 * Visibility helper.
 */
const DEFAULT_VISIBILITY_INTERVAL = 180;
const DEFAULT_THROTTLE_INTERVAL = 60;

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
		 * @property _entries
		 * @type {Map}
		 */
		this._entries = new Map();

		/**
	   * @property _nextLoopEntriesMaxInterval
	   * @type {number}
	   */
			this._nextLoopEntriesMaxInterval = 0;

		/**
	   * @property _nextLoopEntriesTimeout
	   * @type {timer ID|null}
	   */
			this._nextLoopEntriesTimeout = null;

		/**
		 * @property _uniquiId
		 * @type {number}
		 */
		this._uniquiId = 0;

		/**
		 * @property _runningLoop
		 * @type {boolean}
		 */
		this._runningLoop = false;

		/**
		 * @property _throttledVisibilityLoop
		 * @type {function}
		 */
		this._throttledVisibilityLoop = this.throttle(
			this._visibilityLoop,
			DEFAULT_THROTTLE_INTERVAL,
			this
		);
	}

	/**
	 * Register handlers to visibility loop
	 *
	 * @param {function} reader
	 * @param {function} writer
	 * @param {{ visibilityInterval: number }} options
	 * @return {number} The registered id
	 */
	register(reader, writer, options = { visibilityInterval: DEFAULT_VISIBILITY_INTERVAL }) {
		let id = this._generateId();

		this._entries.set(
			id,
			{ reader, writer, options, lastLoop: Date.now() - options.visibilityInterval - 1 }
		);

		this._listenOnEvents();
		this._throttledVisibilityLoop();

		return id;
	}

	/**
	 * Unregister handlers from visibility loop
	 *
	 * @param {number} The registered id
	 */
	unregister(id) {
		this._entries.delete(id);

		if (this._entries.size === 0) {
			this._unlistenOnEvents();
		}
	}

	/**
	 * It cut down calling the event handler for defined interval. The throttle
	 * method use requestAnimationFrame function which is called during page
	 * scrolling.
	 *
	 * @method throttle
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
		
		clearTimeout(this._nextLoopEntriesTimeout);

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
	 * The main visibility loop is constructed for purpose performance improvements.
	 * The values are read at first and then the writer method is called with previous
	 * recorded value.
	 */
	_visibilityLoop() {
		let lastLoopRunning = Date.now();
		
		this._nextLoopEntriesMaxInterval = 0;
		clearTimeout(this._nextLoopEntriesTimeout);

		Array.from(this._entries.values()).filter((loopEntry) => {
			if ((loopEntry.lastLoop + loopEntry.options.visibilityInterval) <= Date.now()) {
				return true;
			} else {
				this._nextLoopEntriesMaxInterval = Math.max(this._nextLoopEntriesMaxInterval, loopEntry.options.visibilityInterval, DEFAULT_THROTTLE_INTERVAL + 1);
				return false;
			}
		}).map((loopEntry) => {
			loopEntry.lastLoop = lastLoopRunning;
			let readedValue = typeof loopEntry.reader === 'function' ? loopEntry.reader() : null;

			return {
				readedValue,
				reader: loopEntry.reader,
				writer: loopEntry.writer
			};
		}).map((loopEntry) => {
			if (typeof loopEntry.writer === 'function') {
				loopEntry.writer(loopEntry.readedValue);
			}
		});

		// Fires new loop in the end of the throttle if any entry.writer has left unhandled
		if (this._nextLoopEntriesMaxInterval) {
			const _this = this;
			this._nextLoopEntriesTimeout = setTimeout( () => { _this._visibilityLoop(); }, this._nextLoopEntriesMaxInterval + 1 );
		}
	}

	/**
	 * Generate unique id.
	 *
	 * @return {number}
	 */
	_generateId() {
		this._uniquiId += 1;

		return this._uniquiId;
	}

	/**
	 * The visibility helper start checking visibility of registered entries.
	 */
	_listenOnEvents() {
		if (this._runningLoop) {
			return;
		}

		this._runningLoop = true;
		this._window.bindEventListener(this._window.getWindow(), 'resize', this._throttledVisibilityLoop);
		this._window.bindEventListener(this._window.getWindow(), 'scroll', this._throttledVisibilityLoop);
	}

	/**
	 * The visibility helper stop checking visibility of registered entries.
	 */
	_unlistenOnEvents() {
		if (!this._runningLoop) {
			return;
		}

		this._runningLoop = false;
		this._window.unbindEventListener(this._window.getWindow(), 'resize', this._throttledVisibilityLoop);
		this._window.unbindEventListener(this._window.getWindow(), 'scroll', this._throttledVisibilityLoop);
	}

}
