import Draggable from './Draggable';
import ElementCache from './ElementCache';
import clamp from './utils/math.clamp';

export default function (container, props) {

    const scrollable = container.parentNode;
    let draggable;
    let draggableIndex;
    let placeholderIndex;
    const children = Array.from(container.children);
    let elementCache = new ElementCache(children);
    let rafId;
    let isHolding;

    const scrollableVisibleTop = function () {
        const windowScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        return container.offsetTop - windowScrollY - scrollable.scrollTop
    }

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
                        element.translateY -= height;
                        shift(element);
                    }
                }
                else if (direction === 'up') {
                    for (placeholderIndex; placeholderIndex > 0; placeholderIndex--) {
                        const element = elementCache.get(placeholderIndex - 1);
                        const bottom = element.top + element.height;
                        if (bottom < centerY) break;
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
                // requestAnimationFrame(() => {
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${translateY}px)`;
                //     element.style.willChange = null;
                // });
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

            // Do the drop animation after reordering
            finally {

                draggable.release(0, element.top - draggable.dimensions.height + scrollableVisibleTop());

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

        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const bottomOffset = clientHeight - triggerOffset;
        const topOffset = triggerOffset;
        // const maxScrollTop = scrollHeight - Math.min(clientHeight, window.innerHeight);

        const draggableY = clamp(draggable.absoluteCenter[1] - scrollTop, 0, clientHeight);

        let offset = 0;
        if (draggableY > bottomOffset)
            offset = draggableY - bottomOffset;
        else if (draggableY < topOffset)
            offset = draggableY - topOffset;

        const top = scrollTop + offset * speedMultiplier;

        return [top, offset];
    }

}
