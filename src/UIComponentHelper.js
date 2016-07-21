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
			amp = this._router.getCurrentRouteInfo().params.amp ? true : false;
		} catch (e) {
			amp = false;
		}

		return amp;
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

		let penetrationRects = this.getPenetrationOfRects(windowViewportRect, elmRect);
		let percent = (penetrationRects.width * penetrationRects.height) / (elmRect.width * elmRect.height) * 100;

		return isNaN(percent) ? 0 : percent;
	}

	/**
	 * Returns penetration of defined rects.
	 *
	 * @method getPenetrationOfRects
	 * @param {{top: number, left: number, width: number, height: number}} rect1
	 * @param {{top: number, left: number, width: number, height: number}} react2
	 * @return {{top: number, left: number, width: number, height: number}} The penetration of rects.
	 */
	getPenetrationOfRects(rect1, rect2) {
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
			width: clientRect.width + extended,
			height: (clientRect.height || height || 0 / width || 0 * clientRect.width) + extended
		};

		return elmRectStyle;
	}

	/**
	 * Generate a string of CSS classes from the properties of the passed-in
	 * object that resolve to true.
	 *
	 * @method cssClasses
	 * @param {(string|Object<string, boolean>)} classRules CSS classes in a
	 *        string separated by whitespace, or a map of CSS class names to
	 *        boolean values. The CSS class name will be included in the result
	 *        only if the value is {@code true}.
	 * @return {string} String of CSS classes that had their property resolved
	 *         to {@code true}.
	 */
	cssClasses(classRules) {
		if (typeof classRules === 'string') {
			var  separatedClassNames = classRules.split(/\s+/);
			classRules = {};

			for (var className of separatedClassNames) {
				classRules[className] = true;
			}
		}

		if (!(classRules instanceof Object)) {
			throw new Error('The class rules must be specified as a plain ' +
					`object, ${classRules} provided`);
		}

		return Object
			.keys(classRules)
			.filter((cssClassName) => {
				return classRules[cssClassName];
			})
			.join(' ');
	}
}
