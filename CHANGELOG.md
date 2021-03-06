<a name="0.0.44"></a>
## [0.0.44](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.43...v0.0.44) (2017-10-06)


### Bug Fixes

* **button:** button click event is not being dispatched ([8d90920](https://github.com/stasson/vue-mdc-adapter/commit/8d90920))



<a name="0.0.43"></a>
## [0.0.43](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.42...v0.0.43) (2017-10-06)


### Features

* **textfield:** align textfield on mdc 0.22 ([05a93bc](https://github.com/stasson/vue-mdc-adapter/commit/05a93bc))



<a name="0.0.42"></a>
## [0.0.42](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.41...v0.0.42) (2017-10-04)


### Bug Fixes

* **ssr:** avoid fetching matches property on server ([#77](https://github.com/stasson/vue-mdc-adapter/issues/77)) ([e114841](https://github.com/stasson/vue-mdc-adapter/commit/e114841))


### Features

* **button:** add support for button links ([#79](https://github.com/stasson/vue-mdc-adapter/issues/79)) ([5b9f678](https://github.com/stasson/vue-mdc-adapter/commit/5b9f678))
* **util:** add custom element component ([65899c6](https://github.com/stasson/vue-mdc-adapter/commit/65899c6))



<a name="0.0.41"></a>
## [0.0.41](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.40...v0.0.41) (2017-09-30)


### Bug Fixes

* **button:** buttons accessibility isssue ([0a2613b](https://github.com/stasson/vue-mdc-adapter/commit/0a2613b)), closes [#72](https://github.com/stasson/vue-mdc-adapter/issues/72)
* **card:** action button should render a <button> tag ([30e7f25](https://github.com/stasson/vue-mdc-adapter/commit/30e7f25))
* **fab:** fix fab accessibility issue ([4322914](https://github.com/stasson/vue-mdc-adapter/commit/4322914))
* **infra:** fix release script ([f89c7a8](https://github.com/stasson/vue-mdc-adapter/commit/f89c7a8))


### Features

* **button:** add style for mdc-icon ([95fcbff](https://github.com/stasson/vue-mdc-adapter/commit/95fcbff))
* **icon:** add mdc-icon component ([f747ac1](https://github.com/stasson/vue-mdc-adapter/commit/f747ac1))
* **toolbar:** add support for custom icons ([d975a18](https://github.com/stasson/vue-mdc-adapter/commit/d975a18))


### BREAKING CHANGES

* **toolbar:** - mdc-toolbar-menu replaces mdc-toolbar-icon-menu
- use icon prop instead of slot to set the icon
* **fab:** use icon prop instead vs slot to set material icon content
* **button:** href abd icon props removed



<a name="0.0.40"></a>
## [0.0.40](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.39...v0.0.40) (2017-09-29)


### Features

* **changelog:** moving to angular git commit convention ([e07d5ab](https://github.com/stasson/vue-mdc-adapter/commit/e07d5ab)), closes [#71](https://github.com/stasson/vue-mdc-adapter/issues/71)



<a name="0.0.39"></a>
## [0.0.39](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.38...v0.0.39) (2017-09-19)

### BREAKING CHANGES

* **button:** remove button primary and accent prop as per MDC 0.21.0


<a name="0.0.38"></a>
## [0.0.38](https://github.com/stasson/vue-mdc-adapter/compare/v0.0.37...v0.0.38) (2017-09-10)


### BREAKING CHANGES

* **fab:** fab can not be disabled mdc@^0.20.0



