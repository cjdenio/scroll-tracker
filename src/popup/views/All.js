import React from "react";
import { Button, ListGroup, ListGroupItem } from "shards-react";
import useSWR from "swr";
import { Link, useLocation } from "wouter";
import { getAllDays, getTotalPx, clearAllData } from "../../lib/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

import { addCommas } from "../../lib/lib";

function All() {
  const [, setLoc] = useLocation();
  const { data, error } = useSWR("days", getAllDays);

  if (error) {
    return <p>Error loading data.</p>;
  }

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div>
        <Link href="/">
          <Button theme="light" style={{ marginBottom: 20 }}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Link>
        <Button
          theme="danger"
          style={{ float: "right" }}
          onClick={() => clearAllData().then(() => setLoc("/"))}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
      <ListGroup>
        {data.map((e) => (
          <Link href={`/date/${e.iso}`} key={e.iso}>
            <ListGroupItem className="clickable">
              {e.date} - <b>{addCommas(getTotalPx(e.entries))} px</b>
            </ListGroupItem>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
}

export default All;
