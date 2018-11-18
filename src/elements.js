export const getChildIndex = (parent, element) => [...parent.children].indexOf(element);

export function getElementTranslation(element) {
    const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
    const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
    return [x, y]
}
