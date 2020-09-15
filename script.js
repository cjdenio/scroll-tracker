let port = browser.runtime.connect();

document.body.onscroll = () => {
  port.postMessage({ page: location.host });
};
