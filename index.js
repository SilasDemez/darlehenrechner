let gesamtzinsen = 0;


let darlehen_array = [];
let zinsen_array = [];
let tilgung_array = [];
//let darlehen_array = [];

function berechnen(){

    let table = document.getElementById("tilgungsplan");
    table.innerHTML = "";
    table = document.getElementById("extrawerte");
    table.innerHTML = "";
    gesamtzinsen = 0; 
        
    let darlehensbetrag = document.getElementById("darlehensbetrag").value;    	// €
    let dauer = document.getElementById("dauer").value;                           // Jahre
    let zinssatz = document.getElementById("zinssatz").value;                     // %
    let monatliche_rate = document.getElementById("monatliche_rate").value;       // €
    let extrakosten = document.getElementById("zusatzkosten").value;

    //console.log(darlehensbetrag + " " + dauer + " " + zinssatz + " " + monatliche_rate);




    if (monatliche_rate == ""){
        /// monatliche rate muss noch ausgerechnet werden
        monatliche_rate = monatliche_annuitaet(darlehensbetrag, zinssatz, dauer);
        document.getElementById("monatliche_rate").value = Math.round(monatliche_rate * 100) / 100;
        tilgungsplan(darlehensbetrag, zinssatz, monatliche_rate);

        console.log("monatliche rate: " + monatliche_rate);
    }else if (darlehensbetrag == ""){
        // darlehensbetrag muss noch ausgerechnet werden
        try {
            let barwert = darlehen_funktionen_barwert(monatliche_rate, dauer*12, zinssatz, 0, 0);
            console.log("Barwert: " + barwert);
        } catch (error) {
            console.log("Something went wrong!");
        }
    }else if (dauer == "") {
        // dauer muss noch ausgerechnet werden
        try {
            let anzahl = tilgungsplan(darlehensbetrag, zinssatz, monatliche_rate);
            dauer = anzahl/12;
            document.getElementById("dauer").value = Math.round(dauer);


            console.log("Anzahl der Raten: " + anzahl);
            console.log("Dauer: " + dauer);
        } catch (error) {
            alert("Something went wrong!");
        }
    }else if (zinssatz == ""){
        console.log("Berechne Zinssatz");
        let rueckzahlungstermine = 12;
        zinssatz=darlehen_zinssatz_berechnen(darlehensbetrag, monatliche_rate, dauer*12, 0, 0)/12*rueckzahlungstermine;
        document.getElementById("zinssatz").value = Math.round(zinssatz * 100) / 100;
        tilgungsplan(darlehensbetrag, zinssatz, monatliche_rate);

        console.log("Zinssatz: " + zinssatz);
    }else{
        tilgungsplan(darlehensbetrag, zinssatz, monatliche_rate);
    }

    let table1 = document.getElementById("extrawerte");

    let row = table1.insertRow(0);
    let cell0 = row.insertCell(-1).innerHTML = "        Gesamtzinsen: ";
    let cell1 = row.insertCell(-1).outerHTML = '<td><input type="number" id="gesamtzinsen" value=""></td>';
    let cell2 = row.insertCell(-1).innerHTML = "€";

    
    let gesamtzinsen_mit_extra = 0;

    if (extrakosten == ""){
        gesamtzinsen_mit_extra = gesamtzinsen;
    }else{
        gesamtzinsen_mit_extra = parseFloat(gesamtzinsen) + parseFloat(extrakosten);
        
    }
    document.getElementById("gesamtzinsen").value = Math.round(gesamtzinsen_mit_extra * 100) / 100;
    /*
        if (extrakosten == ""){
            let effektiver_zinssatz = effektiver_zinssatz_berechnen(annuitaet(zinssatz/100, dauer*12, darlehensbetrag), extrakosten, darlehensbetrag, dauer*12);
            console.log("Effektiever Zinssatz: " + effektiver_zinssatz);
        }

    

    ctx = document.getElementById("tilgungsplan_chart");
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['s','f','r'],
                datasets: [
                    {
                        label: 'Tilgung',
                        backgroundColor: 'rgb(255, 99, 132)',
                        data: darlehen_array
                    },
                    {
                        label: 'Zinsen',
                        backgroundColor: 'rgb(11, 94, 215)',
                        data: zinsen_array

                    },
                    {
                        label: 'Zinsen1',
                        backgroundColor: 'rgb(11, 94, 215)',
                        data: tilgung_array

                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
                }
            }
		});
        */

}



function tilgungsplan(darlehensbetrag, zinssatz, monatliche_rate){

    let table = document.getElementById("tilgungsplan");
    let anzahl = 1;

    let row = table.insertRow(0);
    let cell0 = row.insertCell(0).outerHTML = "<th>Anzahl</th>";
    let cell1 = row.insertCell(1).outerHTML = "<th>Darlehensbetrag</th>";
    let cell2 = row.insertCell(2).outerHTML = "<th>Monatliche Rate</th>";
    let cell3 = row.insertCell(3).outerHTML = "<th>Monatliche Zinsen</th>";
    let cell4 = row.insertCell(4).outerHTML = "<th>Tilgungbetrag</th>";

    while (darlehensbetrag >= 0) {
        let monatliche_zinsen = darlehensbetrag * ((zinssatz/100)/12);
        let tilgungsanteil = monatliche_rate - monatliche_zinsen;
        gesamtzinsen += monatliche_zinsen;
        //console.log("Darlehensbetrag: " + darlehensbetrag + " Monatliche rate: " + monatliche_rate + " Monatliche Zinsen anfangs: " + monatliche_zinsen + " tilgungsanteil: " + tilgungsanteil);
        
        darlehensbetrag -= tilgungsanteil;

        let row = table.insertRow(-1);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);

        cell0.innerHTML = anzahl
        cell1.innerHTML = Math.round(darlehensbetrag * 100) / 100;
        cell2.innerHTML = Math.round(monatliche_rate * 100) / 100;
        cell3.innerHTML = Math.round(monatliche_zinsen * 100) / 100;
        cell4.innerHTML = Math.round(tilgungsanteil * 100) / 100;


        darlehen_array.push(darlehensbetrag);
        zinsen_array.push(monatliche_zinsen);
        tilgung_array.push(tilgungsanteil);

        anzahl++;
        //console.log("a: " + darlehensbetrag + " b: " + monatliche_rate + " c: " + monatliche_zinsen + " d: " + tilgungsanteil);
        
    }

    return anzahl;

}


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
                rate_annaeherung= annuitaet(zinssatz_local/12, anzahl, barwert);
                //rate_annaeherung = monatliche_annuitaet(barwert, zinssatz, anzahl/12)
            }
        }else {
            while (rate_annaeherung > rate){
                zinssatz_local=zinssatz_local-annaeherungsfaktor;
                if (zinssatz_local==0){ //würde eine Rate = NA ergeben, daher geringe korrektur
                    zinssatz_local=zinssatz_local+annaeherungsfaktor/10;
                }
                //rate_annaeherung = monatliche_annuitaet(barwert, zinssatz, anzahl/12)
                rate_annaeherung= annuitaet(zinssatz_local/12, anzahl, barwert);          
            }
        }
        if (rate==rate_annaeherung){break;}
	}
	//return rate_annaeherung;   
	return zinssatz_local;    
}


function annuitaet(zinssatz, anzahl,barwert){
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


function monatliche_annuitaet(darlehensbetrag, zinssatz, dauer){
    return darlehensbetrag * ((Math.pow((1+ (zinssatz/100)/12), dauer*12) * ((1+(zinssatz/100)/12) - 1))/(Math.pow((1+ (zinssatz/100)/12), dauer*12) -1));
}

function darlehen_funktionen_barwert(annuitaet, anzahl, zinssatz, endwert, zahlungsbeginn) {
    let barwert = 0;
    let zwischenergebnis_1 = 0;
    let zwischenergebnis_2 = 0;
    zinssatz = zinssatz / 100;
    zwischenergebnis_1 = (Math.pow(1 + zinssatz, anzahl) - 1);
    zwischenergebnis_2 = (Math.pow(1 + zinssatz, anzahl) * zinssatz);
    barwert = annuitaet * (zwischenergebnis_1 / zwischenergebnis_2);

    //neue Formel mit endwert
    zwischenergebnis_1 = Math.pow(1 + zinssatz, anzahl);
    zwischenergebnis_2 = (zwischenergebnis_1 - 1) / zinssatz;
    //barwert=(rate*(1+zinssatz*zahlungsbeginn)*zwischenergebnis_2)/zwischenergebnis_1;
    barwert = (annuitaet * (1 + zinssatz * zahlungsbeginn) * zwischenergebnis_2 - endwert) / zwischenergebnis_1;
    return barwert;
}

/*
function effektiver_zinssatz_berechnen(annuitaet, extrakosten, barwert, anzahl){
    //effektiven Zinssatz berechnen
    annuitaet = annuitaet * 1 + (extrakosten/anzahl) * 1; //Spesen pro Rate zur Annuität dazuzählen
    barwert = barwert - extrakosten; //'--Anfangskosten zum Barwert dazurechnen
    let eff_zinssatz = (darlehen_zinssatz_berechnen(barwert, annuitaet, anzahl, 0, 0) / 12) * 12;
    eff_zinssatz = (Math.pow(1 + eff_zinssatz / 12 / 100, 12) - 1) * 100;

    return eff_zinssatz;
}
*/

//const Chart = require('chart.js');


