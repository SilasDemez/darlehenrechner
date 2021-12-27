
// variante 1
let darlehensbetrag = 100000    	// €
let dauer = 10                     // Jahre
let zinssatz = 2                  // %
let monatliche_rate = 0                // €
let gesamtzinsen = 0

monatliche_rate = monatliche_annuitaet(darlehensbetrag, zinssatz, dauer)

for (let index = 0; index < dauer*12; index++) {
    monatliche_zinsen = darlehensbetrag * ((zinssatz/100)/12);
    tilgungsanteil = monatliche_rate - monatliche_zinsen;
    gesamtzinsen += monatliche_zinsen;
    //console.log("Darlehensbetrag: " + darlehensbetrag + " Monatliche rate: " + monatliche_rate + " Monatliche Zinsen anfangs: " + monatliche_zinsen + " tilgungsanteil: " + tilgungsanteil);
    
    darlehensbetrag -= tilgungsanteil;
    console.log("a: " + darlehensbetrag + " b: " + monatliche_rate + " c: " + monatliche_zinsen + " d: " + tilgungsanteil);
}

/*
// variante 2
let darlehensbetrag = 500000    	// €
let dauer = 10                      // Jahre
let monatliche_rate = 4600.67	
*/


/*
let rueckzahlungstermine = 12;
zinssatz=darlehen_zinssatz_berechnen(500000, 4600.67, 120, 0, 0)/12*rueckzahlungstermine;
console.log("Zinssatz: " + zinssatz);



function darlehen_zinssatz_berechnen(barwert, rate, anzahl, endwert, zahlungsbeginn){
	var zinssatz_local=10;
	var rate_annaeherung=0;
	var annaeherungsfaktor=100;


    //annäherungsweise den zinssatz bestimmen
    for (i=0; i<8;i++){
        annaeherungsfaktor=annaeherungsfaktor/10;
        if (rate_annaeherung < rate){
            while (rate_annaeherung < rate){
                zinssatz_local=zinssatz_local+annaeherungsfaktor;
                if (zinssatz_local==0){ //würde eine Rate = NA ergeben, daher geringe korrektur
                    zinssatz_local=zinssatz_local-annaeherungsfaktor/10;
                }
                //rate_annaeherung= annuitaet(zinssatz_local/12, anzahl, barwert, endwert, zahlungsbeginn);
                rate_annaeherung = monatliche_annuitaet(barwert ,zinssatz, anzahl/12)
            }
        }else {
            while (rate_annaeherung > rate){
                zinssatz_local=zinssatz_local-annaeherungsfaktor;
                if (zinssatz_local==0){ //würde eine Rate = NA ergeben, daher geringe korrektur
                    zinssatz_local=zinssatz_local+annaeherungsfaktor/10;
                }
                rate_annaeherung = monatliche_annuitaet(barwert ,zinssatz, anzahl/12)
                //rate_annaeherung= annuitaet(zinssatz_local/12, anzahl, barwert, endwert, zahlungsbeginn);          
            }
        }
        if (rate==rate_annaeherung){break;}
	}
	//return rate_annaeherung;   
	return zinssatz_local;    
}


function annuitaet(zinssatz, anzahl,barwert,endwert,zahlungsbeginn){
	var rate=0;
	var zwischenspeicher=0;
	zwischenspeicher=1+(zinssatz/100);
	var zwischenspeicher_1=0;
	zinssatz=zinssatz/100;
	zwischenspeicher=Math.pow(1+zinssatz,anzahl);
	zwischenspeicher_1=Math.pow(1+zinssatz*0,anzahl);
	var rate_=0;
	rate=(-zinssatz * (barwert*zwischenspeicher))/(zwischenspeicher_1*zwischenspeicher-1);
	rate=rate*-1;
	return rate;    
}
*/
function monatliche_annuitaet(darlehensbetrag, zinssatz, dauer){
    return darlehensbetrag * ((Math.pow((1+ (zinssatz/100)/12), dauer*12) * ((1+(zinssatz/100)/12) - 1))/(Math.pow((1+ (zinssatz/100)/12), dauer*12) -1));
}