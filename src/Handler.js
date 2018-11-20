import Draggable from './Draggable';
import { populateDroppables } from './Droppables';

//------------------------------------------------------------------------------

export default function (containerElement, props) {

    const container = {
        element: containerElement,
        indexOf: element => [...containerElement.children].indexOf(element),
        children: () => [...containerElement.children],
    }
    let droppables;
    let draggable;
    let last;

    return {

        grasp(e) {

            if (e.target === container.element) return;

            draggable = new Draggable(e.target, props);
            draggable.grasp(draggable);

            droppables = populateDroppables(container, draggable);

            last = { element: draggable.element, direction: null };

        },

        move(e) {

            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            scrollIfRequired();

            const elementUnderDraggable = getElementUnderDraggable();

            if (elementUnderDraggable) {
                if (elementUnderDraggable !== last.element || draggable.direction !== last.direction) {
                    last.element = elementUnderDraggable;
                    last.direction = draggable.direction;
                    droppables.translate();
                }
            }

        },

        async release(e) {

            const oldIndex = container.indexOf(draggable.element);
            const newIndex = container.indexOf(last.element);

            await draggable.release(0, getFinalPosition());

            droppables.reset();

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
        const maxScrollTop = container.element.scrollHeight - Math.min(scrollable.clientHeight, window.innerHeight);

        if (bottomOffset < triggerOffset) {
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        }
        else if (topOffset < triggerOffset) {
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);
        }
        // console.log(maxScrollTop, scrollable.scrollTop, offset);
        const scrollAmount = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset));
        console.log(scrollAmount, document.body.scrollTop);
        scrollable.scrollTop = scrollAmount;
        // console.log(scrollable, scrollable.scrollTop);
        // window.scrollTop = scrollAmount;
        // scrollable.scrollTop = scrollable.scrollTop + 10;
        // document.documentElement.scrollTop = document.documentElement.scrollTop + scrollAmount;
        // console.log(document.documentElement.scrollTop);
    }

    function getFinalPosition() {

        const elementOffsetTop = last.element.offsetTop;
        const draggableOffsetTop = draggable.element.offsetTop;

        const [, translateY] = getElementTranslation(last.element);

        let y = elementOffsetTop - draggableOffsetTop;
        if (translateY === 0) {
            let off = draggable.dimensions.height;
            if (elementOffsetTop > draggableOffsetTop)
                off = -off;
            y = y + off;
        }

        return y;
    }

    function getElementTranslation(element) {
        const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
        const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
        return [x, y]
    }

    function getElementUnderDraggable() {
        let element = null;
        const [cx, cy] = draggable.absoluteCenter;

        element = document.elementFromPoint(cx, cy);
        if (container.indexOf(element) < 0)
            element = null;

        return element;
    }

}
