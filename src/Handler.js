import Draggable from './Draggable';
import Droppables from './Droppables';

export default function (container, props) {

    let droppables;
    let draggable;
    let prevDirection;
    let prevElementUnderDraggable;

    const elementIndex = element => [...container.children].indexOf(element);

    return {

        init(e) {

            if (e.target === container) return;

            draggable = new Draggable(e.target, props);
            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            draggable.grasp(draggable);

            droppables = new Droppables(container, draggable);

            prevDirection = null;
            prevElementUnderDraggable = draggable.element;

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

            const oldIndex = elementIndex(draggable.element);
            let newIndex = oldIndex;

            if (!prevElementUnderDraggable) {
                await draggable.release(0, 0);
            }
            else {
                newIndex = elementIndex(prevElementUnderDraggable);
                await draggable.release(0, getFinalPosition());
                droppables.reset();
            }

            return { oldIndex, newIndex }
        }
    }

    //------------------------------------------------------------------------------

    function getElementTranslation(element) {
        const transformMatrix = window.getComputedStyle(prevElementUnderDraggable).getPropertyValue('transform');
        const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
        return [x, y]
    }

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
