import ComponentPositions from './ComponentPositions';
import Visibility from './Visibility';
import { Infinite } from 'infinite-circle';

/**
 * UI component helper.
 */
export default class UIComponentHelper {
  static get $dependencies() {
    return [
      '$Router',
      '$Window',
      ComponentPositions,
      Visibility,
      Infinite,
      '$CssClasses'
    ];
  }

  /**
   * Initializes the helper.
   *
   * @param {ima.router.Router} router
   * @param {ima.window.Window} window
   * @param {ComponentPositions} componentPositions
   * @param {Visibility} visibility
   * @param {Infinite} infinite
   * @param {function(...?(boolean|string|React.Component|Object<string, boolean>)): string} cssClassNameProcessor
   */
  constructor(
    router,
    window,
    componentPositions,
    visibility,
    infinite,
    cssClassNameProcessor
  ) {
    /**
     * IMA Router
     *
     * @type {ima.router.Router}
     */
    this._router = router;

    /**
     * IMA Window
     *
     * @type {ima.window.Window}
     */
    this._window = window;

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
     * Infinite loop
     *
     * @type {Infinite}
     */
    this._infinite = infinite;

    /**
     * @type {function(...?(boolean|string|React.Component|Object<string, boolean>)): string}
     */
    this._cssClassNameProcessor = cssClassNameProcessor;
  }

  /**
   * The public method which registers visibility circle to inifinite loop.
   */
  init() {
    this._infinite.add(this._visibility.circle);
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
   * The public getter for infinite loop.
   *
   * @return {Infinite}
   */
  get infinite() {
    return this._infinite;
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
   * Filters the provided properties and returns only the properties which's
   * names start with the {@code aria-} prefix.
   *
   * @param {Object<string, *>} props
   * @return {Object<string, (number|string)>}
   */
  getAriaProps(props) {
    let ariaProps = {};

    for (let propertyName of Object.keys(props)) {
      if (/^aria-/.test(propertyName)) {
        ariaProps[propertyName] = props[propertyName];
      }
    }

    return ariaProps;
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
   * @param {HTMLElement} element
   * @param {{ width: ?number, height: ?number, extendedPadding: ?number, useIntersectionObserver: boolean, tresholds: number[] }} options
   * @return {function}
   */
  getVisibilityReader(element, options) {
    if (
      options.useIntersectionObserver &&
      this._window.isClient() &&
      this._window.getWindow().IntersectionObserver
    ) {
      return this._getObserableReader(element, options);
    } else {
      return this._getReader(element, options);
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {{ width: ?number, height: ?number, extendedPadding: ?number, useIntersectionObserver: boolean, tresholds: number[] }} options
   * @return {function}
   */
  _getReader(element, options) {
    const self = this;

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
   * @param {HTMLElement} element
   * @param {{ width: ?number, height: ?number, extendedPadding: ?number, useIntersectionObserver: boolean, tresholds: number[] }} options
   * @return {function}
   */
  _getObserableReader(element, options) {
    const self = this;
    const observerConfig = {
      rootMargin: options.extendedPadding + 'px',
      tresholds: options.tresholds || [0]
    };
    let intersectionObserverEntry = null;
    let isFirstPositionCalculated = false;

    let observer = new IntersectionObserver(entries => {
      intersectionObserverEntry = entries[0];
    }, observerConfig);
    observer.observe(element);

    return function readVisibility() {
      if (!isFirstPositionCalculated) {
        isFirstPositionCalculated = true;
        return self._getReader(element, options)();
      }

      return { intersectionObserverEntry, observer };
    };
  }

  /**
   * @param {function} writer
   * @return {function}
   */
  wrapVisibilityWriter(writer) {
    return function parsePayload(circleEntry) {
      let { payload } = circleEntry;

      if (
        typeof payload === 'object' &&
        payload.observer &&
        payload.intersectionObserverEntry
      ) {
        return writer(
          payload.intersectionObserverEntry.intersectionRatio * 100,
          payload.observer
        );
      } else {
        return writer(payload);
      }
    };
  }
}
