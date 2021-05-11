const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
const detectedEvents = isTouch ? ['touchstart', 'click'] : ['click'];

const instances = [];

const funcIndexOf = (array, func) => {
  for (let index = array.length - 1; index >= 0; index -= 1) {
    if (func(array[index])) return index;
  }

  return -1;
};

const processDirectiveArguments = (bindingValue) => {
  const isFunction = typeof bindingValue === 'function';

  if (!isFunction && typeof bindingValue !== 'object') {
    throw new Error('v-click-outside: Binding value must be a function or an object');
  }

  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: bindingValue.middleware || ((isClickOutside) => isClickOutside),
    events: bindingValue.events || detectedEvents,
    active: isFunction && bindingValue.active === undefined ? true : !!bindingValue.active,
  };
};

const onEvent = ({
  el, event, handler, middleware,
}) => {
  const isClickOutside = event.target !== el && !el.contains(event.target);

  if (!isClickOutside) {
    return;
  }

  if (middleware(event, el)) {
    handler(event, el);
  }
};

const createInstance = (el, events, handler, middleware) => {
  const instance = {
    el,
    eventHandlers: events.map((eventName) => ({
      event: eventName,
      handler: (event) => onEvent({
        event, el, handler, middleware,
      }),
    })),
  };

  instances.push(instance);

  return instance;
};

const destroyInstance = (el) => {
  const instanceIndex = funcIndexOf(instances, (instance) => instance.el === el);

  if (instanceIndex === -1) {
    throw new Error(`unable to find a v-click-outside instance for el: ${el}`);
  }

  const instance = instances[instanceIndex];
  instance.eventHandlers.forEach(({ event, handler }) => document.removeEventListener(event, handler, true));
  instances.splice(instanceIndex, 1);
};

const bind = (el, { value }) => {
  const {
    events, handler, middleware, active,
  } = processDirectiveArguments(value);

  if (!active) {
    return;
  }

  const instance = createInstance(el, events, handler, middleware);

  instance.eventHandlers.forEach(({ event, handler: handlerEvent }) => {
    document.addEventListener(event, handlerEvent, true);
  });
};

const update = (el, { value }) => {
  const {
    events, handler, middleware, active,
  } = processDirectiveArguments(value);

  const instance = instances
    .find((instanceElement) => instanceElement.el === el) || createInstance(el, events, handler, middleware);

  if (!active) {
    destroyInstance(el);
    return;
  }

  instance.eventHandlers
    .forEach(({ event, handler: handlerEvent }) => document.removeEventListener(event, handlerEvent, true));

  instance.eventHandlers = events.map((eventName) => ({
    event: eventName,
    handler(event) {
      onEvent({
        event, el, handler, middleware,
      });
    },
  }));

  instance.eventHandlers.forEach(({ event, handler: handlerEvent }) => {
    document.addEventListener(event, handlerEvent, true);
  });
};

const directive = {
  bind,
  update,
  unbind: destroyInstance,
  instances,
};

export default directive;
