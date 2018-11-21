import Draggable from './Draggable';

export default function (container, props) {

    let draggable;
    let draggableIndex;
    let placeholderIndex;
    let initialDirection;
    let elements;
    let lastElement;

    return {

        grasp(e) {

            if (e.target === container) return;

            draggable = new Draggable(e.target, props);
            draggable.grasp(draggable);

            // [...container.children], container.children.slice(), Array.from
            // do not work in ms edge.
            elements = Array.prototype.slice.call(container.children);

            draggableIndex = elements.indexOf(draggable.element);
            placeholderIndex = draggableIndex;

            elements.splice(draggableIndex, 1);

            lastElement = draggable.element;

        },

        move(e) {
            if (!draggable) return;
            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            requestAnimationFrame(this.handleMove);
        },

        handleMove(e) {

            // scrollIfRequired();

            const { direction, dimensions: { height } } = draggable;

            if (!initialDirection) initialDirection = direction;

            if (direction === 'down') {
                for (let i = placeholderIndex; i < elements.length; i++) {
                    const element = elements[i];
                    const top = element.getBoundingClientRect().top;
                    if (top > draggable.absoluteCenter[1]) break;
                    translate(element, -height)
                    lastElement = element;
                    placeholderIndex++;
                }
            }
            else if (direction === 'up') {
                for (let i = placeholderIndex - 1; i >= 0; i--) {
                    const element = elements[i];
                    const bottom = element.getBoundingClientRect().top + element.offsetHeight;
                    if (bottom < draggable.absoluteCenter[1]) break;
                    translate(element, height)
                    lastElement = element;
                    placeholderIndex--;
                }
            }

            function translate(element, y) {
                element.style.willChange = 'transform';
                element.style['transition'] = 'transform .2s ease-in-out';
                element.style['transform'] = `translateY(${y + getTranslateY(element)}px)`;
            }

        },

        async release(e) {

            if (!draggable) return { oldIndex: null, newIndex: null };

            const oldIndex = draggableIndex;
            const newIndex = placeholderIndex;

            await draggable.release(0, getFinalPosition());

            elements.forEach(element => {
                element.style.transition = null;
                element.style.transform = null;
            });

            return { oldIndex, newIndex }
        }
    }

    function scrollIfRequired() {

        let scrollContainer = draggable.element.parentNode;
        while (scrollContainer) {
            if (scrollContainer === document.body) break;
            if (scrollContainer.scrollHeight > scrollContainer.clientHeight && window.getComputedStyle(scrollContainer)['overflow-y'] !== 'visible') break;
            scrollContainer = scrollContainer.parentNode;
        }
        scrollContainer = scrollContainer || document.body;

        const triggerOffset = 40;
        let offset = 0;

        const scrollable = scrollContainer;
        const containerRect = scrollable.getBoundingClientRect();
        const targetRect = draggable.element.getBoundingClientRect();
        const bottomOffset = Math.min(containerRect.bottom, window.innerHeight) - targetRect.bottom;
        const topOffset = targetRect.top - Math.max(containerRect.top, 0);
        const maxScrollTop = container.scrollHeight - Math.min(scrollable.clientHeight, window.innerHeight);

        if (bottomOffset < triggerOffset) {
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        }
        else if (topOffset < triggerOffset) {
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);
        }
        // console.log(maxScrollTop, scrollable.scrollTop, offset);
        const scrollAmount = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset));
        console.log(scrollAmount, document.body.scrollTop);
        scrollable.scrollTop = scrollAmount;
        // console.log(scrollable, scrollable.scrollTop);
        // window.scrollTop = scrollAmount;
        // scrollable.scrollTop = scrollable.scrollTop + 10;
        // document.documentElement.scrollTop = document.documentElement.scrollTop + scrollAmount;
        // console.log(document.documentElement.scrollTop);
    }

    function getFinalPosition() {

        const elementOffsetTop = lastElement.offsetTop;
        const draggableOffsetTop = draggable.element.offsetTop;
        const [, translateY] = getComputedTranslation(lastElement);
        const { direction, dimensions: { height } } = draggable;

        let y = elementOffsetTop - draggableOffsetTop;

        if (!translateY && elementOffsetTop > draggableOffsetTop)
            y = y - height;
        if (!translateY && elementOffsetTop > draggableOffsetTop)
            y = y + height;

        if (initialDirection !== direction && direction === 'up' && placeholderIndex >= draggableIndex)
            y = y - height;
        if (initialDirection !== direction && direction === 'down' && placeholderIndex <= draggableIndex)
            y = y + height;

        return y;
    }

    function getComputedTranslation(element) {
        const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
        const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
        return [x, y]
    }

    function getTranslateY(element) {
        return Number((element.style.transform.match(/-?\d+/g) || [0])[0])
    }

}
