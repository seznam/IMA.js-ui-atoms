import { ComponentPositions } from '../../dist/atoms.client.cjs.js';
import _window from './windowMock';
import _userAgent from './userAgentMock';

let componentPositions = new ComponentPositions(_window, _userAgent);

export default componentPositions;
