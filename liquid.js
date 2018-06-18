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
var hexene = {
   "name":"Hexene",
   "properties":
      {
         "viscosity":{
            "A":"-3.71089",
            "B":"596.135",
            "C":"-43.7713",
            "Tmin":"158",
            "Tmax":"373"
         },
         "density":{
            "A":"10.0696",
            "B":"0.101281",
            "C":"1995.46",
            "D":"1.1334",
            "Tmin":"146",
            "Tmax":"325"
         }
      }
}
var diol = {
   "name":"Ethane diol",
   "properties":
      {
         "viscosity":{
            "A":"-3.44553",
            "B":"946.08",
            "C":"-147.014",
            "Tmin":"253",
            "Tmax":"353"
         },
         "density":{
            "A":"40.4538",
            "B":"0.177155",
            "C":"753.782",
            "D":"0.179703",
            "Tmin":"250",
            "Tmax":"473"
         }
      }
}
var propano_diol = {
   "name":"Propane diol",
   "properties":
      {
         "viscosity":{
            "A":"-2.43342",
            "B":"625.296",
            "C":"-197.07",
            "Tmin":"288",
            "Tmax":"323"
         },
         "density":{
            "A":"71.7956",
            "B":"0.240024",
            "C":"851.803",
            "D":"0.32772",
            "Tmin":"243",
            "Tmax":"423"
         }
      }
}

var liquids = {'Ethanol':ethanol,'Dyethil Ether':dyethil_ether,'Hexene':hexene,'Ethane Diol':diol,'Propane Diol':propano_diol};


function  Viscosity(liquid,temperature){
        var A = parseFloat(liquid.properties.viscosity.A);
        var B = parseFloat(liquid.properties.viscosity.B);
        var C = parseFloat(liquid.properties.viscosity.C);
        var T = temperature;
        return Math.exp(A + B/(C+T)).toFixed(6);
}
function Viscosity_Text(liquid,temperature){
    var Tmin = parseInt(liquid.properties.density.Tmin);
    var Tmax = parseInt(liquid.properties.density.Tmax);
    var T = temperature;
    if( (T >= Tmin) && (T <= Tmax) ){
        return "$ \\text{Viscosidade Dinâmica } = " + Viscosity(liquid,temperature) +"\\;\\;mP_a\\,s$";
    }
    else return "Temperatura fora do limite para a viscosidade: (" + Tmin + ', ' + Tmax + ')';
}
function Kinetic_Viscosity(liquid,temperature){
    var V = parseFloat(Viscosity(liquid,temperature));
    var D = parseFloat(Density(liquid,temperature));
    return (1000 * V) / D;
}
function Kinetic_Viscosity_Text(liquid,temperature){
    var Tmin = parseInt(liquid.properties.density.Tmin);
    var Tmax = parseInt(liquid.properties.density.Tmax);
    var T = temperature;
    return "$ \\text{Viscosidade cinética } = " + Kinetic_Viscosity(liquid,temperature) +"\\;\\;cS$";
}
function Density(liquid,temperature){
        var A = parseFloat(liquid.properties.density.A);
        var B = parseFloat(liquid.properties.density.B);
        var C = parseFloat(liquid.properties.density.C);
        var D = parseFloat(liquid.properties.density.D);
        var T = temperature;
        return  (A/Math.pow(B,(1 + Math.pow((1 - T/C),D) ))).toFixed(6);
}
function Density_Text(liquid,temperature){
    var Tmin = parseInt(liquid.properties.density.Tmin);
    var Tmax = parseInt(liquid.properties.density.Tmax);
    var T = temperature;
    if( (T >= Tmin) && (T <= Tmax) ){
        return "$ \\text{Densidade } = " + Density(liquid,temperature) +"\\;\\;kg\\,m^{-3}$";
    }
    else return "Temperatura fora do limite para a densidade: (" + Tmin + ', ' + Tmax + ")";
}
function VBN(lA,lB,xA,xB,T){
   var vA = Kinetic_Viscosity(lA,T);
   var vB = Kinetic_Viscosity(lB,T);
   //console.log(vA+0.8);
   //console.log(Math.log(vA+0.8));
   console.log("VBN:");
   var vbnA = 14.534*Math.log(Math.log(vA+0.8))+10.975;
   console.log(vbnA);
   var vbnB = 14.534*Math.log(Math.log(vB+0.8))+10.975;
   console.log(vbnB);
   console.log(xA);
   console.log(xB);
   var vbnM = xA*vbnA + xB*vbnB;
   console.log(vbnM);
   console.log(Math.exp((vbnM - 10.975)/14.534));
   var vM = Math.exp(Math.exp((vbnM - 10.975)/14.534)) - 0.8;
   console.log(vM);
   console.log(":VBN");
   return vM;
}

function VBN_Text(lA,lB,xA,xB,T){
    return "$ \\text{Viscosidade Cinética } = " + VBN(lA,lB,xA,xB,T) +"\\;\\;cS$";
}

//function Mixture_Viscosity()

function Output(){
    var liquid1 = liquids[(document.getElementsByName("liquido1")[0].value)];
    var liquid2 = liquids[(document.getElementsByName("liquido2")[0].value)];
    var x1 = parseFloat((document.getElementsByName("xA")[0].value));
    var x2 = parseFloat(1 - x1);
    var temperature = Number(document.getElementsByName("temperature")[0].value);
    var texto = '';
    texto += "Líquido 1 <br>";
    texto += Viscosity_Text(liquid1,temperature) + " <br>";
    texto += Density_Text(liquid1,temperature) + " <br>";
    texto += Kinetic_Viscosity_Text(liquid1,temperature) + " <br>"
    texto += "Líquido 2 <br>"
    texto += Viscosity_Text(liquid2,temperature) + " <br>";
    texto += Density_Text(liquid2,temperature) + " <br>";
    texto += Kinetic_Viscosity_Text(liquid2,temperature) + " <br>"
    texto += "Mistura <br>";
    texto += VBN_Text(liquid1,liquid2,x1,x2,temperature) + " <br>";
    //texto += Mixture_Viscosity(liquid1,liquid2);
    document.getElementById("respostas").innerHTML = texto;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"respostas"]);

    texto = '';
}
