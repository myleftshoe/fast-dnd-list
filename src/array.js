export const move = (array, removeFrom = null, insertAt = null) => {

    // Adds item if removeFrom is null
    // Removes item if insertAt is null

    if (insertAt === removeFrom) return array;
    if (isNaN(Number(removeFrom) || isNaN(Number(insertAt)))) return array;

    let _array = [...array];

    const item = (removeFrom !== null) ? _array.splice(removeFrom, 1)[0] : null;
    if (insertAt !== null) {
        _array.splice(insertAt, 0, item);
    }

    return _array;
};

export const shuffle = array => array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

export const reverse = array => array.slice().reverse();

export function multiMove(array, indexes, toIndex) {

    const element = array[toIndex];
    const removedElements = array.filter((_, index) => indexes.includes(index));
    const remainingElements = array.filter((_, index) => !indexes.includes(index));
    const index = remainingElements.indexOf(element);

    if (index > -1)
        remainingElements.splice(index, 0, ...removedElements);
    else
        remainingElements.push(...removedElements);

    return remainingElements;

}

// export function _multiMove(array, indexes, toIndex) {
//     let result = array.slice();
//     indexes.forEach(removeFrom => { result = move(result, removeFrom, toIndex) });
//     return result;
// }