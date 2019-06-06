function whichTransitionEvent(el) {
    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (var i in transitions) {
        if (el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}

function getStyle(el,styleProp)
{
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el,null)[styleProp];
}

function returnOffsets(element) {
    if(element)
        return `${element.offsetLeft + element.offsetWidth/2}px ${element.offsetTop + element.offsetHeight/2}px`;

    return '50% 50%';
}

function setOffsets(element){
    if(element) {
        const {left, top} = returnOffsets(element);
        element.style.transformOrigin = `${left}px ${top}px`;
    }
}

var Transit =  function (element, callback, origin = null) {
        if (!element) {
            throw new Error("first argument not found.");
        }
          const width = element.offsetWidth;
          const height = element.offsetHeight;
          const wrapperSize = Math.ceil(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
          const wrapperLeft = Math.ceil(width - wrapperSize) / 2;
          const wrapperTop = Math.ceil(height - wrapperSize) / 2;
          const wrappedElm = document.createElement('div');

          wrappedElm.style.width = wrapperSize + "px";
          wrappedElm.style.height = wrapperSize + "px";
          wrappedElm.style.left = wrapperLeft + "px";
          wrappedElm.style.top = wrapperTop + "px";
          wrappedElm.style.backgroundColor = getStyle(element, 'backgroundColor');
          wrappedElm.style.borderRadius = "100%";
          wrappedElm.style.position = 'absolute';
          wrappedElm.id =`transit--overlap`;

          element.style.transformOrigin = returnOffsets(origin || null);
          element.appendChild(wrappedElm);
          
          if(typeof callback === 'function') {
            var transitionEvent = whichTransitionEvent(element);
            element.addEventListener(transitionEvent, function(event) {
                console.log(event);
                // if(event.propertyName === 'transform') {
                    callback(event);
                // }
            })
          }

        this.open = function(event) {
            element.classList.add('open');
        }

        this.close = function(event) {
            element.classList.remove('open');
        }
}