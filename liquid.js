var ethanol = {
   "name":"Ethanol",
   "properties":
      {
         "viscosity":{
            "A":"-7.37146",
            "B":"2770.25",
            "C":"74.6787"
         }
      }
}

var liquids = {'Ethanol':ethanol};


function  Viscosity(liquid,temperature){
        var A = parseFloat(liquid.properties.viscosity.A);
        var B = parseFloat(liquid.properties.viscosity.B);
        var C = parseFloat(liquid.properties.viscosity.C);
        var T = temperature;
        var vic = Math.exp(A + B/(C+T)).toFixed(6);
        return vic;
    }

function Output(){
    var liquid = liquids[(document.getElementsByName("liquido")[0].value)];
    var temperature = Number(document.getElementsByName("temperature")[0].value);

    texto = "$ \\text{Viscosidade Dinâmica } = " + Viscosity(liquid,temperature) +"\\;\\;mP_a\\,s$";
    document.getElementById("respostas").innerHTML = texto;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"respostas"]);
}

