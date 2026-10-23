const CLE_BUDGET = "lifeboard:budget";

function chargerEtat(){
    const texte=localStorage.getItem(CLE_BUDGET);
    if(texte === null) {
        return [];
    }
    try {
        return JSON.parse(texte);
    }catch (erreur){
         console.error("Donnee abimer",erreur);
         return [];
    }
}

function sauvegarderEtat() {
    localStorage.setItem(CLE_BUDGET, JSON.stringify(operations));
}

let operations = chargerEtat();