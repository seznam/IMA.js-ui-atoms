import { UIComponentHelper } from '../../dist/main.js';
import componentPositions from './componentPositions';
import _router from './routerMock';
import visibility from './visibility';

let uiComponentHelper = new UIComponentHelper(_router, componentPositions, visibility);

export default uiComponentHelper;
