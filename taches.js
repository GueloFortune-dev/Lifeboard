const taches=[
    {id:"tache1" , titre:"faire les courses", terminee: true},
    {id:"tache2", titre:"apprendre l'anglais", terminee: false}
];

function render() {
    const liste= document.getElementById("liste-taches");
    liste.textContent="";
    
    for(const tache of taches){
        const li=document.createElement("li");
        li.textContent= tache.titre;
        liste.appendChild(li);
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