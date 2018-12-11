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

    const margins = {
        top: parseInt(marginTop),
        bottom: parseInt(marginBottom),
        left: parseInt(marginLeft),
        right: parseInt(marginRight),
    };

    const initialCenter = [left + width / 2 + margins.left, top + height / 2 + margins.top];
    const dimensions = {
        width: width + Math.max(margins.left, margins.right),
        height: height + Math.max(margins.top, margins.bottom),
    }

    return {

        get element() { return element },

        get direction() { return direction },

        get displacement() {
            if (!currentPosition || !startPosition)
                return null;
            return [
                currentPosition[0] - startPosition[0],
                currentPosition[1] - startPosition[1],
            ]
        },

        get dimensions() { return dimensions },

        get center() {
            const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
            return clamp(this.absoluteCenter[1], 0, element.parentNode.clientHeight) - element.parentNode.scrollTop;
        },

        get absoluteCenter() {
            if (!this.displacement)
                return [initialCenter[0], initialCenter[1]];
            return [initialCenter[0] + this.displacement[0], initialCenter[1] + this.displacement[1]];
        },

        get margins() { return margins },

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
            element.style.transform = `translate3d(${x}px,${y}px,0px)`;
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

        moveIntoPlace(x, y) {
            return new Promise(resolve => {
                const { left, top } = element.getBoundingClientRect();
                const keyframes = [
                    { transform: `translate(${left - x - this.margins.left}px,${top - y}px)` },
                    { transform: `translate(${0}px,${0}px)` },
                ];
                const animation = element.animate(keyframes, {
                    duration: 200,
                    easing: 'ease-in-out',
                });
                animation.onfinish = () => {
                    // The animation does not preserve its end state ->
                    //  update the styles directly to reflect final state.
                    element.style.transition = null;
                    element.style.transform = `translate(${0}px,${0}px)`;
                    resolve();
                }
            });
            // Not supported in Chrome yet: (polyfill available but above Promise is simpler)
            // return animation.finished;
        },

        settleIntoPlace() {
            const event = fireAndForget(element, "transitionend");
            requestAnimationFrame(() => {
                element.classList.remove(props.dragClassName);
                element.classList.remove('shadow');
                element.style.transition = transitions.settleIntoPlace;
            });
            return event;
        },

        async release(x, y) {
            await this.moveIntoPlace(x, y);
            await this.settleIntoPlace();
            element.style.zIndex = null;
            element.style.transition = null;
            element.style.transform = null;
        }
    }
}
