function obtenirSalutation(heure) {
    if (heure < 12) {
        return "Bonjour";
    } else if (heure < 18) {
        return "Bon après-midi";
    } else {
        return "Bonsoir";
    }
}

function afficherSalutation() {
    const heure= new Date().getHours();
    const prenom = document.getElementById("prenom").value.trim();
    let texte = obtenirSalutation(heure);

    if (prenom !== "") {
        texte = texte + ", " + prenom + "!";
    }

    document.getElementById("salutation").textContent = texte;
}

afficherSalutation();
document.getElementById("prenom").addEventListener("input", afficherSalutation);


function afficherHeure() {
    const maintenant = new Date();
    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
    document.getElementById("heure").textContent = `${heures}:${minutes}:${secondes}`;
    afficherDate();
}

afficherHeure();
setInterval(afficherHeure, 1000);

function afficherDate() {
    const maintenant = new Date();
    const options = { weekday: 'long',day: 'numeric',month: 'long' ,year: 'numeric'};
    const dateComplete = maintenant.toLocaleDateString('fr-FR', options);
    document.getElementById("date").textContent = dateComplete;
}

afficherDate();

const citations=[
    {citation: "La beauté commence au moment où vous décidez d’être vous-même", auteur: "Coco Chanel"},
    {citation: "Personne ne peut vous faire sentir inférieur sans votre consentement.", auteur: "Eleanor Roosevelt"},
    {citation: "Rien ne fonctionnera si vous ne le faites pas.", auteur: "Maya Angelou"},
    {citation: "Il n’y a aucune limite à ce que nous pouvons accomplir en tant que femmes. ", auteur: "Michelle Obama"},
    {citation: " Cela semble toujours impossible jusqu’à ce qu’on le fasse. ", auteur: "Nelson Mandela"},
    {citation: "Soyez vous-même ; tous les autres sont déjà pris. ", auteur: "Oscar Wilde"},
    {citation: "On ne naît pas femme : on le devient.", auteur: "Simone de Beauvoir"},
    {citation: "Ce qui se trouve derrière nous et ce qui se trouve devant nous sont peu de chose comparés à ce qui se trouve en nous.", auteur:"Ralph Waldo Emerson"},
    {citation: "Peu importe la lenteur de votre progression, tant que vous ne vous arrêtez pas. ", auteur: "Idée couramment attribuée à Confucius"},
    {citation: "Dans la vie, rien n’est à craindre, tout est à comprendre. ", auteur: "Marie Curie"}
]

console.log(citations.length);

let precedent=-1;

function choisirCitation(){
    let indice=Math.floor(Math.random()* citations.length);
    while(indice===precedent){
        indice=Math.floor(Math.random()* citations.length);
    }
    precedent=indice;
    return citations[indice];
}

function afficherCitation(){
    const citationChoisie=choisirCitation();
    document.getElementById("citation").textContent =citationChoisie.citation;
    document.getElementById("auteur").textContent = citationChoisie.auteur;
}

afficherCitation();
document.getElementById("Newcitation").addEventListener("click",afficherCitation);

function jourRestants(dateCible){
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    const difference= dateCible - aujourdhui;
    return Math.round(difference / (1000*60*60*24));
}

function afficherCompteARebours(){
    const dateCible= new Date(2027, 09 , 17);
    const jours= jourRestants(dateCible);
    let texte;
    if (jours>1) {
        texte= "Plus que " + jours +" jours avant le jour tant attendu!";
    }else if (jours===1){
        texte= "C'est demain le grand jour";
    }else if (jours===0){
        texte= "C'est le grand jour JOYEUX ANNIVERSAIRE!!!";
    }else {
        texte= "la date est deja passee";
    }
    document.getElementById("compte-a-rebours").textContent=texte;
}
afficherCompteARebours();