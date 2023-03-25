#!/bin/bash
action=$1 # patch, minor or major

git add -A
git commit -m "CI/CD -> Create patch for $action"
npm version "$action"
# Get app version
tag=$(awk -F \" '/"version": ".+"/ { print $4; exit; }' package.json)
# Upload git changes to remote
git push
git push origin "v$tag"
