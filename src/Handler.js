import Draggable from './Draggable';
import ElementCache from './ElementCache';
import { preventDefault } from './events';

export default function (container, props) {

    let draggable;
    let draggableIndex;
    let placeholderIndex;
    let elementCache;
    let rafId;
    let isHolding;

    const delayGrasp = delay => setTimeout(() => {
        isHolding = undefined;
        disableScrolling();
        draggable.grasp();
    }, delay);

    return {

        grasp(e) {

            if (e.target === container || draggable) return;

            draggable = new Draggable(e.target, props);

            isHolding = delayGrasp(300);

            // Get everything ready before delay expires
            const elements = Array.from(container.children);

            draggableIndex = elements.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elements.splice(draggableIndex, 1);
            elementCache = new ElementCache(elements);

        },

        move(e) {

            if (prevent()) return;

            rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            const [x, y] = [e.touches[0].clientX, e.touches[0].clientY];

            // Allows auto scroll to continue when draggable is held in same place
            function repeatUntilNextTouchMove() {

                const [scrollTop, scrollOffset] = getScrollValue();
                container.scrollTop = scrollTop;
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
                element.style.willChange = 'transform';
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${translateY}px)`;
            }

        },

        async release(e) {

            if (prevent()) return {};

            enableScrolling();

            await draggable.release(0, container.children[placeholderIndex].offsetTop);

            elementCache.resetStyles();

            draggable = undefined;

            return { oldIndex: draggableIndex, newIndex: placeholderIndex }
        }
    }

    function disableScrolling() {
        container.addEventListener('touchmove', preventDefault);
    }

    function enableScrolling() {
        container.removeEventListener('touchmove', preventDefault);
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

        const containerRect = container.getBoundingClientRect();
        const targetRect = draggable.element.getBoundingClientRect();
        const bottomOffset = Math.min(containerRect.bottom, window.innerHeight) - targetRect.bottom;
        const topOffset = targetRect.top - Math.max(containerRect.top, 0);
        const maxScrollTop = container.scrollHeight - Math.min(container.clientHeight, window.innerHeight);

        let offset = 0;
        if (bottomOffset < triggerOffset)
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        else if (topOffset < triggerOffset)
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);

        const top = Math.max(0, Math.min(maxScrollTop, container.scrollTop + offset * speedMultiplier));

        return [top, offset];
    }

}
