import { UIComponentHelper } from '../../dist/main.js';
import componentPositions from './componentPositions';
import _router from './routerMock';
import visibility from './visibility';
import classnames from 'classnames';
import { Infinite } from 'infinite-circle';

let uiComponentHelper = new UIComponentHelper(_router, componentPositions, visibility, new Infinite(), classnames);

uiComponentHelper.init();

export default uiComponentHelper;
