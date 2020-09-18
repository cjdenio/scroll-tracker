import browser from "webextension-polyfill";
import { DateTime } from "luxon";

(async () => {
  let data = (await browser.storage.local.get("data"))["data"] || {};
  console.log(data);

  browser.runtime.onConnect.addListener((port) => {
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

  setInterval(async () => {
    await browser.storage.local.set({ data });
  }, 1000);

  browser.storage.onChanged.addListener((e) => {
    data = e.data?.newValue || {};
  });
})();
