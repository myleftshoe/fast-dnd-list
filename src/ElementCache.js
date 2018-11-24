export default function elementCache(elements) {

    const elementCache = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        elementCache.push({ element, top: element.offsetTop, height: element.offsetHeight, translateY: 0 });
    }

    return {

        get: index => elementCache[index],

        get count() { return elementCache.length },

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