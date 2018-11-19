import Draggable from './Draggable';
import Droppables from './Droppables';
import { getChildIndex, getElementTranslation } from './elements';

//------------------------------------------------------------------------------

export default function (container, props) {

    let droppables;
    let draggable;
    let last;

    return {

        grasp(e) {

            if (e.target === container) return;

            draggable = new Draggable(e.target, props);
            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            draggable.grasp(draggable);

            droppables = new Droppables(container, draggable);

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

            const oldIndex = getChildIndex(container, draggable.element);
            const newIndex = getChildIndex(container, last.element);

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
}
