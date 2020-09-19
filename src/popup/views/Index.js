import React from "react";
import useSWR from "swr";
import { Link } from "wouter";

import { ListGroup, ListGroupItem, Button } from "shards-react";

import { getTodaysEntries, getTotalPx } from "../../lib/storage";
import { addCommas } from "../../lib/lib";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMouse } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const { data, error, mutate } = useSWR("data", getTodaysEntries);

  if (error) {
    return <p>Error loading data.</p>;
  }

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
        <div>
          <div>No data yet. Go scroll on some pages, then come back!</div>
          <Link href="/all">
            <Button style={{ marginTop: 10 }} theme="light">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: 10 }}
              />
              View All Days
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ fontSize: 20 }}>
        <FontAwesomeIcon icon={faMouse} style={{ marginRight: 10 }} />
        Today's scrolling stats:
      </h3>
      <p>
        You've scrolled <b>{addCommas(getTotalPx(data))} px</b> today.
      </p>
      <ListGroup style={{ textAlign: "left" }}>
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
          <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: 10 }} />
          View All Days
        </Button>
      </Link>
    </div>
  );
}

export default Index;
