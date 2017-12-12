import ComponentPositions from './ComponentPositions';
import Visibility from './Visibility';

/**
 * UI component helper.
 */
export default class UIComponentHelper {

	static get $dependencies() {
		return [
			'$Router',
			ComponentPositions,
			Visibility,
			'$CssClasses'
		];
	}

	/**
	 * Initializes the helper.
	 *
	 * @param {ima.router.Router} router
	 * @param {ComponentPositions} componentPositions
	 * @param {Visibility} visibility
	 * @param {function(...?(boolean|string|React.Component|Object<string, boolean>)): string} cssClassNameProcessor
	 */
	constructor(router, componentPositions, visibility, cssClassNameProcessor) {
		/**
		 * IMA Router
		 *
		 * @type {ima.router.Router}
		 */
		this._router = router;

		/**
		 * Component position
		 *
		 * @type {ComponentPosition}
		 */
		this._componentPositions = componentPositions;

		/**
		 * Visibility helper
		 *
		 * @type {Visibility}
		 */
		this._visibility = visibility;

		/**
		 * @type {function(...?(boolean|string|React.Component|Object<string, boolean>)): string}
		 */
		this._cssClassNameProcessor = cssClassNameProcessor;
	}

	/**
	 * The public getter for visibility helper.
	 *
	 * @return {Visibility}
	 */
	get visibility() {
		return this._visibility;
	}

	/**
	 * The public getter for component positions helper.
	 *
	 * @return {ComponentPositions}
	 */
	get componentPositions() {
		return this._componentPositions;
	}

	/**
	 * Returns true if page may be rendered as amp page.
	 *
	 * @return {boolean}
	 */
	isAmp() {
		let ampParam = null;

		try {
			ampParam = this._router.getCurrentRouteInfo().params.amp;
		} catch (error) {
			ampParam = false;
		}

		return ampParam === true || ampParam === '1';
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

		for (let propertyName of Object.keys(props)) {
			if (/^data-/.test(propertyName)) {
				dataProps[propertyName] = props[propertyName];
			}
		}

		return dataProps;
	}

	/**
	 * Generate a string of CSS classes from the properties of the passed-in
	 * object that resolve to true.
	 *
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
		return this._cssClassNameProcessor(...classRuleGroups);
	}

	/**
	 * Only Facade mehtod of ComponentPositions.convertToNumber function
	 * for backward compatibility.
	 *
	 * @deprecated removed with next version
	 * @param {string} string
	 * @return {number}
	 */
	convertToNumber(string) {
		return this._componentPositions.convertToNumber(string);
	}

	/**
	 * Only Facade mehtod of ComponentPositions.getWindowViewportRect function
	 * for backward compatibility.
	 *
	 * @deprecated removed with next version
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getWindowViewportRect() {
		return this._componentPositions.getWindowViewportRect();
	}

	/**
	 * Only Facade mehtod of ComponentPositions.getBoundingClientRect function
	 * for backward compatibility.
	 *
	 * @deprecated removed with next version
	 * @param {Element} element
	 * @param {{width: number, height: number}} size
	 * @param {number} extended
	 * @return {{top: number, left: number, width: number, height: number}}
	 */
	getBoundingClientRect(element, size, extended) {
		return this._componentPositions.getBoundingClientRect(element, size, extended);
	}

	/**
	 * Only Facade mehtod of ComponentPositions.getPercentOfVisibility function
	 * for backward compatibility.
	 *
	 * @deprecated removed with next version
	 * @param {{top: number, left: number, width: number, height: number}} elmRect
	 * @return {number} The percent of visibility.
	 */
	getPercentOfVisibility(elmRect) {
		return this._componentPositions.getPercentOfVisibility(elmRect);
	}

	/**
	 * @param {HTMLElement} element
	 * @param {{ width: ?number, height: ?number, extendedPadding: ?number }} options
	 * @return {function}
	 */
	getVisibilityReader(element, options) {
		let self = this;

		return function readVisibility() {
			let elementRect = self._componentPositions.getBoundingClientRect(
				element,
				{ width: options.width, height: options.height },
				options.extendedPadding
			);

			return self._componentPositions.getPercentOfVisibility(elementRect);
		};
	}

	/**
	 * Only Facade mehtod of Visibility.throttle function
	 * for backward compatibility.
	 *
	 * @deprecated removed with next version
	 * @param {function(...)} eventHandler
	 * @param {number?} interval
	 * @param {Object?} context
	 * @return {function(...)} The throttled event
	 */
	throttle(eventHandler, interval, context) {
		return this._visibility.throttle(eventHandler, interval, context);
	}

	/**
	 * Register component to main visibility loop
	 *
	 * @param {function} reader
	 * @param {function} writer
	 * @param {{ visibilityInterval: number }} options
	 * @return {number} The registered id
	 */
	registerComponentToVisibility(reader, writer, options = { visibilityInterval: 180 }) {
		return this._visibility.register(reader, writer, options);
	}

	/**
	 * Unregister component from main visibility loop
	 *
	 * @param {number} visibilityId
	 */
	unregisterComponentToVisibility(visibilityId) {
		this._visibility.unregister(visibilityId);
	}
}
