<a name="1.2.6"></a>
## [1.2.6](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.5...1.2.6) (2018-09-07)


### Bug Fixes

* **iframe:** allow updating noloading props after mounting ([1003262](https://github.com/seznam/IMA.js-ui-atoms/commit/1003262))



<a name="1.2.5"></a>
## [1.2.5](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.4...1.2.5) (2018-08-31)


### Bug Fixes

* **htmlimage:** reduced amount of imageObserver padding ([9ca44a5](https://github.com/seznam/IMA.js-ui-atoms/commit/9ca44a5))



<a name="1.2.4"></a>
## [1.2.4](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.3...1.2.4) (2018-08-21)


### Bug Fixes

* **uicomponenthelper:** ratio of 0 fixed ([1dfa870](https://github.com/seznam/IMA.js-ui-atoms/commit/1dfa870)), closes [#50](https://github.com/seznam/IMA.js-ui-atoms/issues/50)



<a name="1.2.3"></a>
## [1.2.3](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.2...1.2.3) (2018-08-07)


### Bug Fixes

* allow attribure "role" for component aria props ([1b75ba3](https://github.com/seznam/IMA.js-ui-atoms/commit/1b75ba3))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.1...1.2.2) (2018-08-02)


### Bug Fixes

* visibility helper - unregister only registered listeners ([01d911c](https://github.com/seznam/IMA.js-ui-atoms/commit/01d911c))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/seznam/IMA.js-ui-atoms/compare/1.2.0...1.2.1) (2018-07-05)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/seznam/IMA.js-ui-atoms/compare/1.1.3...1.2.0) (2018-06-28)


### Bug Fixes

* **htmliframe:** fixed PropTypes ([6447e8f](https://github.com/seznam/IMA.js-ui-atoms/commit/6447e8f)), closes [#46](https://github.com/seznam/IMA.js-ui-atoms/issues/46)
* **loader:** name of the animation keyframes scrambles correctly ([1fe7c2b](https://github.com/seznam/IMA.js-ui-atoms/commit/1fe7c2b))


### Features

* **htmliframe:** added onload property ([2633253](https://github.com/seznam/IMA.js-ui-atoms/commit/2633253)), closes [#46](https://github.com/seznam/IMA.js-ui-atoms/issues/46)
* **htmlimage:** added onload and onerror properties ([f7f6b45](https://github.com/seznam/IMA.js-ui-atoms/commit/f7f6b45))
* **visibility:** added notify method and unify event structure ([7b4047a](https://github.com/seznam/IMA.js-ui-atoms/commit/7b4047a))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/seznam/IMA.js-ui-atoms/compare/1.1.2...1.1.3) (2018-06-25)


### Bug Fixes

* **htmlimage:** use src if srcset not supported ([9d47983](https://github.com/seznam/IMA.js-ui-atoms/commit/9d47983)), closes [#43](https://github.com/seznam/IMA.js-ui-atoms/issues/43)



<a name="1.1.2"></a>
## [1.1.2](https://github.com/seznam/IMA.js-ui-atoms/compare/1.1.1...1.1.2) (2018-06-20)


### Bug Fixes

* **htmlimage:** returning value from getDerivedStateFromProps ([113daa3](https://github.com/seznam/IMA.js-ui-atoms/commit/113daa3))



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
