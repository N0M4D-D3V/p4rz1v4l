if [ -z "$VERSION_EXECUTED" ]; then
  echo "El script de versión no se ejecutó en este commit."
  exit 1
fi

action=$1 # patch, minor or major
tag=$(awk -F \" '/"version": ".+"/ { print $4; exit; }' package.json)

git add -A
git fetch origin $branch
git merge --no-ff -m "CI/CD -> Create patch for $action" origin/$branch
npm version "$action"
# Get app version
# Upload git changes to remote
git push --follow-tags