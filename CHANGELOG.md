<a name="1.0.0"></a>
# [1.0.0](https://github.com/seznam/IMA.js-ui-atoms/compare/0.11.11...1.0.0) (2018-06-12)

### BREAKING CHANGES

* **UIComponentHelper:** removed deprecated methods convertToNumber, getWindowViewportRect, getBoundingClientRect, getPercentOfVisibility and throttle. Use instead of that UIComponentHelper.componentPositions.(convertToNumber|getWindowViewportRect|getBoundingClientRect|getPercentOfVisibility) and UIComponentHelper.visibility.throttle.

* **Visibility:** Visibility writer function receive full circle entry object with payload as argument. The payload are set from visibility reader. For parsing payload you can use [UIComponentHelper.wrapVisibilityWriter](https://github.com/seznam/IMA.js-ui-atoms/blob/master/src/UIComponentHelper.js#L254).
