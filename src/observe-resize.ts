const handlerMap = new Map<Element, ((entry: ResizeObserverEntry) => void)[]>();
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    handlerMap.get(entry.target)?.forEach((handler) => handler(entry));
  });
});

export function observeResize(
  target: Element,
  handlers: ((entry: ResizeObserverEntry) => void)[],
  options?: ResizeObserverOptions
) {
  if (handlerMap.size <= 0) {
    resizeObserver.disconnect();
  }
  handlerMap.set(target, handlers);
  resizeObserver.observe(target, options);
}

export function unobserveResize(target: Element) {
  resizeObserver.unobserve(target);
  handlerMap.delete(target);
}
