export default function Container(element) {

    return {

        get element() { return element },

        get geometry() {
            return {
                left: element.offsetLeft,
                top: element.offsetTop,
                right: element.offsetLeft + element.offsetWidth,
                bottom: element.offsetTop + element.offsetHeight,
                height: element.offsetHeight,
                width: element.offsetWidth,
            }
        }
    }
}
