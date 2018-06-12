import { toMockedInstance } from 'to-mock';
import Window from 'ima/window/Window';

export default toMockedInstance(Window, {
  getWindow() {
    return {
      innerWidth: 1024,
      innerHeight: 768
    };
  },
  isClient: () => true
});
