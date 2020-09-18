import React, { useEffect } from "react";
import useSWR from "swr";

import { ListGroup, ListGroupItem, Button } from "shards-react";

import browser from "webextension-polyfill";

async function deleteData() {
  await browser.storage.local.set({ data: {} });
}

function processData(data) {
  return Object.keys(data)
    .map((e) => ({
      site: e,
      distance: data[e],
    }))
    .sort((a, b) => b.distance - a.distance);
}

function Popup(props) {
  const { data, error, mutate } = useSWR("data", async () => {
    return processData((await browser.storage.local.get("data")).data);
  });

  useEffect(() => {
    const handler = (e) => {
      mutate(e.data?.newValue ? processData(e.data?.newValue) : []);
    };
    browser.storage.onChanged.addListener(handler);

    return () => {
      browser.storage.onChanged.removeListener(handler);
    };
  });

  if (!data) {
    return <p>Loading</p>;
  }

  if (data.length == 0) {
    return (
      <div
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No data yet. Go scroll on some pages, then come back!
      </div>
    );
  }

  return (
    <div>
      <ListGroup>
        {data.map((e) => (
          <ListGroupItem key={e.site}>
            {e.site} -{" "}
            <b>
              {e.distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} px
            </b>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Button
        block
        theme="danger"
        style={{ marginTop: 20 }}
        onClick={() => deleteData().then(() => mutate([]))}
      >
        Clear Data
      </Button>
    </div>
  );
}

export default Popup;
