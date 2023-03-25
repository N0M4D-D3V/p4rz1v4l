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

echo "tag antes de git add: $tag"
git add -A

echo "tag antes de git fetch: $tag"
git fetch origin $branch

echo "tag antes de git merge: $tag"
git merge --no-ff -m "CI/CD -> Create patch for $action" origin/$branch

echo "tag antes de npm version: $tag"
npm version "$action"

echo "tag antes de git push: $tag"
# Upload git changes to remote
git push --follow-tags