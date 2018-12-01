import Draggable from './Draggable';
import ElementCache from './ElementCache';

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

        grasp(element) {

            if (element === container || draggable) return;

            draggable = new Draggable(element, props);

            draggableIndex = children.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elementCache.removeAt(draggableIndex);

            isHolding = setTimeout(() => {
                isHolding = undefined;
                disableScrolling();
                draggable.grasp();
            }, 300);

        },

        move(x, y) {

            if (prevent()) return;

            rafId = requestAnimationFrame(repeatUntilNextTouchMove);

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
                element.style.willChange = 'transform';
                requestAnimationFrame(() => {
                    element.style['transition'] = 'transform .2s ease-in-out';
                    element.style['transform'] = `translateY(${translateY}px)`;
                    element.style.willChange = null;
                });
            }

        },

        release(e) {

            if (prevent()) return {};

            enableScrolling();

            // elementCache does not contain the draggable element => placeholderIndex will be out-of-range when dropping
            // in last position. In this case, get the new y position using offsetTop + offseHeight of the last element in
            // container.children (i.e. the bottom of the ). Bit of a hack I know.
            // Note: Was using only container.children, offsetTop (which works for last as well) but the draggable sometimes
            // jumoed on drop.

            const element = elementCache.get(placeholderIndex) || {
                top: container.children[placeholderIndex].offsetTop + container.children[placeholderIndex].offsetHeight
            }

            try { return { oldIndex: draggableIndex, newIndex: placeholderIndex } }

            finally {

                draggable.release(0, element.top - draggable.dimensions.height - scrollable.scrollTop + container.offsetTop);

                elementCache.resetStyles();
                draggable = undefined;

            }
        },
    }

    function disableScrolling() {
        scrollable.style.overflowY = 'hidden';
        // scrollable.style.touchAction = 'none';
        // scrollable.addEventListener('touchmove', preventDefault);
    }

    function enableScrolling() {
        scrollable.style.overflowY = 'scroll';
        // scrollable.style.touchAction = 'pan-y';
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
