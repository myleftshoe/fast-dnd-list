import Draggable from './Draggable';

export default function (container, props) {

    let draggable;
    let draggableIndex;
    let placeholderIndex;
    let elements;
    let elementCache;
    let rafId;
    let isHolding;

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

            isHolding = setTimeout(() => {
                isHolding = undefined;
                draggable.grasp();
            }, 300);

            // Get everything ready before isHolding fires

            elements = Array.prototype.slice.call(container.children);
            // [...container.children], container.children.slice(), Array.from
            // do not work in ms edge.

            draggableIndex = elements.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elements.splice(draggableIndex, 1);

            populateElementCache();

        },

        move(e) {

            if (prevent()) return;

            rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            const [x, y] = [e.touches[0].clientX, e.touches[0].clientY];

            // Allows auto scroll to continue when draggable is held in same place
            function repeatUntilNextTouchMove() {

                const [scrollTop, scrollOffset] = getScrollValue();

                container.scrollTop = scrollTop;
                // scrollable.scrollBy(0, offset) does not work on MS Edge mobile

                draggable.position = [x, y + scrollTop];

                const { direction, dimensions: { height } } = draggable;
                const draggableCenterY = draggable.absoluteCenter[1];

                if (direction === 'down') {
                    for (placeholderIndex; placeholderIndex < elements.length; placeholderIndex++) {
                        const element = elementCache[placeholderIndex];
                        if (element.top > draggableCenterY) break;
                        element.top -= height;
                        element.translateY -= height;
                        shift(element);
                    }
                }
                else if (direction === 'up') {
                    for (placeholderIndex; placeholderIndex > 0; placeholderIndex--) {
                        const element = elementCache[placeholderIndex - 1];
                        const bottom = element.top + element.height;
                        if (bottom < draggableCenterY) break;
                        element.top += height;
                        element.translateY += height;
                        shift(element);
                    }
                }

                if (placeholderIndex <= 0 || placeholderIndex >= elementCache.length || scrollOffset === 0)
                    cancelAnimationFrame(rafId);
                else
                    rafId = requestAnimationFrame(repeatUntilNextTouchMove);
            }

            function shift({ element, translateY = 0 }) {
                element.style.willChange = 'transform';
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${translateY}px)`;
            }

        },

        async release(e) {

            if (prevent()) return {};

            await draggable.release(0, container.children[placeholderIndex].offsetTop);

            elements.forEach(element => {
                element.style.transition = null;
                element.style.transform = null;
            });

            return { oldIndex: draggableIndex, newIndex: placeholderIndex }
        }
    }

    function prevent() {

        if (isHolding) {
            clearTimeout(isHolding);
            isHolding = undefined;
            draggable = undefined;
        }

        if (!draggable) return true;

        cancelAnimationFrame(rafId);

        return false;
    }

    function getScrollValue() {

        // let scrollContainer = draggable.element.parentNode;
        // while (scrollContainer) {
        //     if (scrollContainer === document.body) break;
        //     if (scrollContainer.scrollHeight > scrollContainer.clientHeight && window.getComputedStyle(scrollContainer)['overflow-y'] !== 'visible') break;
        //     scrollContainer = scrollContainer.parentNode;
        // }
        // scrollContainer = scrollContainer || document.body;

        const triggerOffset = 80;
        let offset = 0;

        const scrollable = container;
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

        const top = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset / 4));

        return [top, offset];
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
