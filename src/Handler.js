import Draggable from './Draggable';

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

            prevDirection = null;
            prevElementUnderDraggable = draggable.element;

            initDroppables();
        },


        handleMove(e) {

            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];

            const elementUnderDraggable = getElementUnderDraggable();

            if (elementUnderDraggable) {
                if (elementUnderDraggable !== prevElementUnderDraggable || draggable.direction !== prevDirection) {
                    prevElementUnderDraggable = elementUnderDraggable;
                    prevDirection = draggable.direction;
                    translateDroppables();
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
                resetDroppables();
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

    function translateDroppables() {

        const [, y] = draggable.displacement;
        const height = draggable.dimensions.height;
        const { minMoveY, maxMoveY } = draggable;

        function translateDroppable(d) {
            let off = 0;
            if (d.pos < 0 && y < 0 && d.pos >= y)
                off = height;
            else if (d.pos > 0 && y > 0 && d.pos <= y)
                off = -height;
            d.element.style['transition'] = 'transform .2s ease-in-out';
            d.element.style['transform'] = off ? `translateY(${off}px)` : '';
        }

        // Only translate affected droppables, i.e. those that were dragged over
        const wasDraggedOver = droppable => droppable.pos >= minMoveY && droppable.pos <= maxMoveY;

        droppables
            .filter(wasDraggedOver)
            .forEach(translateDroppable);
    }

    function initDroppables() {
        const zero = draggable.absoluteCenter[1];
        droppables = [];
        [...container.children].forEach((element, index) => {
            if (element !== draggable.element) {
                const t = element.offsetTop;
                const pos = t + (t < zero ? element.offsetHeight : 0) - zero;
                droppables.push({ element, pos });
            }
        });
    }

    function resetDroppables() {
        droppables.forEach(d => {
            d.element.style.transition = '';
            d.element.style.transform = '';
        });
    }

    function getElementUnderDraggable() {
        let element = null;
        const [cx, cy] = draggable.absoluteCenter;
        element = document.elementFromPoint(cx, cy);
        if (elementIndex(element) < 0)
            element = null;
        return element;
    }

}
