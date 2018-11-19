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

            const elementUnderDraggable = droppables.getElementUnderDraggable();

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

}
