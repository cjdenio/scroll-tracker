import browser from "webextension-polyfill";
import { DateTime } from "luxon";

(async () => {
  let data = (await browser.storage.local.get("data"))["data"] || {};
  console.log(data);

  setInterval(async () => {
    await browser.storage.local.set({ data });
  }, 1000);

  browser.storage.onChanged.addListener((e) => {
    data = e.data?.newValue || {};
  });
})();

browser.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener((p) => {
    if (p.error) {
      console.log(`Disconnected due to an error: ${p.error.message}`);
    }
  });

  port.onMessage.addListener(({ page, distance }) => {
    console.log(`Someone scrolled on ${page}!`);
    const today = DateTime.local().toISODate();

    if (!data[today]) {
      data[today] = {
        [page]: distance,
      };
    } else if (!data[today][page]) {
      data[today][page] = distance;
    } else {
      data[today][page] += distance;
    }
  });
});

browser.runtime.onMessage.addListener(async (req, sender, ack) => {
  if (req == "clear") {
    console.log("clear");
    await browser.storage.local.set({ data: {} });
    console.log("actually clear");
    data = {};
    ack();
  }
});
