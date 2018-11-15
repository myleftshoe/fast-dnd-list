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

    const getDisplacement = () => [
        currentPosition[0] - startPosition[0],
        currentPosition[1] - startPosition[1],
    ];

    return {

        get element() { return element },

        trackPointer(pointerPosition) {
            currentPosition = pointerPosition;
            if (!startPosition)
                startPosition = currentPosition;
            const [x, y] = getDisplacement();
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

        async moveIntoPlace() {
            if (currentPosition === startPosition)
                return Promise.resolve();
            const event = fireAndForget(element, "transitionend");
            element.style.transition = transitions.moveIntoPlace;
            element.style.transform = null;
            await event;
            return event;
        },

        async settleIntoPlace() {
            const event = fireAndForget(element, "transitionend");
            element.classList.remove(props.dragClassName);
            element.classList.remove('shadow');
            element.style.transition = transitions.settleIntoPlace;
            await event;
            element.style.transition = null;
        },

        async release() {
            await this.moveIntoPlace();
            this.settleIntoPlace();
            element.style.pointerEvents = 'auto';
            element.style.zIndex = 0;
        }
    }
}
