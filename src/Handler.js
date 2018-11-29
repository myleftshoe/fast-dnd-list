import Draggable from './Draggable';
import ElementCache from './ElementCache';
// import { preventDefault } from './events';

export default function (container, props) {

    const scrollable = container.parentNode;
    let draggable;
    let draggableIndex;
    let placeholderIndex;
    const children = Array.from(container.children);
    let elementCache = new ElementCache(children);
    let rafId;
    let isHolding;

    return {

        async grasp(e) {

            if (e.target === container || draggable) return;

            draggable = new Draggable(e.target, props);

            draggableIndex = children.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elementCache.removeAt(draggableIndex);

            isHolding = setTimeout(() => {
                isHolding = undefined;
                disableScrolling();
                draggable.grasp();
            }, 300);

        },

        move(e) {

            if (prevent()) return;

            rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            const [x, y] = [e.touches[0].clientX, e.touches[0].clientY];

            // Allows auto scroll to continue when draggable is held in same place
            function repeatUntilNextTouchMove() {

                const [scrollTop, scrollOffset] = getScrollValue();
                scrollable.scrollTop = scrollTop;
                draggable.position = [x, y + scrollTop];

                const { direction, dimensions: { height }, absoluteCenter: [, centerY] } = draggable;

                if (direction === 'down') {
                    for (placeholderIndex; placeholderIndex < elementCache.count; placeholderIndex++) {
                        const element = elementCache.get(placeholderIndex);
                        if (element.top > centerY) break;
                        element.top -= height;
                        element.translateY -= height;
                        shift(element);
                    }
                }
                else if (direction === 'up') {
                    for (placeholderIndex; placeholderIndex > 0; placeholderIndex--) {
                        const element = elementCache.get(placeholderIndex - 1);
                        const bottom = element.top + element.height;
                        if (bottom < centerY) break;
                        element.top += height;
                        element.translateY += height;
                        shift(element);
                    }
                }

                if (placeholderIndex <= 0 || placeholderIndex >= elementCache.count || scrollOffset === 0)
                    cancelAnimationFrame(rafId);
                else
                    rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            }

            function shift({ element, translateY = 0 }) {
                // element.style.willChange = 'transform';
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${translateY}px)`;
            }

        },

        release(e) {

            if (prevent()) return {};

            enableScrolling();

            try { return { oldIndex: draggableIndex, newIndex: placeholderIndex } }

            finally {

                let unequalHeightAdjustment = 0;
                if (draggable.direction === 'down')
                    unequalHeightAdjustment = children[placeholderIndex].offsetHeight - draggable.element.offsetHeight;

                draggable.release(0, children[placeholderIndex].offsetTop + unequalHeightAdjustment - scrollable.scrollTop + container.offsetTop);

                elementCache.resetStyles();
                draggable = undefined;

            }
        },
    }

    function disableScrolling() {
        scrollable.style.overflowY = 'hidden';
        // scrollable.addEventListener('touchmove', preventDefault);
    }

    function enableScrolling() {
        scrollable.style.overflowY = 'scroll';
        // scrollable.removeEventListener('touchmove', preventDefault);
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
        const speedMultiplier = 0.25;

        const scrollableRect = scrollable.getBoundingClientRect();
        const targetRect = draggable.element.getBoundingClientRect();
        const bottomOffset = Math.min(scrollableRect.bottom, window.innerHeight) - targetRect.bottom;
        const topOffset = targetRect.top - Math.max(scrollableRect.top, 0);
        const maxScrollTop = scrollable.scrollHeight - Math.min(scrollable.clientHeight, window.innerHeight);

        let offset = 0;
        if (bottomOffset < triggerOffset)
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        else if (topOffset < triggerOffset)
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);

        const top = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset * speedMultiplier));

        return [top, offset];
    }

}
