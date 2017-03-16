var statisticIsProportion = false;
var testType = "z";
var trueStat = "mean";
var trueStatSymbol = "μ";
var popNorm = true;
var srsCheck = true;

function generate(oId,oId2,xId,xId2,SId,SId2,numberId,numberId2,ConfidenceId,contextId,unitsId,pId,aId,nId,iId,cId,approxNormJustId,srsCheckJustId){
    var o = document.getElementById(oId).value;
    var o2 = document.getElementById(oId2).value;

    var x = document.getElementById(xId).value;
    var x2 = document.getElementById(xId2).value;
    var number = document.getElementById(numberId).value;
    var number2 = document.getElementById(numberId2).value;

    var S = document.getElementById(SId).value;
    var S2 = document.getElementById(SId2).value;
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
        var type = "mean"
        if(!x2>x){
            var xHolder = x;
            x = x2;
            x2 = numHolder;
            var numHolder = number;
            number = number2;
            number2 = numHolder;
        }
        x = Number(x);
        x2 = Number(x2);
        var xFinal = x-x2;
        if (!popNorm && number>30 && number2>30){
            approxNormJust="n1>30 and n2>30";
            popNorm = true;
        } else if(popNorm){
            approxNormJust="it was given in the prompt"
        }
        var SE = Math.sqrt( ( (o^2)/number ) + ( (o2^2)/number2 ) );
        var z = invNorm((1-C)/2);
        MOE = z*SE;
        leftBound = xFinal + MOE;
        rightBound = xFinal - MOE;
        //document.getElementById(cId).innerHTML = "We can be " + C*100 + "% confident that the true " + type + " of " + probContext + " is between " + leftBound + units + "  and " + rightBound + units;
        x = x.toFixed(3);
        x2 = x2.toFixed(3);
        xFinal = xFinal.toFixed(3);
        z = z.toFixed(3);
        SE = SE.toFixed(3);
        MOE = MOE.toFixed(3);
        rightBound = rightBound.toFixed(3);
        leftBound = leftBound.toFixed(3);
        calculations = "x̅1="+x+" x̅2="+x2+" x̅1-2="+xFinal+" C="+C+" n1="+number+" n2="+number2+"<br>z*=invNorm((1-"+C+")/2)="+z+"<br>SE=√( ( (o1^2)/n1 ) + ( (o2^2)/n2 ) )="+SE+"<br>(x̅1-x̅2)±(z*)*SE=("+x+"-"+x2+")±"+z+"*"+SE+"="+xFinal+"±"+MOE+"<br>=("+leftBound+", "+rightBound+")";
        var normReasons = "it was not given in the prompt and as well as n<30";
    }

    if(statisticIsProportion){
        var type = "proportion"
        var p = 0;
        var p2 = 0;
        if(x>x2){
            p = x;
            p2 = x2;
        } else if(x2>x){
            p = x2;
            p2 = x;
            var numHolder = number;
            number = number2;
            number2 = numHolder;
        }
        p = Number(p);
        p2 = Number(p2);
        var pFinal = p-p2;
        var proportionCheck = checkProportionNormality(number,p);
        var proportionCheck2 = checkProportionNormality(number2,p2);
        if (!popNorm && proportionCheck && proportionCheck2){
            approxNormJust="that np̂1>10 and n(1-p̂1)>10, and that np̂2>10 and n(1-p̂2)>10";
            popNorm = true;
        } else if(popNorm){
            approxNormJust="it was given in the prompt"
        }
        var SE = Math.sqrt( (( p*( 1-p ))/number) + (( p2*( 1-p2 ))/number) );
        var z = invNorm((1-C)/2);
        MOE = z*SE;
        leftBound = pFinal + MOE;
        rightBound = pFinal - MOE;
        //document.getElementById(cId).innerHTML = "We can be " + C*100 + "% confident that the true " + type + " of " + probContext + " is between " + leftBound + units + "  and " + rightBound + units;
        p = p.toFixed(3);
        p2 = p2.toFixed(3);
        pFinal = xFinal.toFixed(3);
        z = z.toFixed(3);
        SE = SE.toFixed(3);
        MOE = MOE.toFixed(3);
        rightBound = rightBound.toFixed(3);
        leftBound = leftBound.toFixed(3);
        calculations = "p1="+p+" p2="+p2+" p1-2="+pFinal+" C="+C+" n1="+number+" n2="+number2+"<br>z*=invNorm((1-"+C+")/2)="+z+"<br>p̂±(z*)*SE="+p+"±"+z+"*"+SE+"="+p+"±"+MOE+"<br>=("+leftBound+", "+rightBound+")";
        var normReasons = " it was not given in the prompt and np̂1<10 and n(1-p̂1)<10, and that np̂2<10 and n(1-p̂2)<10";
    }
    if (aNormal==""){
        var aNormal = "The population is " + boolToPhrase(popNorm,"","not") + " approximately normal " + boolToPhrase(popNorm," because "+approxNormJust+".",normReasons+" and we will proceed with caution. ");
    }
    if (aSRS==""){
        var aSRS = "The data was " + boolToPhrase(srsCheck,"","not") + " collected using an SRS " + boolToPhrase(srsCheck," because it was given in the prompt."," it was not given in the prompt and we will proceed with caution.");
    }
    document.getElementById(pId).innerHTML = "Let " + trueStatSymbol + " be the true " + trueStat + " of " + probContext + ".";
    document.getElementById(aId).innerHTML = aNormal +" "+ aSRS;
    document.getElementById(nId).innerHTML = "We will create a two-sample " + C*100 + "% " + testType + " confidence interval.";
    document.getElementById(iId).innerHTML = calculations;
    document.getElementById(cId).innerHTML = "We can be " + C*100 + "% confident that the true " + type + " of " + probContext + " is between " + leftBound + units + " and " + rightBound + units;
}
