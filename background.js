browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(({ page }) => {
    console.log(`Someone scrolled on ${page}!`);
  });
});
