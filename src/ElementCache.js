export default function elementCache(elements) {

    const elementCache = elements.map(element => new Element(element));

    return {

        get: index => elementCache[index],

        find: element => elementCache.find(({ element: cachedElement }) => cachedElement === element),

        indexOf: element => elementCache.findIndex(({ element: cachedElement }) => cachedElement === element),

        get count() { return elementCache.length },

        removeAt(index) { elementCache.splice(index, 1) },

        resetStyles() {
            elementCache.forEach(({ element }) => {
                element.style.transition = null;
                element.style.transform = null;
            });
        },

        print() {
            console.table(elementCache.map(element => {
                const { element: { innerText: item }, top, translateY } = element;
                return { item, top, translateY }
            }));
        }
    }

}

function Element(element) {
    const { offsetTop, offsetHeight: height, translateY = 0 } = element;
    return {
        element,
        offsetTop,
        height,
        translateY,
        get top() { return this.offsetTop + this.translateY }
    }
}