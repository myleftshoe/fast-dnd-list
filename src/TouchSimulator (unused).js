const touchStartOn = (el, x = 0, y = 0) => {
    let e;
    try {
        e = document.createEvent('TouchEvent')
        e.initTouchEvent("touchstart", true, true)
    }
    catch {
        try {
            e = document.createEvent('UIEvent')
            e.initUIEvent("touchstart", true, true)
        }
        catch {
            e = document.createEvent('Event')
            e.initEvent("touchstart", true, true)
        }
    }
    e.touches = [{
        clientX: x,
        clientY: y
    }];
    // e.prototype.addProperty()
    e.isDummy = true;
    el.dispatchEvent(e)
}

const touchEndOn = (el, x = 0, y = 0) => {
    let e;
    try {
        e = document.createEvent('TouchEvent')
        e.initTouchEvent("touchend", true, true)
    }
    catch {
        try {
            e = document.createEvent('UIEvent')
            e.initUIEvent("touchend", true, true)
        }
        catch {
            e = document.createEvent('Event')
            e.initEvent("touchend", true, true)
        }
    }
    e.touches = [{
        clientX: x,
        clientY: y
    }];
    e.isDummy = true;
    el.dispatchEvent(e)
}