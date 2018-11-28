import './Draggable.css';
import { fireAndForget } from './events';
import 'web-animations-js/web-animations.min';

const transitions = {
    grasp: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out',
    moveIntoPlace: 'transform .2s ease-in-out',
    settleIntoPlace: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out'
}

export default function Draggable(element, props) {

    let startPosition = null;
    let currentPosition = null;
    let direction = null;

    const { offsetLeft: left, offsetTop: top, offsetHeight: height, offsetWidth: width } = element;
    const { marginTop, marginBottom, marginLeft, marginRight } = window.getComputedStyle(element);

    const initialCenter = [left + width / 2, top + height / 2];
    const dimensions = {
        width: width + Math.max(parseInt(marginLeft), parseInt(marginRight)),
        height: height + Math.max(parseInt(marginTop), parseInt(marginBottom)),
    }

    return {

        get element() { return element },

        get direction() { return direction },

        get displacement() {
            return [
                currentPosition[0] - startPosition[0],
                currentPosition[1] - startPosition[1],
            ]
        },

        get dimensions() { return dimensions },

        get absoluteCenter() {
            return [initialCenter[0] + this.displacement[0], initialCenter[1] + this.displacement[1]];
        },

        // get absoluteCenter() {
        //     const { left, top, height, width } = element.getBoundingClientRect();
        //     return [left + width / 2, top + height / 2];
        //     // return [element.offsetLeft + this.dimensions.width / 2, element.offsetTop + this.dimensions.height / 2];
        // },

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
            element.style.transform = `translate(${x}px,${y}px)`;
        },

        get position() { return currentPosition },

        grasp() {
            element.style.willChange = 'transform';
            element.style.zIndex = 999;
            // element.style.pointerEvents = 'none';
            element.style.position = 'relative';
            element.style.transition = transitions.grasp;
            element.classList.add(props.dragClassName);
            props.raised && element.classList.add('shadow');
        },

        async moveIntoPlace(x, y) {
            if (currentPosition === startPosition)
                return Promise.resolve();
            const event = fireAndForget(element, "transitionend");
            requestAnimationFrame(() => {
                element.style.transition = transitions.moveIntoPlace;
                element.style.transform = `translate(0px,${y - element.offsetTop}px)`;
            });
            await event;
            return event;
        },

        async settleIntoPlace() {
            const event = fireAndForget(element, "transitionend");
            requestAnimationFrame(() => {
                element.classList.remove(props.dragClassName);
                element.classList.remove('shadow');
                element.style.transition = transitions.settleIntoPlace;
            });
            await event;
        },

        async release(x, y) {
            await this.moveIntoPlace(x, y);
            await this.settleIntoPlace();
            element.style.position = null;
            // element.style.pointerEvents = null;
            element.style.zIndex = null;
            element.style.transition = null;
            element.style.transform = null;
        }
    }
}
