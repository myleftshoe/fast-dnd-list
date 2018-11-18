import './Draggable.css';
import { fireAndForget } from './utils';

const transitions = {
    grasp: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out',
    moveIntoPlace: 'transform .2s ease-in-out',
    settleIntoPlace: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out'
}

export default function Draggable(element, props) {

    let startPosition = null;
    let currentPosition = null;
    let direction = null;
    let minMoveY = 0;
    let maxMoveY = 0;

    return {

        get element() { return element },

        get direction() { return direction },

        get displacement() {
            return [
                currentPosition[0] - startPosition[0],
                currentPosition[1] - startPosition[1],
            ]
        },

        get minMoveY() { return minMoveY },
        get maxMoveY() { return maxMoveY },

        get dimensions() {
            const { marginTop, marginBottom, marginLeft, marginRight } = window.getComputedStyle(element);
            return {
                width: element.offsetWidth + Math.max(parseInt(marginLeft), parseInt(marginRight)),
                height: element.offsetHeight + Math.max(parseInt(marginTop), parseInt(marginBottom)),
            }
        },

        get absoluteCenter() {
            const { left, top, height, width } = element.getBoundingClientRect();
            return [left + width / 2, top + height / 2];
            // return [element.offsetLeft + this.dimensions.width / 2, element.offsetTop + this.dimensions.height / 2];
        },

        set position(position) {
            if (currentPosition) {
                if (position[1] < currentPosition[1])
                    direction = 'up';
                else
                    direction = 'down';
            }
            currentPosition = position;
            if (!startPosition)
                startPosition = currentPosition;
            const [x, y] = this.displacement;
            if (y < minMoveY) minMoveY = y;
            if (y > maxMoveY) maxMoveY = y;
            element.style.transform = `translate(${x}px,${y}px)`;
        },

        grasp() {
            element.style.zIndex = 999;
            element.style.pointerEvents = 'none';
            element.style.position = 'relative';
            element.style.transition = transitions.grasp;
            element.classList.add(props.dragClassName);
            props.raised && element.classList.add('shadow');
        },

        async moveIntoPlace(x, y) {
            if (currentPosition === startPosition)
                return Promise.resolve();
            const event = fireAndForget(element, "transitionend");
            element.style.transition = transitions.moveIntoPlace;
            element.style.transform = `translate(0px,${y}px)`;
            await event;
            return event;
        },

        async settleIntoPlace() {
            const event = fireAndForget(element, "transitionend");
            element.classList.remove(props.dragClassName);
            element.classList.remove('shadow');
            element.style.transition = transitions.settleIntoPlace;
            await event;
        },

        async release(x, y) {
            await this.moveIntoPlace(x, y);
            await this.settleIntoPlace();
            element.style.pointerEvents = 'auto';
            element.style.zIndex = 0;
            element.style.transition = null;
            element.style.transform = null;
        }
    }
}
