if [ -z "$VERSION_EXECUTED" ]; then
  echo "El script de versión no se ejecutó en este commit."
  exit 1
fi

action=$1 # patch, minor or major

git add -A
git commit -m "CI/CD -> Create patch for $action"
npm version "$action"
# Get app version
tag=$(awk -F \" '/"version": ".+"/ { print $4; exit; }' package.json)
# Upload git changes to remote
git push
git push origin "v$tag"