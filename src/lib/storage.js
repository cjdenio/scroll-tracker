import browser from "webextension-polyfill";
import { DateTime } from "luxon";

function processEntries(data) {
  return Object.keys(data)
    .map((e) => ({
      site: e,
      distance: data[e],
    }))
    .sort((a, b) => b.distance - a.distance);
}

export async function getTodaysEntries() {
  const data = (await browser.storage.local.get("data")) || {};
  const today = DateTime.local().toISODate();

  const entries = data.data[today] || {};

  return processEntries(entries);
}

export async function clearAllData() {
  //await browser.storage.local.set({ data: {} });
  await browser.runtime.sendMessage("clear");
}

export async function getAllDays() {
  const data = (await browser.storage.local.get("data")) || {};
  return Object.keys(data.data)
    .map((i) => ({
      date: DateTime.fromISO(i).toLocaleString(DateTime.DATE_FULL),
      iso: i,
      entries: processEntries(data.data[i]),
    }))
    .sort((a, b) => {
      return a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0;
    });
}

export async function getDay(day) {
  const data = (await browser.storage.local.get("data")) || {};
  return processEntries(data.data[day] || {});
}

export function getTotalPx(entries) {
  return entries.reduce((acc, curr) => {
    return acc + curr.distance;
  }, 0);
}
