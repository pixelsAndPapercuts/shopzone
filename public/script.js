const ROUTES = {
  checkout: "https://checkout.qafinmo.net",
};

const loading_styles = `
       .preload{
        width: 100%;
        height: 100%;
        background: transparent;
        display: flex;
        justify-content: center;
        position: fixed;
        align-items: center;
        inset: 0;
        z-index: 999;
    }
    
    
    .preload_container{
        height: 15px;
        width: 105px;
        display: flex;
        position: relative;
    }
    
    .preload_circle{
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: #00c9cc;
        margin-right: 30px;
    }
    
    .preload_container .preload_circle{
    animation: move 1s linear 0s infinite;
    }
    
    .preload_container .preload_circle:first-child {
        position: absolute;
        top: 0;
        left: 0;
        animation: grow 1s linear 0s infinite;
    }
    
    
    .preload_container .preload_circle:last-child {
        top: 0;
        right: 0;
        margin-right: 0;
        animation: grow 1s linear 0s infinite reverse;
    }
    
    
    @keyframes grow {
       0% {
            transform: scale(0,0);
            opacity: 0;
        }
        
        100% {
            transform: scale(1,1);
            opacity: 1;
        }
    }
    
    
    @keyframes move {
       0% {
            transform: translateX(0);
        }
        
        100% {
            transform: translateX(45px);
        }
    }
    `;

class FinmoCheckout {
  constructor(options = {}) {
    const { token } = options;
    this.token = token;
  }

  displayCheckout() {
    if (!this.token) {
      window.alert("Invalid checkout token!");
      return;
    }

    const overlay = createElement("div", { id: "finmo-overlay" });
    const frame = createElement("iframe", { id: "finmo-iframe" });

    const styleSheet = createElement("style", { innerText: loading_styles });
    const div1 = createElement("div", { className: "preload" });
    const div2 = createElement("div", { className: "preload_container" });
    const div3 = createElement("div", { className: "preload_circle" });
    const div4 = createElement("div", { className: "preload_circle" });
    const div5 = createElement("div", { className: "preload_circle" });
    const div6 = createElement("div", { className: "preload_circle" });
    overlay.appendChild(styleSheet);
    div2.append(div3, div4, div5, div6);
    div1.appendChild(div2);
    overlay.appendChild(div1);

    window.history.pushState(null, null, `${window.location.href}`);
    createEvent("message", receiveMessage);
    createEvent("popstate", preventBack);

    overlay.style.cssText =
      "min-height: 100%; transition: all 0.3s ease-out 0s; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6);z-index: 2147483647";
    frame.style.cssText =
      "opacity: 0; height: 100%; position: relative; background: none; display: block; border: 0px none transparent; margin: auto; padding: 0px; width: 100%";
    frame.src = `${ROUTES.checkout}/embedded?token=${this.token}`;

    frame.onload = function () {
      div1.remove();
      this.style.opacity = 1;
      let hostname = window.origin;
      if (hostname === "null") {
        hostname = "*";
      }
      const message = {
        hostname: hostname,
      };
      this.contentWindow.postMessage(message, ROUTES.checkout);
    };

    overlay.appendChild(frame);
    document.body.appendChild(overlay);
  }
}

function createEvent(event, callback) {
  window.addEventListener(event, (data) => callback(data));
}

function createElement(type, options = {}) {
  const { className, id, innerText } = options;
  const element = document.createElement(type);
  if (id) {
    element.setAttribute("id", id);
  }
  if (className) {
    element.className = className;
  }
  if (innerText) {
    element.innerText = innerText;
  }
  return element;
}

const preventBack = (e) => {
  e.preventDefault();
  const frame = document.getElementById("finmo-iframe");
  if (frame) {
    history.forward();
  }
  const message = {
    event: "CLOSE_FRAME",
  };
  frame.contentWindow.postMessage(message, ROUTES.checkout);
};

function receiveMessage(message) {
  if (message.origin !== ROUTES.checkout) {
    return;
  }
  const { data } = message;
  const { event, url } = data;

  switch (event) {
    case "CLOSE_FRAME":
    case "NOT_FOUND":
      history.go(0);
      window.removeEventListener("popstate", preventBack);
      const overlay = document.getElementById("finmo-overlay");
      overlay.remove();
    case "REDIRECT":
      if (url) {
        window.location.href = url;
      }

    default:
      return;
  }
}
