export function observeMutation(
  element: HTMLElement,
  handlers: ((record: MutationRecord) => void)[],
  options?: MutationObserverInit
) {
  const mutationObserver = new MutationObserver((entries) => {
    entries.forEach((record) => {
      handlers.forEach((handler) => handler.call(this, record));
    });
  });
  mutationObserver.observe(element, options);
}
