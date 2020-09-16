let port = browser.runtime.connect();

let previousPosition = pageYOffset;

document.body.onscroll = (e) => {
  port.postMessage({
    page: location.host,
    distance: Math.ceil(Math.abs(pageYOffset - previousPosition)),
  });
  previousPosition = pageYOffset;
};
