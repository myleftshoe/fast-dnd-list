import { getChildIndex } from './elements';

export default function Droppables(container, draggable) {

    const droppables = [];
    const zero = draggable.absoluteCenter[1];
    [...container.children].forEach((element, index) => {
        if (element !== draggable.element) {
            const t = element.offsetTop;
            const pos = t + (t < zero ? element.offsetHeight : 0) - zero;
            droppables.push({ element, pos });
        }
    });

    return {

        translate() {

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
        },

        reset() {
            droppables.forEach(d => {
                d.element.style.transition = '';
                d.element.style.transform = '';
            });
        },

        getElementUnderDraggable() {
            let element = null;
            const [cx, cy] = draggable.absoluteCenter;
            element = document.elementFromPoint(cx, cy);
            if (getChildIndex(container, element) < 0)
                element = null;
            return element;
        }

    }

}