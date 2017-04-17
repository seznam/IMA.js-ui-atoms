/**
 * Component positions helper.
 */
export default class ComponentPositions {

	static get $dependencies() {
		return [
			'$Window'
		];
	}

	/**
	 * Initializes the helper.
	 *
	 * @param {ima.window.Window} window
	 */
	constructor(window) {
		/**
		 * @property _window
		 * @type {ima.window.Window}
		 */
		this._window = window;
	}

	/**
	 * Convert string to number.
	 *
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
	 * Returns intersection rectangle of two defined reactangles.
	 *
	 * @param {{top: number, left: number, width: number, height: number}} rect1
	 * @param {{top: number, left: number, width: number, height: number}} rect2
	 * @return {{top: number, left: number, width: number, height: number}} The intersection reactangle.
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
	 * Returns window scroll position.
	 *
	 * @return {{top: number, left: number}}
	 */
	getWindowScrollPosition() {
		let left = window.pageXOffset ? window.pageXOffset : 0;
		let top = window.pageYOffset ? window.pageYOffset : 0;

		return { top, left };
	}

	/**
	 * Returns the size of an element and its position relative to the viewport and
	 * add extended value to returned rect.
	 *
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
}
