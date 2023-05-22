#!/usr/bin/env bash
set -o errexit
set -o nounset

sleep 5

mongo --host ray_mongo1:27017 <<EOF
  var cfg = {
    "_id": "rs1",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "ray_mongo1:27017",
        "priority": 1
      }
    ]
  };
  rs.initiate(cfg, { force: true });
  sleep(1000);
  rs.reconfig(cfg, { force: true });
  db.getMongo().setReadPref('nearest');
  rs.status();
EOF