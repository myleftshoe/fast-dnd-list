export function preventDefault(e) { e.preventDefault() }
export function stopPropagation(e) { e.stopPropagation() }

export function fireAndForget(target, eventName) {
    return new Promise((resolve, reject) => {
        const handler = ({ target }) => {
            target.removeEventListener(eventName, handler, false);
            resolve();
        }
        target.addEventListener(eventName, handler, false);
    })
}
