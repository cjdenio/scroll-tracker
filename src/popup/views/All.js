import React from "react";
import { Button } from "shards-react";
import useSWR from "swr";
import { Link, useLocation } from "wouter";
import { clearAllData } from "../../lib/storage";
import * as storage from "../../lib/storage";

function All() {
  const [loc, setLoc] = useLocation();
  const { data } = useSWR("days", storage.getAllDays);

  return (
    <div>
      <Button
        block
        theme="danger"
        onClick={() => clearAllData().then(() => setLoc("/"))}
      >
        Clear All Data
      </Button>
      <Link href="/">
        <Button>Back</Button>
      </Link>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default All;
