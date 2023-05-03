const createpayment = () => {
  const body = document.getElementById("test_body");
  const div = document.getElementById("test_div");
  const token = div.getAttribute("data-checkout-token");
  const overlay = document.createElement("div");

  const frame = document.createElement("iframe");

  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event) {
    console.log("hello1");
    if (event.origin !== "http://localhost:3002") {
      return;
    }
    console.log("Received message from child: " + event.data);
    if (event.data === "CLOSE_FRAME") {
      overlay.remove();
    } else if (event.data.event === "REDIRECT") {
      console.log("REDIRECT RECEIVED", event.data.url, event.data.event);
      window.location.href = event.data.url;
    }
  }

  frame.style.cssText =
    "opacity: 0; height: 100%; position: relative; background: none; display: block; border: 0px none transparent; margin: auto; padding: 0px; z-index: 99999; width: 100%";
  frame.src = `http://localhost:3002/embedded/?token=${token}`;

  frame.onload = function () {
    this.style.opacity = 1;
    const data = {
      hostname: window.location.hostname,
      handler: false,
    };

    frame.contentWindow.postMessage(data, "*");
  };
  // frame.setAttribute("sandbox", "allow-scripts");

  overlay.appendChild(frame);
  overlay.style.cssText =
    "min-height: 100%; transition: all 0.3s ease-out 0s; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6);";

  body.appendChild(overlay);
};

printsomething = () => {
  console.log("HELLO WORLD");
};
