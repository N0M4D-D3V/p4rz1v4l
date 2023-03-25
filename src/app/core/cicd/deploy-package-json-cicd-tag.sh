#!/bin/bash
action=$1 # patch, minor or major

npm version "$action"
# Get app version
tag=$(awk -F \" '/"version": ".+"/ { print $4; exit; }' package.json)
