export * from './component-checker'

export function removeLocationHash() {
  return history.pushState('', document.title, window.location.pathname + window.location.search)
}
