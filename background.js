(async () => {
  let data = (await browser.storage.local.get("data"))["data"];
  console.log(data);

  browser.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(({ page, distance }) => {
      console.log(`Someone scrolled on ${page}!`);
      if (!data[page]) {
        data[page] = distance;
      } else {
        data[page] += distance;
      }
    });
  });

  setInterval(async () => {
    await browser.storage.local.set({ data });
    console.log("saved");
  }, 1000);

  browser.storage.onChanged.addListener((e) => {
    console.log("stuffs changed: ", e);
    data = e.data?.newValue || {};
  });
})();
