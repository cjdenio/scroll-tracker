import browser from "webextension-polyfill";

let port = browser.runtime.connect();

port.onMessage.addListener((m) => console.log(m));

let previousPosition = pageYOffset;

document.body.onscroll = () => {
  port.postMessage({
    page: location.host,
    distance: Math.ceil(Math.abs(pageYOffset - previousPosition)),
  });
  previousPosition = pageYOffset;
};

port.onDisconnect.addListener((p) => {
  if (p.error) {
    console.log(`Disconnected due to an error: ${p.error.message}`);
  }
});
