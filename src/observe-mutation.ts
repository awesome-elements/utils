const observerMap = new Map<Node, MutationObserver>();

export function observeMutation(
  target: Node,
  handlers: ((record: MutationRecord) => void)[],
  options?: MutationObserverInit
) {
  tryDisconnectObserver(target);
  const mutationObserver = new MutationObserver((entries) => {
    entries.forEach((record) => {
      handlers.forEach((handler) => handler.call(this, record));
    });
  });
  observerMap.set(target, mutationObserver);
  mutationObserver.observe(target, options);
}

export function unobserveMutation(target: Node) {
  tryDisconnectObserver(target);
}

function tryDisconnectObserver(target: Node) {
  const existingObserver = observerMap.get(target);
  if (existingObserver) {
    existingObserver.disconnect();
    observerMap.delete(target);
  }
}
