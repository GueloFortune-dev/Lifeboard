let taches=[
    {id: 1 , titre:"faire les courses", terminee: true},
    {id: 2, titre:"apprendre l'anglais", terminee: false}
];

function supprimerTache(id){
    taches = taches.filter(function(l){
        return l.id !== id;
    });
    render();
}

 function basculerTache(id) {
    const tache = taches.find(function(l) {
        return l.id === id;
    });
    tache.terminee= !tache.terminee;
    render();
 }

function render() {
    const liste= document.getElementById("liste-taches");
    liste.textContent="";
    
    for(const tache of taches){
        const li=document.createElement("li");
        const boutonSupprimer=document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";

        boutonSupprimer.addEventListener("click", function () {
            supprimerTache(tache.id);
        });

        const caseACocher=document.createElement("input");

        caseACocher.addEventListener("change",function () {
            basculerTache(tache.id);
        })

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
        li.appendChild(boutonSupprimer);
    }
}

const formulaire=document.getElementById("formulaire-tache");
const champ = document.getElementById("titre-tache");

function ajouterTache(event) {
    event.preventDefault();
    const tachesAjouter=champ.value.trim();
    if( tachesAjouter === "") {
        return;
    }
    taches.push({id:Date.now(), titre: tachesAjouter, terminee: false});
    champ.value= "";
    render();
}

 formulaire.addEventListener("submit",ajouterTache);

 render();

