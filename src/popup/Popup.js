import React, { useEffect } from "react";
import useSWR from "swr";

import { ListGroup, ListGroupItem, Button } from "shards-react";

function deleteData() {
  return new Promise((resolve, reject) => {
    browser.storage.local.set({ data: {} }).then(() => {
      resolve();
    });
  });
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
  const { data, error, mutate } = useSWR("data", () => {
    return new Promise((resolve, reject) => {
      browser.storage.local.get("data").then((data) => {
        resolve(processData(data.data));
      });
    });
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
      <div style={{ margin: "100px 0" }}>
        No data yet. Go scroll on some pages, then come back!
      </div>
    );
  }

  return (
    <>
      <div style={{ width: "400px" }}>
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
    </>
  );
}

export default Popup;
