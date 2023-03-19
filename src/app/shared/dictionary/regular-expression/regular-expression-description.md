## GUIA:
|
|_________________________________________________________
|                                                         |
|Cada vez que se introduzca un nuevo regex al diccionario:|
|_________________________________________________________|
|
|----[1]--->Nombres `suficientemente` explicativo.
|----[2]--->Poner el regex y poner descripción de su funcionalidad acá.
|----[3]--->Se pondrán en forma `descendiente` tal y como está en el diccionario [`NO CAMBIAR EL ORDEN`]
|---------------------------------------------------------------------------------------------------
|
|-->>>>
|-->>>>
|-->>>> [LISTA ACTUAL Y DESCRIPCION]
|
1)-[onlyNumbers]: Solo dígitos, ningún signo ni letras.
2)-[onlyNumbersAndLetters]: Solo dígitos y letras.
3)-[onlyNumbersAndTwoDecimals]: Solo dígitos; punto; coma; 2 decimales.
4)-[onlyNumbersAndLettersHypenAndSlash]: Solo dígitos; letras; hypen(guión); slash(barra diagonal).
5)-[onlyNumbersAndLettersUppercase]: Solo dígitos y letras en mayúsculas.
6)-[replaceDotOnString]: Si encuenta números en string. Ejm: '1.1.3'...replace(RegularExpression.replaceDotOnString, '') -> 113.