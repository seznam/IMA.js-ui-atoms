import { Visibility } from '../../dist/main.js';

import Window from 'ima/window/ClientWindow';
import Dispatcher from 'ima/event/DispatcherImpl';

let visibility = new Visibility(new Window(), new Dispatcher());

export default visibility;
