function throttle(func, interval, scope) {
  if (arguments.length < 2) {
    interval = 100;
  }
  if (arguments.length < 3) {
    scope = null;
  }
  let timeout = null;
  let args = [];
  let shouldFireMethod = false;

  if (scope) {
    func = func.bind(scope);
  }

  function callCallback() {
    timeout = setTimeout(function() {
      timeout = null;
      if (shouldFireMethod) {
        shouldFireMethod = false;
        callCallback();
      }
    }, interval);
    func(...args);
  }

  return function() {
    let rest = [].slice.call(arguments);
    args = rest;

    if (!timeout) {
      callCallback();
    } else {
      shouldFireMethod = true;
    }
  };
}

export default throttle;
