import Draggable from './Draggable';
import ElementCache from './ElementCache';
import clamp from './utils/math.clamp';

export default function (container, props) {

    const scrollable = container.parentNode;

    let draggable;
    let draggableIndex;

    let placeholderIndex;
    const elementCache = new ElementCache(Array.from(container.children));

    let rafId;
    let isHolding;

    const { scrollHeight, clientHeight } = scrollable;
    let scrollTop = scrollable.scrollTop;

    let lastCenterY = null;

    return {

        grasp(element) {

            if (element === container || draggable) return;

            draggable = new Draggable(element, props);

            draggableIndex = elementCache.indexOf(draggable.element);

            placeholderIndex = draggableIndex;

            // elementCache.removeAt(draggableIndex);

            isHolding = setTimeout(() => {
                isHolding = undefined;
                scrollTop = scrollable.scrollTop;
                disableScrolling();
                draggable.grasp();
            }, 300);

        },

        move(x, y) {

            if (prevent()) return;

            rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            // Allows auto scroll to continue when draggable is held in same place


            function repeatUntilNextTouchMove() {

                const { direction, dimensions: { height }, absoluteCenter: [, centerY] } = draggable;

                const autoscroll = autoScroll();

                draggable.position = [x, clamp(y + scrollTop, 0, scrollHeight - draggable.dimensions.height)];

                if (Math.trunc(centerY) === Math.trunc(lastCenterY)) return;
                lastCenterY = centerY;

                if (direction === 'down') {
                    for (placeholderIndex; placeholderIndex < elementCache.count - 1; placeholderIndex++) {
                        const element = elementCache.get(placeholderIndex);
                        if (element.element === draggable.element) continue;
                        if (element.top > centerY) break;
                        shift(element, -height);
                        element.translateY -= height;
                    }
                }
                else if (direction === 'up') {
                    for (placeholderIndex; placeholderIndex > 0; placeholderIndex--) {
                        const element = elementCache.get(placeholderIndex - 1);
                        if (element.element === draggable.element) continue;
                        const bottom = element.top + element.height;
                        if (bottom < centerY) break;
                        shift(element, height);
                        element.translateY += height;
                    }
                }

                if (autoscroll)
                    rafId = requestAnimationFrame(repeatUntilNextTouchMove);

            }

        },

        release(e) {

            if (prevent()) return null;

            enableScrolling();

            let targetY = elementCache.get(placeholderIndex).top + scrollableVisibleTop();

            if (placeholderIndex !== draggableIndex)
                targetY -= draggable.dimensions.height;

            try {

                if (placeholderIndex === draggableIndex) return null;

                return { indexes: [draggableIndex], toIndex: placeholderIndex }
            }
            // Do the drop animation after reordering
            finally {

                draggable.release(0, targetY);

                elementCache.resetStyles();
                draggable = undefined;

            }
        },
    }

    function scrollableVisibleTop() {
        const windowScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        return container.offsetTop - windowScrollY - scrollable.scrollTop
    }

    // Using animate prevents stutter of msEdge mobile when drag direction changed.
    function shift({ element, translateY = 0 }, distance) {

        const keyframes = [
            { transform: `translateY(${translateY}px)` },
            { transform: `translateY(${translateY + distance}px)` },
        ];
        const animation = element.animate(keyframes, {
            duration: 200,
            easing: 'ease-in-out',
            // fill: 'forwards'
        });
        animation.onfinish = () => {
            // The animation does not preserve its end state ->
            //  update the styles directly to reflect final state.
            element.style.transition = null;
            element.style.transform = `translateY(${translateY + distance}px)`;
        }
    }

    // function shift({ element, translateY = 0 }) {
    //     // element.style.willChange = 'transform';
    //     // requestAnimationFrame(() => {
    //     element.style['transition'] = 'transform .2s ease-in-out';
    //     element.style['transform'] = `translateY(${translateY}px)`;
    //     //     element.style.willChange = null;
    //     // });
    // }

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

    function autoScroll() {

        const triggerOffset = 100;
        const speedMultiplier = 0.25;

        const bottomOffset = clientHeight - triggerOffset + scrollTop;
        const topOffset = triggerOffset + scrollTop;

        const draggableY = draggable.absoluteCenter[1];

        let offset = 0;
        if (draggableY > bottomOffset)
            offset = draggableY - bottomOffset;
        else if (draggableY < topOffset && scrollTop > 0)
            offset = draggableY - topOffset;

        scrollTop = scrollTop + offset * speedMultiplier;
        scrollable.scrollTop = scrollTop;

        return Boolean(offset);
    }

}
