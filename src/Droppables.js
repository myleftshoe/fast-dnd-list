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

    return droppables;
}