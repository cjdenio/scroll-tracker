import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Button, ListGroup, ListGroupItem } from "shards-react";

import useSWR from "swr";

import { getDay } from "../../lib/storage";

import { DateTime } from "luxon";

function Date(props) {
  const { data, error } = useSWR("day", async () => {
    return await getDay(props.params.date);
  });

  if (error) {
    return <p>Error loading data.</p>;
  }

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div style={{ textAlign: "left" }}>
      <Button
        theme="light"
        style={{ marginBottom: 5 }}
        onClick={() => history.back()}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <h3 style={{ fontSize: 20, textAlign: "center" }}>
        Stats for{" "}
        {DateTime.fromISO(props.params.date).toLocaleString(DateTime.DATE_FULL)}
        :
      </h3>
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
    </div>
  );
}

export default Date;
