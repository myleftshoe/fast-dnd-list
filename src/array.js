export const move = (arr, removeFrom=null, insertAt=null) => {
    /*
        Adds item if removeFrom is null
        Removes item if insertAt is null
    */
    if (insertAt === removeFrom) return arr;
    if (isNaN(Number(removeFrom) || isNaN(Number(insertAt)))) return arr;

    let _arr = [...arr];

    const item = (removeFrom !== null) ? _arr.splice(removeFrom, 1)[0] : null;
    if (insertAt !== null) {
        _arr.splice(insertAt, 0, item);
    }

    return _arr;
  };

export const shuffle = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

export const reverse = arr => arr.slice().reverse();