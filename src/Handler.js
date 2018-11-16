import Draggable from './Draggable';

export default function(container, props) {

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
            draggable.trackPointer([e.touches[0].clientX, e.touches[0].clientY]);
            draggable.grasp(draggable);

            prevElementUnderDraggable = { element: null, index: -1, isDroppable: false };;
            minMoveY = maxMoveY = 0;

            const zero = draggable.absoluteCenter[1];
            droppables = [];
            [...container.children].forEach((node, index) => {
                if (node !== draggable.element) {
                    const t = node.offsetTop;
                    const pos = t + (t < zero ? node.offsetHeight : 0) - zero;
                    console.log(node.offsetHeight, t, zero);
                    droppables.push({node, pos});
                }
            });
        },

        handleMove(e) {

            draggable.trackPointer([e.touches[0].clientX, e.touches[0].clientY]);

            const elementUnderDraggable = getElementUnderDraggable();
            console.log(elementUnderDraggable.element && elementUnderDraggable.element.innerText);

            if (elementUnderDraggable.isDroppable && elementUnderDraggable.element !== prevElementUnderDraggable.element) {
                prevElementUnderDraggable = elementUnderDraggable;
                return;
            }

            const move = draggable.displacement;
            if (move[1] < minMoveY) minMoveY = move[1];
            if (move[1] > maxMoveY) maxMoveY = move[1];

            const draggedOverNodes = droppables.filter(d => d.pos > minMoveY && d.pos < maxMoveY);

            const height = draggable.dimensions.height;
            // console.log(height,droppables);
            draggedOverNodes.forEach(o => {
                let off = 0;
                if (o.pos < 0 && move[1] < 0 && o.pos > move[1])
                    off = height;
                else if (o.pos > 0 && move[1] > 0 && o.pos < move[1])
                    off = -height;
                o.node.style['transition'] = 'transform .2s ease-in-out';
                o.node.style['transform'] = off ? `translateY(${off}px)` : '';
                // console.log(o.node.innerText, o.node.style.transition);
            })
        },

        release(e) {
            console.log(droppables);
            const elementOffsetTop = prevElementUnderDraggable.element.offsetTop;
            const draggableOffsetTop = draggable.element.offsetTop;
            console.log(elementOffsetTop, draggableOffsetTop);
            droppables.forEach(d => {
                d.node.style.transition = '';
                // d.node.style.transform = '';
            })

            draggable.release(0 , elementOffsetTop - draggableOffsetTop);
            return { oldIndex: elementIndex(draggable.element), newIndex: prevElementUnderDraggable.index }
        }
    }
}