import React from "react";
import useSWR from "swr";
import { Link } from "wouter";

import { ListGroup, ListGroupItem, Button, ButtonGroup } from "shards-react";

import * as storage from "../../lib/storage";

function Index() {
  const { data, mutate } = useSWR("data", storage.getTodaysEntries);

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
      <h3 style={{ fontSize: 20 }}>Today's scrolling stats:</h3>
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
      <Link href="/all">
        <Button style={{ marginTop: 20 }} theme="light">
          View All Days
        </Button>
      </Link>
    </div>
  );
}

export default Index;
