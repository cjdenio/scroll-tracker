import React from "react";

import { ListGroup, ListGroupItem, Button } from "shards-react";

import useSWR from "swr";

function Popup(props) {
  const { data, error } = useSWR("test", () => {
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

  return (
    <>
      <div style={{ width: "400px" }}>
        <ListGroup>
          {data.map((e) => (
            <ListGroupItem>
              {e.site} - <b>{e.distance}</b>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Popup;
