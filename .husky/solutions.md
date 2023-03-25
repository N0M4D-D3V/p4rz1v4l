## LEER COMPLETO:

[1] Si está en mac y recibe errores:
    -Asegurarse de que están permitidos los archivos .sh de forma como ejecutable:

----`Pasos`: 
[1]Homebrew instalado en tu Mac:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

[2]Después de instalar Homebrew, instala dos2unix ejecutando el siguiente comando:
brew install dos2unix
-------------------------------------------------------------

`Si recibe`:
bash: brew: command not found


## Ejecutar:

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"


## Seguido de:
[1]Instalar dos2unix:
|
|
 -  brew install dos2unix
|
|
[2]Habilitar archivos:

 - dos2unix .husky/pre-commit
 - dos2unix src/app/core/cicd/deploy-package-json-cicd-tag.sh