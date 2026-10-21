const CLE_TACHES = "lifeboard:taches";
let taches = chargerEtat();
let filtreActuel = "toutes";

function tachesVisibles() {
    if(filtreActuel === "afaire") {
        return taches.filter(function(t) {
            return !t.terminee;
        });
    }
    if(filtreActuel === "terminees") {
        return taches.filter(function (t) {
            return t.terminee;
        });
    }
    return taches;
}

document.getElementById("filtres").addEventListener("click", function (event){
    const bouton = event.target.closest("button");
    if(bouton === null) {
        return;
    }
    filtreActuel = bouton.dataset.filtre;
    render();
})

function supprimerTache(id){
    taches = taches.filter(function(l){
        return l.id !== id;
    });
    sauvegarderEtat();
    render();
}

 function basculerTache(id) {
    const tache = taches.find(function(l) {
        return l.id === id;
    });
    tache.terminee= !tache.terminee;
    sauvegarderEtat();
    render();
 }

function render() {
    const aujourdhui = new Date().toISOString().slice(0,10);
    const liste= document.getElementById("liste-taches");
    liste.textContent="";
    
    for(const tache of tachesVisibles()){
        const li=document.createElement("li");
        const boutonSupprimer=document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";
        const caseACocher=document.createElement("input");

        const titre = document.createElement("span");
        
        if(tache.terminee){
            titre.classList.add("terminee");
        }

        liste.appendChild(li);
        caseACocher.type = "checkbox";
        caseACocher.checked= tache.terminee;
        li.appendChild(caseACocher);
        titre.textContent = tache.titre;
        li.appendChild(titre);
        if(tache.categorie){
            const spanCategorie = document.createElement("span");
            spanCategorie.textContent = " [" + tache.categorie + "] ";
            li.appendChild(spanCategorie);
        }
        if(tache.echeance){
            const spanEcheance = document.createElement("span");
            spanEcheance.textContent = " [" + tache.echeance + "] ";
            li.appendChild(spanEcheance);
        }
        if(tache.echeance && !tache.terminee && tache.echeance < aujourdhui){
            li.classList.add("en-retard");
        }
        li.dataset.id = tache.id;
        caseACocher.dataset.action = "basculer";
        boutonSupprimer.dataset.action = "supprimer";
        li.appendChild(boutonSupprimer);
    }

    const resteTache=taches.filter(function(l){
        return !l.terminee;
    }).length; 

    document.getElementById("nombretache").textContent = "il vous reste "+ resteTache + " taches a faire.";

    const messageVide = document.getElementById("pasdetache");
    if(taches.length === 0){
        messageVide.textContent = "Rien a faire, profiter!";
    } else {
        messageVide.textContent="";
    }
}

const formulaire=document.getElementById("formulaire-tache");
const champ = document.getElementById("titre-tache");
const selectCategorie=document.getElementById("categories-taches");
const Echeance=document.getElementById("dateEcheance");

function ajouterTache(event) {
    event.preventDefault();
    const tachesAjouter=champ.value.trim();
    if( tachesAjouter === "") {
        return;
    }
    taches.push({id:Date.now(), titre: tachesAjouter, terminee: false, categorie:selectCategorie.value, echeance:Echeance.value});
    champ.value= "";
    sauvegarderEtat();
    render();
}

 formulaire.addEventListener("submit",ajouterTache);

 function sauvegarderEtat(){
    localStorage.setItem(CLE_TACHES, JSON.stringify(taches));
 } 

 function chargerEtat() {
    const texte = localStorage.getItem(CLE_TACHES);
    if (texte === null){
        return [];
    }
    try {
        return JSON.parse(texte);
    }catch (erreur) {
        console.error("Donnees abimees", erreur);
        return [];
    }
 }

    document.getElementById("liste-taches").addEventListener("click", function(event) {
        const ligne = event.target.closest("li");
        if(ligne === null) {
            return;
        }
        const id = Number(ligne.dataset.id);
        const action = event.target.dataset.action;
        if(action === "supprimer") {
            supprimerTache(id);
        }
        if(action === "basculer") {
            basculerTache(id);
        }
    });

 
 render();
