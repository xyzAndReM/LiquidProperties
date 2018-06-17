var ethanol = {
   "name":"Ethanol",
   "properties":
      {
         "viscosity":{
            "A":"-7.37146",
            "B":"2770.25",
            "C":"74.6787",
            "Tmin":"159",
            "Tmax":"516"
         },
         "density":{
            "A":"99.3974",
            "B":"0.310729",
            "C":"513.18",
            "D":"0.305143",
            "Tmin":"191",
            "Tmax":"513"
         }
      }
}

var dyethil_ether = {
   "name":"Ether",
   "properties":
      {
         "viscosity":{
            "A":"-5.13316",
            "B":"1286.03",
            "C":"55.8587",
            "Tmin":"157",
            "Tmax":"373"
         },
         "density":{
            "A":"70.6361",
            "B":"0.26782",
            "C":"466.578",
            "D":"0.28243",
            "Tmin":"153",
            "Tmax":"466"
         }
      }
}

var liquids = {'Ethanol':ethanol,'Dyethil Ether':dyethil_ether};


function  Viscosity(liquid,temperature){
        var A = parseFloat(liquid.properties.viscosity.A);
        var B = parseFloat(liquid.properties.viscosity.B);
        var C = parseFloat(liquid.properties.viscosity.C);
        var Tmin = parseInt(liquid.properties.viscosity.Tmin);
        var Tmax = parseInt(liquid.properties.viscosity.Tmax);
        var T = temperature;
        if( (T >= Tmin) && (T <= Tmax) ){
            return "$ \\text{Viscosidade Dinâmica } = " + Math.exp(A + B/(C+T)).toFixed(6) +"\\;\\;mP_a\\,s$";
        }
        else return "Temperatura fora do limite (" + Tmin + ',' + Tmax + ')';
    }
function Density(liquid,temperature){
        var A = parseFloat(liquid.properties.density.A);
        var B = parseFloat(liquid.properties.density.B);
        var C = parseFloat(liquid.properties.density.C);
        var D = parseFloat(liquid.properties.density.D);
        var Tmin = parseInt(liquid.properties.density.Tmin);
        var Tmax = parseInt(liquid.properties.density.Tmax);
        var T = temperature;
        if( (T >= Tmin) && (T <= Tmax) ){
            return "$ \\text{Densidade } = " + (A/Math.pow(B,(1 + Math.pow((1 - T/C),D) ))).toFixed(6) +"\\;\\;kg\\,m^{-3}$";
        }
        else return "Temperatura fora do limite (" + Tmin + ',' + Tmax + ')';

}
function Output(){
    var liquid = liquids[(document.getElementsByName("liquido")[0].value)];
    var temperature = Number(document.getElementsByName("temperature")[0].value);
    var texto = '';
    texto += Viscosity(liquid,temperature) + "<br>";
    texto += Density(liquid,temperature) + "<br>";
    document.getElementById("respostas").innerHTML = texto;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"respostas"]);

    texto = '';
}

