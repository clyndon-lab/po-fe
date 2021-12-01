import { isValidElement } from 'react'

export function isClassComponent(component) {
  return typeof component === 'function' && !!component.prototype.isReactComponent
}

export function isFunctionComponent(component) {
  return typeof component === 'function' && String(component).includes('return React.createElement')
}

export function isReactComponent(component) {
  return isClassComponent(component) || isFunctionComponent(component)
}

export function isElement(element) {
  return isValidElement(element)
}

export function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string'
}

export function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'function'
}

export function isValidToolBar(toolbar) {
  return (
    isReactComponent(toolbar) ||
    isFunctionComponent(toolbar) ||
    isClassComponent(toolbar) ||
    isCompositeTypeElement(toolbar) ||
    isElement(toolbar)
  )
}