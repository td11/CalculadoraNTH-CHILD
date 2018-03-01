/* Variables globales en concreto colores */
var _colorPrincipal = "", _colorSecundario = "";

/* Inicia el programa */
function inicio(){
    var colorPrincipal = localStorage.getItem("mainColor");
    var colorSecundario = localStorage.getItem("secColor");
    
    if(colorPrincipal == null){
        colorPrincipal = "#c91414";
    }
    
    if(colorSecundario == null){
        colorSecundario = "#407716";
    }
    var contenedor = document.getElementById("container");
    var alto = document.getElementById("alto").value;
    var ancho = document.getElementById("ancho").value;
    var colorPrincipalRecogido = document.getElementById("mainColor");
    var colorSecundarioRecogido = document.getElementById("secColor");
    colorPrincipalRecogido.value = colorPrincipal;
    colorSecundarioRecogido.value = colorSecundario;
    contenedor.style.width = (50 * ancho) + "px";
    contenedor.style.height = (50 * alto) + "px";
    
    for(var i = 0; i < ancho * alto; i++){
        var node = document.createElement("div");
        node.className = "cuadrado";
        node.textContent = (i + 1);
        node.style.backgroundColor = colorPrincipal;
        contenedor.appendChild(node);
    }
    inicioAuto();
    _colorPrincipal = colorPrincipal;
    _colorSecundario = colorSecundario;
}

function inicioAuto(){
    var formulaList = localStorage.getItem("formulaList");
    formulaList = JSON.parse(formulaList);
    if(formulaList != null){
        var completeBox = document.getElementById("completeBox");
        for(var i = 0; i < formulaList.length; i++){
            var node = document.createElement("option");
            node.textContent = formulaList[i];
            completeBox.appendChild(node);
        }
        var formulaInput = document.getElementById("formula");
    }
}

/* Calcula el tablero teniendo en cuenta los parametros introducidos */
function calcularTablero(){
    var colorPrincipal = document.getElementById("mainColor").value;
    var colorSecundario = document.getElementById("secColor").value;
    var formula = document.getElementById("formula").value;
    var todosLosCuadrados = document.querySelectorAll(".cuadrado");
    var cuadrados =  document.querySelectorAll(".cuadrado:nth-child(" + formula + ")");
    
    //cambiar bucles por maps
    for(var i = 0; i < todosLosCuadrados.length; i++){
        todosLosCuadrados[i].style.backgroundColor = colorPrincipal;
    }

    for(var i = 0; i < cuadrados.length; i++){
        cuadrados[i].style.backgroundColor = colorSecundario;
    }


    ////Guardar la formula en el localStorage
    if(cuadrados.length != null){
        var formulaFormateada = formula.replace(/\s/g, '');
        var listaFormula = localStorage.getItem("formulaList");
        listaFormula = JSON.parse(listaFormula);
        if(listaFormula == null){
            listaFormula = new Array();
        }
        if(!(listaFormula.includes(formulaFormateada))){
            listaFormula.push(formulaFormateada);
            listaFormula = JSON.stringify(listaFormula);
            localStorage.setItem("formulaList", listaFormula);
        }
    }
   
}

/* Reajustar el tablero */
function reajustar(){
    eliminarHijos();
    inicio();
    calcularTablero();
}

/* Elimina los hijos */
function eliminarHijos(){
    var myNode = document.getElementById("container");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/* Reinicia el tablero 
function reinicio(){
    var colorPrincipal = "red";    
    var cuadrados = document.querySelectorAll(".square");
    for(var i = 0; i < cuadrados.length; i++){
        cuadrados[i].style.backgroundColor = colorPrincipal;
    }
}*/
function reinicio(){
    eliminarHijos();
    inicioReinicio();
    //calcularTablero();
}


function inicioReinicio(){
    var colorPrincipal = 'red';
    var colorSecundario = 'red';
    
    var contenedor = document.getElementById("container");
    var alto = 20;
    var ancho = 20;
    var colorPrincipalRecogido = 'red';
    var colorSecundarioRecogido = 'red';
    colorPrincipalRecogido.value = colorPrincipal;
    colorSecundarioRecogido.value = colorSecundario;
    contenedor.style.width = (50 * ancho) + "px";
    contenedor.style.height = (50 * alto) + "px";
    
    for(var i = 0; i < ancho * alto; i++){
        var node = document.createElement("div");
        node.className = "cuadrado";
        node.textContent = (i + 1);
        node.style.backgroundColor = colorPrincipal;
        contenedor.appendChild(node);
    }
    inicioAuto();
    _colorPrincipal = colorPrincipal;
    _colorSecundario = colorSecundario;
}

/* Guarda el color */
function guardarColor(num){
    //0 is equivalent to non selected and 1 to nth:child selected
    if(num == 0){
        var color = document.getElementById("mainColor").value;
        var cuadrados = document.querySelectorAll(".square");
        for(var i = 0; i < cuadrados.length; i++){
            if(rgbToHex(cuadrados[i].style.backgroundColor) == _colorPrincipal){
                cuadrados[i].style.backgroundColor = color;
            }
        }
        localStorage.setItem("mainColor", color);
        _colorPrincipal = color;
    }
    else{ //if(num == 1)
        var color = document.getElementById("secColor").value;
        var cuadrados = document.querySelectorAll(".square");
        for(var i = 0; i < cuadrados.length; i++){
            if(rgbToHex(cuadrados[i].style.backgroundColor) == _colorSecundario){
                cuadrados[i].style.backgroundColor = color;
            }
        }
        localStorage.setItem("secColor", color);
        _colorSecundario = color;
    }
}

/* Pasar rgb a hexadecimal para el uso optimo de los colores */
function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}