const taches=[
    {id:"tache1" , titre:"faire les courses", terminee: true},
    {id:"tache2", titre:"apprendre l'anglais", terminee: false}
];

function render() {
    const liste= document.getElementById("liste-taches");
    liste.textContent="";
    
    for(const tache of taches){
        const li=document.createElement("li");
        li.textContent= taches.titre;
        liste.appendChild(li);
    }
}

render();