import { UIComponentHelper } from '../../dist/main.js';
import componentPositions from './componentPositions';
import _router from './routerMock';
import _window from './windowMock';
import visibility from './visibility';
import classnames from 'classnames';
import { Infinite } from 'infinite-circle';

let uiComponentHelper = new UIComponentHelper(
  _router,
  _window,
  componentPositions,
  visibility,
  new Infinite(),
  classnames
);

uiComponentHelper.init();

export default uiComponentHelper;
