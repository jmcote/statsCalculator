function setToProportion(id,infoId,infoId2) {
    var setTo = "Unset";
    setTo = "Proportion";
    trueStat = "proportion";
    trueStatSymbol = "p";
    statisticIsProportion = true;
    document.getElementById(id).innerHTML = "STATISTIC MODE: " + setTo;
    document.getElementById(infoId).innerHTML = "p̂";
    document.getElementById(infoId2).innerHTML = "p̂";
}

function setToNonProportion(id,infoId,infoId2) {
    var setTo = "Unset";
    setTo = "Non-Proportion";
    trueStat = "mean";
    trueStatSymbol = "μ";
    statisticIsProportion = false;
    document.getElementById(id).innerHTML = "STATISTIC MODE: " + setTo;
    document.getElementById(infoId).innerHTML = "x̅";
    document.getElementById(infoId2).innerHTML = "x̅";
}

function findTestType(popSD){
    if (popSD/popSD == 1){
        testType = "z";
        console.log("z test determined");
    } else {
        testType = "t";
        console.log("t test determined");
    }
}

function togglePopNormButton(id){
    if (popNorm){
        popNorm = false;
        document.getElementById(id).innerHTML = "Population is not explicitly given as approximately normal";
    } else {
        popNorm = true;
        document.getElementById(id).innerHTML = "Population is given as approximately normal";
    }
}

function toggleSrsCheckButton(id){
    if (srsCheck){
        srsCheck = false;
        document.getElementById(id).innerHTML = "Data was not explicitly collected using an SRS";
    } else {
        srsCheck = true;
        document.getElementById(id).innerHTML = "Data was collected using an SRS";
    }
}

function checkProportionNormality(n,p){
    if(n*p>10 && n*(1-p)>10){
        return true;
    } else {
        return false;
    }
}

function boolToPhrase(bool,phrase,elsePhrase){
    if(bool){
        return phrase;
    } else {
        return elsePhrase;
    }
}

function boolFlip(bool){
    if(bool == true){
        return false;
    } else if(bool == false){
        return false;
    }
}

//Not my code, borrowed from DeepSpace101 on stackoverflow
function invNorm(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}

function invT(C,x) {
    switch(x){
        case .99:
            return 92.32906467142857 - (86.99058438397547*(x)) + (30.53542882625*(x^2)) - (4.546086063459596*(x^3)) + (0.24276814488636364*(x^4));
            break;
        case .98:

    }
}
