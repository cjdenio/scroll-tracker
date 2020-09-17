import React from "react";

import { ListGroup, ListGroupItem, Button } from "shards-react";

import useSWR from "swr";

function deleteData() {
  return new Promise((resolve, reject) => {
    console.log("yeah 1");
    browser.storage.local.set({ data: {} }).then(() => {
      console.log("yeah 2");
      resolve();
    });
  });
}

function Popup(props) {
  const { data, error, mutate } = useSWR("data", () => {
    return new Promise((resolve, reject) => {
      browser.storage.local.get("data").then((data) => {
        resolve(
          Object.keys(data.data)
            .map((e) => ({
              site: e,
              distance: data.data[e],
            }))
            .sort((a, b) => b.distance - a.distance)
        );
      });
    });
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
              {e.site} - <b>{e.distance}</b>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Button
          block
          theme="danger"
          style={{ marginTop: 20 }}
          onClick={deleteData().then(() => mutate({}))}
        >
          Clear Data
        </Button>
      </div>
    </>
  );
}

export default Popup;
