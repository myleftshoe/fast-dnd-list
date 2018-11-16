import Draggable from './Draggable';

export default function (container, props) {

    let droppables;
    let draggable;
    let prevElementUnderDraggable;
    let minMoveY;
    let maxMoveY;

    const elementIndex = element => [...container.children].indexOf(element);

    function getElementUnderDraggable() {
        let result = { element: null, index: -1, isDroppable: false };
        const [cx, cy] = draggable.absoluteCenter;
        const element = document.elementFromPoint(cx, cy);
        const index = elementIndex(element);
        if (index > -1)
            result = { element, index, isDroppable: true }
        return result;
    }

    return {

        init(e) {
            if (e.target === container) return;
            draggable = new Draggable(e.target, props);
            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            draggable.grasp(draggable);

            prevElementUnderDraggable = { element: null, index: -1, isDroppable: false };;
            minMoveY = maxMoveY = 0;

            const zero = draggable.absoluteCenter[1];
            droppables = [];
            [...container.children].forEach((element, index) => {
                if (element !== draggable.element) {
                    const t = element.offsetTop;
                    const pos = t + (t < zero ? element.offsetHeight : 0) - zero;
                    droppables.push({ element, pos });
                }
            });
        },

        handleMove(e) {

            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];

            const elementUnderDraggable = getElementUnderDraggable();
            // console.log(elementUnderDraggable.element && elementUnderDraggable.element.innerText);

            if (elementUnderDraggable.isDroppable && elementUnderDraggable.element !== prevElementUnderDraggable.element) {
                prevElementUnderDraggable = elementUnderDraggable;
                return;
            }

            const move = draggable.displacement;
            if (move[1] < minMoveY) minMoveY = move[1];
            if (move[1] > maxMoveY) maxMoveY = move[1];

            const draggedOverDroppables = droppables.filter(d => d.pos > minMoveY && d.pos < maxMoveY);

            const height = draggable.dimensions.height;
            // console.log(height,droppables);
            draggedOverDroppables.forEach(d => {
                let off = 0;
                if (d.pos < 0 && move[1] < 0 && d.pos > move[1])
                    off = height;
                else if (d.pos > 0 && move[1] > 0 && d.pos < move[1])
                    off = -height;
                d.element.style['transition'] = 'transform .2s ease-in-out';
                d.element.style['transform'] = off ? `translateY(${off}px)` : '';
            })
        },

        async release(e) {
            const elementOffsetTop = prevElementUnderDraggable.element.offsetTop;
            const draggableOffsetTop = draggable.element.offsetTop;

            const transformMatrix = window.getComputedStyle(prevElementUnderDraggable.element).getPropertyValue('transform');
            const translateY = Number((transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0])[5]);

            let y = elementOffsetTop - draggableOffsetTop;
            if (translateY === 0) {
                let off = draggable.dimensions.height;
                if (elementOffsetTop > draggableOffsetTop)
                    off = -off;
                y = y + off;
            }

            await draggable.release(0, y);

            droppables.forEach(d => {
                d.element.style.transition = '';
                d.element.style.transform = '';
            })
            return { oldIndex: elementIndex(draggable.element), newIndex: prevElementUnderDraggable.index }
        }
    }
}