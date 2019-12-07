import { Window, Dispatcher } from '@ima/core';
import { Visibility } from '../../dist/atoms.client.cjs.js';

let visibility = new Visibility(new Window(), new Dispatcher());

export default visibility;
