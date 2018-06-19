<a name="1.1.1"></a>
## [1.1.1](https://github.com/seznam/IMA.js-ui-atoms/compare/1.1.0...1.1.1) (2018-06-19)


### Bug Fixes

* **less:** added missing less files in published module ([4ce31e3](https://github.com/seznam/IMA.js-ui-atoms/commit/4ce31e3))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/seznam/IMA.js-ui-atoms/compare/1.0.0...1.1.0) (2018-06-19)


### Bug Fixes

* **noscript:** serialize arai-* attributes for noscript tag ([7329966](https://github.com/seznam/IMA.js-ui-atoms/commit/7329966))


### Features

* **iframe:** added new prop allow ([11c9a74](https://github.com/seznam/IMA.js-ui-atoms/commit/11c9a74))
* **loader:** default color for the loader ([c358ff0](https://github.com/seznam/IMA.js-ui-atoms/commit/c358ff0))
* **loader:** option to render loader in white version ([7cc7b35](https://github.com/seznam/IMA.js-ui-atoms/commit/7cc7b35))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/seznam/IMA.js-ui-atoms/compare/0.11.11...1.0.0) (2018-06-12)

### BREAKING CHANGES

* **UIComponentHelper:** removed deprecated methods convertToNumber, getWindowViewportRect, getBoundingClientRect, getPercentOfVisibility and throttle. Use instead of that UIComponentHelper.componentPositions.(convertToNumber|getWindowViewportRect|getBoundingClientRect|getPercentOfVisibility) and UIComponentHelper.visibility.throttle.

* **Visibility:** Visibility writer function receive full circle entry object with payload as argument. The payload are set from visibility reader. For parsing payload you can use [UIComponentHelper.wrapVisibilityWriter](https://github.com/seznam/IMA.js-ui-atoms/blob/master/src/UIComponentHelper.js#L254).

* **Less:** Less files are in dist folder. You must update your app/build.js file from `./node_modules/ima-ui-atoms/*.less` to `./node_modules/ima-ui-atoms/dist/*.less`.
