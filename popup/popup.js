new Vue({
  el: "#app",
  data: {
    pagesRaw: {},
    message: "hi",
  },
  computed: {
    pages() {
      return Object.keys(this.pagesRaw).map((e) => ({
        host: e,
        distance: this.pagesRaw[e],
      }));
    },
  },
  created: async function () {
    this.pagesRaw = (await browser.storage.local.get("data")).data;

    browser.storage.onChanged.addListener((e) => {
      if (e.data) {
        this.pagesRaw = e.data.newValue || {};
      }
    });
  },
});
