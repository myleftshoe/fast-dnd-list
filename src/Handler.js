import Draggable from './Draggable';

export default function (container, props) {

    let draggable;
    let draggableIndex;
    let placeholderIndex;
    let elements;
    let elementCache;

    function populateElementCache() {

        elementCache = [];

        const count = elements.length;
        for (let i = 0; i < count; i++) {
            const element = elements[i];
            elementCache.push({ element, top: element.offsetTop, height: element.offsetHeight, translateY: 0 });
        }
    }

    function printElementCache() {
        console.table(elementCache.map(element => {
            const { element: { innerText: item }, top, translateY } = element;
            return { item, top, translateY }
        }));
    }

    return {

        grasp(e) {

            if (e.target === container) return;

            draggable = new Draggable(e.target, props);
            draggable.grasp(draggable);

            // [...container.children], container.children.slice(), Array.from
            // do not work in ms edge.
            elements = Array.prototype.slice.call(container.children);

            draggableIndex = elements.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elements.splice(draggableIndex, 1);

            populateElementCache();

        },

        move(e) {
            if (!draggable) return;
            const position = [e.touches[0].clientX, e.touches[0].clientY];
            requestAnimationFrame(() => this.handleMove(position));
        },

        handleMove([x, y]) {

            const scrollAmount = scrollIfRequired();

            draggable.position = [x, y + scrollAmount];

            const { direction, dimensions: { height } } = draggable;

            const draggableCenterY = draggable.absoluteCenter[1];
            if (direction === 'down') {
                for (placeholderIndex; placeholderIndex < elements.length; placeholderIndex++) {
                    const element = elementCache[placeholderIndex];
                    if (element.top > draggableCenterY) break;
                    element.top -= height;
                    element.translateY -= height;
                    translate(element);
                }
            }
            else if (direction === 'up') {
                for (placeholderIndex; placeholderIndex > 0; placeholderIndex--) {
                    const element = elementCache[placeholderIndex - 1];
                    const bottom = element.top + element.height;
                    if (bottom < draggableCenterY) break;
                    element.top += height;
                    element.translateY += height;
                    translate(element);
                }
            }

            function translate({ element, translateY = 0 }) {
                element.style.willChange = 'transform';
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${translateY}px)`;
            }

        },

        async release(e) {

            // console.table([{ draggable: draggable.element.innerText, centerY: draggable.absoluteCenter[1], translateY: draggable.element.style.transform }])
            // printElementCache();

            if (!draggable) return { oldIndex: null, newIndex: null };

            const oldIndex = draggableIndex;
            const newIndex = placeholderIndex;

            await draggable.release(0, container.children[placeholderIndex].offsetTop);

            elements.forEach(element => {
                element.style.transition = null;
                element.style.transform = null;
            });

            return { oldIndex, newIndex }
        }
    }

    function scrollIfRequired() {

        let scrollContainer = draggable.element.parentNode;
        while (scrollContainer) {
            if (scrollContainer === document.body) break;
            if (scrollContainer.scrollHeight > scrollContainer.clientHeight && window.getComputedStyle(scrollContainer)['overflow-y'] !== 'visible') break;
            scrollContainer = scrollContainer.parentNode;
        }
        scrollContainer = scrollContainer || document.body;

        const triggerOffset = 40;
        let offset = 0;

        const scrollable = scrollContainer;
        const containerRect = scrollable.getBoundingClientRect();
        const targetRect = draggable.element.getBoundingClientRect();
        const bottomOffset = Math.min(containerRect.bottom, window.innerHeight) - targetRect.bottom;
        const topOffset = targetRect.top - Math.max(containerRect.top, 0);
        const maxScrollTop = container.scrollHeight - Math.min(scrollable.clientHeight, window.innerHeight);

        if (bottomOffset < triggerOffset) {
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        }
        else if (topOffset < triggerOffset) {
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);
        }
        const scrollAmount = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset));
        scrollable.scrollTop = scrollAmount;
        return scrollAmount;
    }

    function getComputedTranslation(element) {
        const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
        const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
        return [x, y]
    }

    function getTranslateY(element) {
        return Number((element.style.transform.match(/-?\d+/g) || [0])[1])
    }

}
