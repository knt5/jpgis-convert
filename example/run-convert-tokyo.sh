#!/bin/bash

export NODE_PATH=../src/:$NODE_PATH

node convert-tokyo.js > 533946.geojson
