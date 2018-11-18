import Draggable from './Draggable';
import Droppables from './Droppables';
import { getChildIndex, getElementTranslation } from './elements';

export default function (container, props) {

    let droppables;
    let draggable;
    let prevDirection;
    let prevElementUnderDraggable;

    return {

        init(e) {

            if (e.target === container) return;

            draggable = new Draggable(e.target, props);
            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            draggable.grasp(draggable);

            droppables = new Droppables(container, draggable);

            prevDirection = null;
            prevElementUnderDraggable = null;

        },

        handleMove(e) {

            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];

            const elementUnderDraggable = droppables.getElementUnderDraggable();

            if (elementUnderDraggable) {
                if (elementUnderDraggable !== prevElementUnderDraggable || draggable.direction !== prevDirection) {
                    prevElementUnderDraggable = elementUnderDraggable;
                    prevDirection = draggable.direction;
                    droppables.translate();
                }
            }

        },

        async release(e) {

            const oldIndex = getChildIndex(container, draggable.element);
            const newIndex = getChildIndex(container, prevElementUnderDraggable);

            await draggable.release(0, getFinalPosition());

            droppables.reset();

            return { oldIndex, newIndex }
        }
    }

    //------------------------------------------------------------------------------

    function getFinalPosition() {

        const elementOffsetTop = prevElementUnderDraggable.offsetTop;
        const draggableOffsetTop = draggable.element.offsetTop;

        const [, translateY] = getElementTranslation(prevElementUnderDraggable);

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
