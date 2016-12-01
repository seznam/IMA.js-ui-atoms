import classnames from 'classnames';

/**
 * UI component helper.
 *
 * @class UIComponentHelper
 * @namespace ima.ui.atom
 * @module ima
 */
export default class UIComponentHelper {

	/**
	 * Initializes the helper.
	 *
	 * @constructor
	 * @method constructor
	 * @param {ima.router.Router} router
	 * @param {ima.window.Window} window
	 */
	constructor(router, window) {
		/**
		 * IMA Router
		 *
		 * @property _router
		 * @type {ima.router.Router}
		 */
		this._router = router;

		/**
		 * IMA window
		 *
		 * @property _window
		 * @type {ima.window.window}
		 */
		this._window = window;
	}

	/**
	 * Returns true if page may be rendered as amp page.
	 *
	 * @method isAmp
	 * @return {boolean}
	 */
	isAmp() {
		var amp = null;

		try {
			amp = !!this._router.getCurrentRouteInfo().params.amp;
		} catch (error) {
			amp = false;
		}

		return amp;
	}

	/**
	 * Filters the provided properties and returns only the properties which's
	 * names start with the {@code data-} prefix.
	 *
	 * @param {Object<string, *>} props
	 * @return {Object<string, (number|string)>}
	 */
	getDataProps(props) {
		let dataProps = {};

		// TODO: replace with for-of Object.keys() when Phantom no longer sucks
		let propertyNames = Object.keys(props);
		for (let i = 0; i < propertyNames.length; i++) {
			let propertyName = propertyNames[i];
			if (/^data-/.test(propertyName)) {
				dataProps[propertyName] = props[propertyName];
			}
		}

		return dataProps;
	}

	/**
	 * Convert string to number.
	 *
	 * @method convertToNumber
	 * @param {string}	string
	 * @return {number}
	 */
	convertToNumber(string) {
		let number = 0;

		try {
			number = parseInt(string, 10);
		} catch (e) {
			number = 0;
		}

		return number;
	}

	/**
	 * Returns percent of visibility defined area in window viewport.
	 *
	 * @method getPercentOfVisibility
	 * @param {{top: number, left: number, width: number, height: number}} elmRect
	 * @return {number} The percent of visibility.
	 */
	getPercentOfVisibility(elmRect) {
		if (!elmRect) {
			throw new Error(`Element rect is required. Call getBoundingClientRect()` +
					` method on element or give object with properties { top: number,` +
					` left: number, width: number, height: number }.`);
		}

		if (!this._window.isClient()) {
			return 0;
		}

		let windowViewportRect = this.getWindowViewportRect();

		let intersectionRect = this.getRectsIntersection(windowViewportRect, elmRect);
		let percent = (intersectionRect.width * intersectionRect.height) / (elmRect.width * elmRect.height) * 100;

		return isNaN(percent) ? 0 : percent;
	}

	/**
	 * Returns two reactangles intersection.
	 *
	 * @method getRectsIntersection
	 * @param {{top: number, left: number, width: number, height: number}} rect1
	 * @param {{top: number, left: number, width: number, height: number}} rect2
	 * @return {{top: number, left: number, width: number, height: number}} The reactangle intersection.
	 */
	getRectsIntersection(rect1, rect2) {
		let top = this.getNumberFromRange(rect2.top, rect1.top, rect1.height);
		let left = this.getNumberFromRange(rect2.left, rect1.left, rect1.width);
		let bottom = this.getNumberFromRange(rect2.top + rect2.height, rect1.top, rect1.height);
		let right = this.getNumberFromRange(rect2.left + rect2.width, rect1.left, rect1.width);
		let width = right - left;
		let height = bottom - top;

		return { top, left, width, height };
	}

	/**
	 * Returns number from defined range, if number is not in defined range return min
	 * or max depends on number.
	 *
	 * @method getNumberFromRange
	 * @param {number} number
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	getNumberFromRange(number, min, max) {
		return Math.min(Math.max(number, min), max);
	}

	/**
	 * Returns window viewport rect.
	 *
	 * @method getWindowViewportRect
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getWindowViewportRect() {
		let win = this._window.getWindow();
		let top = 0;
		let left = 0;
		let width = 0;
		let height = 0;

		if (this._window.isClient()) {
			width = win.innerWidth;
			height = win.innerHeight;
		}

		return { top, left, width, height };
	}

	/**
	 * Returns the size of an element and its position relative to the viewport and
	 * add extended value to returned rect.
	 *
	 * @method getBoundingClientRect
	 * @param {Element} element
	 * @param {{width: number, height: number}} size
	 * @param {number} extended
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getBoundingClientRect(element, { width, height } = { width: 0, height: 0 }, extended = 0) {
		if (!element || typeof element.getBoundingClientRect !== 'function') {
			throw new Error(`Element rect is required with callable getBoundingClientRect()` +
					` method on element.`);
		}

		let clientRect = element.getBoundingClientRect();
		let elmRectStyle = {
			top: clientRect.top - extended,
			left: clientRect.left - extended,
			width: clientRect.width + 2 * extended,
			height: (clientRect.height || height || 0 / width || 0 * clientRect.width) + 2 * extended
		};

		return elmRectStyle;
	}

	/**
	 * Generate a string of CSS classes from the properties of the passed-in
	 * object that resolve to true.
	 *
	 * @method cssClasses
	 * @param {...?(string|Object<string, boolean>)} classRuleGroups CSS
	 *        classes in a string separated by whitespace, or a map of CSS
	 *        class names to boolean values. The CSS class name will be
	 *        included in the result only if the value is {@code true}.
	 *        Declarations in the later class rule group will override the
	 *        declarations in the previous group.
	 * @return {string} String of CSS classes that had their property resolved
	 *         to {@code true}.
	 */
	cssClasses(...classRuleGroups) {
		return classnames(...classRuleGroups);
	}

	/**
	 * It is cut down calling the event handler for defined interval.
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
		let callTime = Date.now() + interval;
		let lastArguments = null;

		if (context) {
			eventHandler = eventHandler.bind(context);
		}

		if (!this._window.isClient()) {
			return eventHandler;
		}

		return function throttle(...rest) {
			lastArguments = rest;

			if (!callTime) {
				callTime = Date.now() + interval;
			}

			if (callTime <= Date.now()) {
				callTime = 0;
				eventHandler(...lastArguments);
			} else {
				win.requestAnimationFrame(throttle);
			}
		};

	}
}
