import { UIComponentHelper } from '../../dist/main.js';
import componentPositions from './componentPositions';
import _router from './routerMock';
import visibility from './visibility';
import classnames from 'classnames';

let uiComponentHelper = new UIComponentHelper(_router, componentPositions, visibility, classnames);

export default uiComponentHelper;
