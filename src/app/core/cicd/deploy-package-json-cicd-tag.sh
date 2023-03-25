if git show-ref --tags | grep -q '\srefs/tags/origin$'; then
  echo "Existe una etiqueta llamada 'origin' en el repositorio. Por favor, elimínela o renómbrela antes de ejecutar este script."
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)

if [ -z "$VERSION_EXECUTED" ]; then
  echo "El script de versión no se ejecutó en este commit."
  exit 1
fi

action=$1 # patch, minor or major
tag=$(grep -Eo '"version":\s*"[^"]+"' package.json | grep -Eo '[0-9]+\.[0-9]+\.[0-9]+')

git add -A
git fetch origin $branch
git merge --no-ff -m "CI/CD -> Create patch for $action" origin/$branch
npm version "$action"
# Get app version
# Upload git changes to remote
git push --follow-tags