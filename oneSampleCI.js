var statisticIsProportion = false;
var testType = "z";
var trueStat = "mean";
var trueStatSymbol = "μ";
var popNorm = true;
var srsCheck = true;

function generate(oId,xId,SId,numberId,ConfidenceId,contextId,unitsId,pId,aId,nId,iId,cId){
    var o = document.getElementById(oId).value;
    var x = document.getElementById(xId).value;
    var S = document.getElementById(SId).value;
    var number = document.getElementById(numberId).value;
    var C = document.getElementById(ConfidenceId).value;
    var probContext = document.getElementById(contextId).value;
    var units = document.getElementById(unitsId).value;
    var approxNormJust = "";

    var aNormal = "";
    var aSRS = "";

    var calculations = "";

    var leftBound = 0;
    var rightBound = 0;
    var MOE = 0;
    var type = "variable 'type' error";
    units = " " + units;

    if(!statisticIsProportion){
        var type = "mean";
        if (!popNorm && number>30){
            approxNormJust="n>30";
            popNorm = true;
        } if(popNorm){
            approxNormJust="it was given in the prompt"
        }
        x = Number(x);
        var SE = o/Math.sqrt(number);
        var z = invNorm((1-C)/2);
        MOE = z*SE;
        leftBound = x + MOE;
        rightBound = x - MOE;
        x = x.toFixed(3);
        z = z.toFixed(3);
        SE = SE.toFixed(3);
        MOE = MOE.toFixed(3);
        rightBound = rightBound.toFixed(3);
        leftBound = leftBound.toFixed(3);
        calculations = "σ="+o+" x̅="+x+" C="+C+" n="+number+"<br>z*=invNorm((1-"+C+")/2)="+z+"<br>x̅±(z*)*SE="+x+"±"+z+"*"+SE+"="+x+"±"+MOE+"<br>=("+leftBound+", "+rightBound+")";
        var normReasons = " it was not given in the prompt and n<30";
    }

    if(statisticIsProportion){
        var type = "proportion";
        var p = x;
        var proportionCheck = checkProportionNormality(number,p);
        if (popNorm==false && proportionCheck==true){
            approxNormJust="np̂>10 and n(1-p̂)>10";
            popNorm = true;
        } else if(popNorm){
            approxNormJust="it was given in the prompt"
        }
        p = Number(p);
        console.log(p);
        var SE = Math.sqrt( ( p*( 1-p ) )/number);
        var z = invNorm((1-C)/2);
        MOE = z*SE;
        leftBound = p + MOE;
        rightBound = p - MOE;
        //document.getElementById(cId).innerHTML = "We can be " + C*100 + "% confident that the true " + type + " of " + probContext + " is between " + leftBound + units + "  and " + rightBound + units;
        p = p.toFixed(3);
        z = z.toFixed(3);
        SE = SE.toFixed(3);
        MOE = MOE.toFixed(3);
        rightBound = rightBound.toFixed(3);
        leftBound = leftBound.toFixed(3);
        calculations = "p="+p+" C="+C+" n="+number+"<br>z*=invNorm((1-"+C+")/2)="+z+"<br>p̂±(z*)*SE="+p+"±"+z+"*"+SE+"="+p+"±"+MOE+"<br>=("+leftBound+", "+rightBound+")";
        var normReasons = " it was not given in the prompt and np<10 or n(1-p)<10";
    }
    if (aNormal==""){
        var aNormal = "The population is " + boolToPhrase(popNorm,"","not") + " approximately normal " + boolToPhrase(popNorm," because "+approxNormJust+".",normReasons+" and we will proceed with caution. ");
    }
    if (aSRS==""){
        var aSRS = "The data was " + boolToPhrase(srsCheck,"","not") + " collected using an SRS " + boolToPhrase(srsCheck," because it was given in the prompt."," it was not given in the prompt and we will proceed with caution.");
    }
    document.getElementById(pId).innerHTML = "Let " + trueStatSymbol + " be the true " + trueStat + " of " + probContext + ".";
    document.getElementById(aId).innerHTML = aNormal +" "+ aSRS;
    document.getElementById(nId).innerHTML = "We will create a one-sample " + C*100 + "% " + testType + " confidence interval.";
    document.getElementById(iId).innerHTML = calculations;
    document.getElementById(cId).innerHTML = "We can be " + C*100 + "% confident that the true " + type + " of " + probContext + " is between " + leftBound + units + " and " + rightBound + units;
}
