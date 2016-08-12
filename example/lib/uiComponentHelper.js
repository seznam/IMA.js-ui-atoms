import { UIComponentHelper } from '../../dist/main.js';
import _window from './windowMock';
import _router from './routerMock';

let uiComponentHelper = new UIComponentHelper(_router, _window);

export default uiComponentHelper;
