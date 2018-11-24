export function getComputedTranslation(element) {
    const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
    const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
    return [x, y]
}

export function getTranslateY(element) {
    return Number((element.style.transform.match(/-?\d+/g) || [0])[1])
}