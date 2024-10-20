// Variables

// Etat du perso
let inconscient = false;
let mort = false;
let kos = false;
let detruits = false;

let membreTouche = '';
let race = "";
let pv = 0;
let newPv = 0;
let pvActuel = 0;
let tableauPvActuel = [];  // Créer un tableau vide pour stocker les valeurs de pvActuel
let pertePv = 0;
let agi = 0;
let com = 0;
let conn = 0;
let mag = 0;
let man = 0;
let per = 0;
let dis = 0;
let valeurs = recupVal();
let compteurBoutonSoin = 0;
let raceData;

// Sélectionner les éléments HTML où insérer les localisations
const locaDiv = document.getElementById("loca");
const dVingtDiv = document.getElementById("dVingt");
const armDiv = document.getElementById("arm");
const pvDiv = document.getElementById("pvLoca");
const armBonDiv = document.getElementById("armBon");
const degDiv = document.getElementById("degats");
const conDiv = document.getElementById("condition");

// Sélectionne la div parent qui contient les inputs d'armure
let armureBon = document.getElementById("armBon");

// Sélectionne tous les inputs enfants de armureBon
let inputsArm = "";

// Listes des clés associées aux différentes informations
const localisationKeys = ["loca1", "loca2", "loca3", "loca4", "loca5", "loca6", "loca7", "loca8", "loca9", "loca10"];
const dVingtKeys = ["locaNumUn", "locaNumDeux", "locaNumTrois", "locaNumQuatre", "locaNumCinq", "locaNumSix", "locaNumSept", "locaNumHuit", "locaNumNeuf", "locaNumDix"];
const armKeys = ["locaArmUn", "locaArmDeux", "locaArmTrois", "locaArmQuatre", "locaArmCinq", "locaArmSix", "locaArmSept", "locaArmHuit", "locaArmNeuf", "locaArmDix"];
const pvKeys = ["locaPvUn", "locaPvDeux", "locaPvTrois", "locaPvQuatre", "locaPvCinq", "locaPvSix", "locaPvSept", "locaPvHuit", "locaPvNeuf", "locaPvDix"];
const importKeys = ["locaImportUn", "locaImportDeux", "locaImportTrois", "locaImportQuatre", "locaImportCinq", "locaImportSix", "locaImportSept", "locaImportHuit", "locaImportNeuf", "locaImportDix"];
let armBonKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pvTotalMbKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pvMaxKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tableauArmure = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tableauDegats = [];
let ko = [false, false, false, false, false, false, false, false, false, false];
let detruit = [false, false, false, false, false, false, false, false, false, false];
let contenuCondition = ["Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !"];
let titreCondition = ["Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal"];
let membreTranche = [false, false, false, false, false, false, false, false, false, false];

let raceDiceData;  // Variable globale pour stocker les données du JSON

// Fonction pour charger les données du fichier JSON
function loadRaceData() {
    return fetch('races.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier JSON');
            }
            return response.json();
        })
        .then(data => {
            raceDiceData = data;  // Stocke les données dans la variable globale
            console.log("Données chargées :", raceDiceData);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function utiliserRace(race) {
    if (raceDiceData) {  // Vérifie si les données sont chargées
        raceData = raceDiceData[race];  // Récupère les données pour la race sélectionnée
        console.log("Données pour la race sélectionnée :", raceData);
        // Fais quelque chose avec raceData...
    } else {
        console.log("Les données de race ne sont pas encore chargées.");
    }
}

// Appel de la fonction pour charger les données dès le début
loadRaceData();

// Fonction pour afficher les dés selon la race
function afficherDes() {
    if (race in raceDiceData) {
        // Récupérer les données pour la race sélectionnée
        const diceValues = raceDiceData[race];
        
        // Appliquer les valeurs des dés aux divs
        document.getElementById("strDice").innerHTML = diceValues.str;
        document.getElementById("conDice").innerHTML = diceValues.con;
        document.getElementById("taiDice").innerHTML = diceValues.tai;
        document.getElementById("dexDice").innerHTML = diceValues.dex;
        document.getElementById("intDice").innerHTML = diceValues.int;
        document.getElementById("pouDice").innerHTML = diceValues.pou;
        document.getElementById("chaDice").innerHTML = diceValues.cha;
    }
}

// Fonction pour récupérer la race et afficher les dés en conséquence
document.getElementById("race").addEventListener("change", function() {
    const x = document.getElementById("race").selectedIndex;
    
    if (x != 0) {
        document.getElementById("boutonRecherche").style.display = "inline-block";
        document.getElementById("boutonAleatoire").style.display = "inline-block";
        document.getElementById("boutonReset").style.display = "inline-block";
    }

    // Récupérer la race sélectionnée
    race = this.value;
    afficherDes();  // Mettre à jour les valeurs des dés
    genererLocalisations(race);
});

// Fonction de récupération des valeurs
function recupVal() {
    // Récupérer les valeurs des champs et les convertir en nombres
    tai = parseInt(document.getElementById("tai").value) || 0;
    dex = parseInt(document.getElementById("dex").value) || 0;
    str = parseInt(document.getElementById("str").value) || 0;
    pou = parseInt(document.getElementById("pou").value) || 0;
    cha = parseInt(document.getElementById("cha").value) || 0;
    con = parseInt(document.getElementById("con").value) || 0;
    int = parseInt(document.getElementById("int").value) || 0;
    return {tai, dex, str, pou, cha, con, int};
}


// Fonction pour afficher les PV
function afficherPV() {
    // Récupérer les valeurs des champs en utilisant la fonction recupVal()
    const { tai, pou, con } = recupVal();  // Récupérer les valeurs de TAI, POU et CON

    let pvTai = 0;
    let pvPou = 0;
    let vitGuer = 0;

    // Calcul de pvTai
    if (tai < 5) {
        pvTai = -2;
    } else if (tai < 9) {
        pvTai = -1;
    } else if (tai < 13) {
        pvTai = 0;
    } else if (tai < 17) {
        pvTai = 1;
    } else if (tai < 21) {
        pvTai = 2;
    } else if (tai < 25) {
        pvTai = 3;
    } else if (tai < 29) {
        pvTai = 4;
    } else {
        pvTai = 5;
    }

    // Calcul de pvPou
    if (pou < 5) {
        pvPou = -1;
    } else if (pou < 17) {
        pvPou = 0;
    } else if (pou < 21) {
        pvPou = 1;
    } else if (pou < 25) {
        pvPou = 2;
    } else if (pou < 29) {
        pvPou = 3;
    } else {
        pvPou = 4;
    }

    // Calcul des PV en combinant constitution, taille et pouvoir
    pv = con + pvTai + pvPou;

    // Calcul de la vitesse de guérison
    if (con < 7) {
        vitGuer = 1;
    } else if (con < 13) {
        vitGuer = 2;
    } else if (con < 19) {
        vitGuer = 3;
    } else if (con < 25) {
        vitGuer = 4;
    } else if (con < 31) {
        vitGuer = 5;
    } else if (con < 37) {
        vitGuer = 6;
    } else {
        vitGuer = 7;
    }

    newPv = pv;

    // Affichage des PV et vitesse de guérison dans les divs correspondantes
    document.getElementById("pv").innerHTML = "PV Total : " + newPv + "/" + pv;
    document.getElementById("vitGuer").innerHTML = "Vitesse guérison : " + vitGuer;
}

function calculBonusDegats(valeur, paliers, bonus) {
    for (let i = 0; i < paliers.length; i++) {
        if (valeur < paliers[i]) {
            return bonus[i];
        }
    }
    return bonus[bonus.length - 1];
}

function afficherRangs() {
    const { tai, pou, dex, cha, str } = recupVal(); // Supposons que valeurs soit déjà défini

    const forTai = str + tai;
    const pouCha = pou + cha;

    const rangTai = calculBonusDegats(tai, [7, 15, 22], [3, 2, 1, 0]);
    const rangDex = calculBonusDegats(dex, [6, 9, 13, 16, 19], [5, 4, 3, 2, 1, 0]);
    const bonDeg = calculBonusDegats(forTai, [13, 25, 33, 41, 57, 73, 89, 105], ["-1D4", "0", "1D4", "1D6", "2D6", "3D6", "4D6", "5D6", "6D6"]);
    const degSpi = calculBonusDegats(pouCha, [13, 25, 33, 41, 57, 73, 89, 105], ["1D3", "1D6", "1D6+1", "1D6+3", "2D6+3", "3D6+4", "4D6+5", "5D6+6", "6D6+7"]);

    // Affichage des résultats
    document.getElementById("rangTai").innerHTML = "Rang d'action de Tai : " + rangTai;
    document.getElementById("rangDex").innerHTML = "Rang d'action de Dex : " + rangDex;
    document.getElementById("bonDeg").innerHTML = "Bonus aux dégâts : " + bonDeg;
    document.getElementById("degSpi").innerHTML = "Dégâts spirituels : " + degSpi;
}

function afficherAutres() {
    // Récupérer les valeurs des champs et les convertir en nombres
    const { pou, str, con } = recupVal();  // Extraction des valeurs
    
    let enc = 0;

    // Calcul de l'encombrement maximal
    enc = str < con ? str : Math.ceil((str + con) / 2);
    
    // Calcul des points de magie
    const pm = pou;

    // Affichage des résultats
    document.getElementById("enc").innerHTML = "Encombrement maximal : " + enc;
    document.getElementById("pm").innerHTML = "Points de magie : " + pm;

    // Afficher la section (si cachée)
    showDiv();
}


// Fonction d'affichage des mods de compétences
function afficherModComp() {
    // Récupérer les valeurs des champs
    const { tai, dex, str, pou, cha, int } = recupVal();

    // Initialisation des modificateurs
    let agi = 0, com = 0, conn = 0, mag = 0, man = 0;

    // Seuils et modificateurs
    const seuils = [5, 9, 13, 17, 21, 25, 29];
    const UnMods = [-5, 0, 0, 0, 5, 10, 15, 20];
    const DeMods = [-10, -5, 0, 5, 10, 15, 20, 25];
    const TrMods = [10, 5, 0, -5, -10, -15, -20, -25];
    const QuMods = [5, 0, 0, 0, -5, -10, -15, -20];


    // Modificateur d'agilité basé sur STR, DEX, TAI et POU
    agi += calculModComp(str, seuils, UnMods);
    agi += calculModComp(tai, seuils, QuMods);
    agi += calculModComp(dex, seuils, DeMods);
    agi += calculModComp(pou, seuils, UnMods);

    // Modificateur de communication
    com += calculModComp(pou, seuils, UnMods);
    com += calculModComp(int, seuils, UnMods);
    com += calculModComp(cha, seuils, DeMods);

    // Modificateur de connaissances
    conn += calculModComp(int, seuils, DeMods);
    conn += calculModComp(pou, seuils, UnMods);

    // Modificateur de magie
    mag += calculModComp(pou, seuils, DeMods);
    mag += calculModComp(cha, seuils, UnMods);

    // Modificateur de manipulation
    man += calculModComp(str, seuils, UnMods);
    man += calculModComp(dex, seuils, DeMods);
    man += calculModComp(int, seuils, DeMods);
    man += calculModComp(pou, seuils, UnMods);

    // Modificateur de perception
    per += calculModComp(int, seuils, DeMods);
    per += calculModComp(pou, seuils, UnMods);

    // Modificateur de discretion
    dis += calculModComp(tai, seuils, TrMods);
    dis += calculModComp(dex, seuils, DeMods);
    dis += calculModComp(int, seuils, DeMods);
    dis += calculModComp(pou, seuils, QuMods);


    // Affichage des modificateurs dans le DOM
    document.getElementById("agi").innerHTML = "Mod Agilité : " + agi;
    document.getElementById("com").innerHTML = "Mod Communication : " + com;
    document.getElementById("conn").innerHTML = "Mod Connaissances : " + conn;
    document.getElementById("mag").innerHTML = "Mod Magie : " + mag;
    document.getElementById("man").innerHTML = "Mod Manipulation : " + man;
}

// Fonction pour calculer le modificateur de compétence en fonction des valeurs seuils
function calculModComp(valeur, seuils, modificateurs) {
    for (let i = 0; i < seuils.length; i++) {
        if (valeur < seuils[i]) {
            return modificateurs[i];
        }
    }
    return modificateurs[modificateurs.length - 1]; // Valeur par défaut si supérieure aux seuils
}

// Attacher l'événement de clic au bouton
document.getElementById("boutonRecherche").addEventListener("click", function name(params) {
    afficherPV();
    afficherRangs();
    afficherAutres();
    afficherModComp();
    genererLocalisations(race);
    // etatPerso(pv);
});

// Fonction pour générer un nombre entier aléatoire entre min et max inclus
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour lancer des dés, par exemple '3d6' ou '2d6+6'
function lancerDes(diceStr) {
    const diceRegex = /(\d+)d(\d+)([+-]\d+)?/;  // Regex pour parser des types comme '3d6+6'
    const matches = diceStr.match(diceRegex);
    
    if (matches) {
        const nbDes = parseInt(matches[1]);     // Nombre de dés à lancer
        const faces = parseInt(matches[2]);     // Nombre de faces du dé (par exemple, 6)
        const modificateur = parseInt(matches[3]) || 0; // Modificateur optionnel (+ ou - un nombre)

        let total = 0;
        for (let i = 0; i < nbDes; i++) {
            total += getRandomInt(1, faces);   // Lancer chaque dé
        }
        total += modificateur;                // Ajouter ou soustraire le modificateur
        return total;
    } else {
        return 0; // Si la chaîne n'est pas dans le format attendu, renvoie 0
    }
}

// Fonction pour générer des valeurs aléatoires dans les inputs en fonction des dés
function genererValeursAleatoires() {
    // Pour chaque caractéristique, on récupère le diceNum et on génère une valeur
    document.getElementById("str").value = lancerDes(document.getElementById("strDice").textContent);
    document.getElementById("con").value = lancerDes(document.getElementById("conDice").textContent);
    document.getElementById("tai").value = lancerDes(document.getElementById("taiDice").textContent);
    document.getElementById("dex").value = lancerDes(document.getElementById("dexDice").textContent);
    document.getElementById("int").value = lancerDes(document.getElementById("intDice").textContent);
    document.getElementById("pou").value = lancerDes(document.getElementById("pouDice").textContent);
    document.getElementById("cha").value = lancerDes(document.getElementById("chaDice").textContent);
}

// Attacher l'événement de clic au bouton "Générer des valeurs aléatoires"
document.getElementById("boutonAleatoire").addEventListener("click", function() {
    if (!race) {
        alert("Veuillez sélectionner une race avant de générer des valeurs.");
        return;
    }
    genererValeursAleatoires();
    afficherPV();
    afficherRangs();
    afficherAutres();
    afficherModComp();
    genererLocalisations(race);
    // etatPerso(pv);
});

// Bouton reset pour remettre à zero
document.getElementById("boutonReset").addEventListener("click", reset);

function genererLocalisations(race) {
    // Vider les anciennes localisations
    locaDiv.innerHTML = '<div class="titreLoca">Localisation</div>';
    dVingtDiv.innerHTML = '<div class="titreLoca">D20</div>';
    armDiv.innerHTML = '<div class="titreLoca">Armure</div>';
    pvDiv.innerHTML = '<div class="titreLoca">PV</div>';
    armBonDiv.innerHTML = '<div class="titreLoca">Armure bonus</div>';
    degDiv.innerHTML = '<div class="titreLoca">Dégâts</div>';
    conDiv.innerHTML = '<div class="titreLoca">Conditions</div>';

    effacerDivsLoca()
    setTimeout(function() {
        // Ton code pour modifier le `span`
    }, 100);  // Attendre 100 millisecondes
    
    utiliserRace(race);  // Récupérer les données de la race sélectionnée
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }

    for (let i = 1; i <= 10; i++) {
        const key = `loca${i}`;  // Générer la clé (loca1, loca2, etc.)
        const x = parseInt(key.replace('loca', '')) - 1;
        let locaId = "locaId" + x;
        let d20Id = "d20Id" + x;
        let armId = "armId" + x;
        let pvId = "pvId" + x;
        let armBonId = "armBonId" + x;
        let degId = "degId" + x;
        let conId = "conId" + x;
        const localisation = raceData[key];  // Accéder à la localisation correspondante
        const d20Key = raceData[dVingtKeys[x]]; // Accéder aux scores d20 liés à la localisation
        const armure = parseInt(raceData[armKeys[x]]);
        let armureTotale = armure + parseInt(armBonKeys[x]);
        tableauArmure[x] = armureTotale;
        const type = raceData[pvKeys[x]];
        pvMaxKeys[x] = calculerPvMembre(type)
        let pvMax = pvMaxKeys[x];
        pvActuel = pvMax - pvTotalMbKeys[x];
        let pvActuelMax = pvActuel + "/" + pvMax;
        tableauPvActuel.length = 0;  // Vider le tableau
        ajouterPvActuel(pvActuel);
        conditionsSante(x, 0, pvActuel, pvMax)

        if (localisation != "") {
            // Créer une case pour la localisation
            ajouterCellule(locaDiv, localisation, locaId);
            // Créer une case pour le d20
            ajouterCellule(dVingtDiv, d20Key, d20Id);
            // Créer une case pour l'armure
            ajouterCellule(armDiv, armureTotale, armId);
            // Créer une case pour les pv
            ajouterCellule(pvDiv, pvActuelMax, pvId);
            // Créer une case pour l'armure bonus
            ajouterInputArm(armBonDiv, armBonKeys[x], armBonId);
            // Créer une case pour les dégâts
            ajouterInput(degDiv, 0, degId);
            // Créer une case pour la condition
            ajouterCelluleSpan(conDiv, contenuCondition[x], titreCondition[x], conId);
        }
    }
}

// Fonctions auxiliaires
function ajouterCellule(parentDiv, textContent, id) {
    const newDiv = document.createElement("div");
    newDiv.className = "celLoca";
    if (id) {
        newDiv.id = id;  // Ajout de l'ID si fourni
    }
    newDiv.textContent = textContent;
    parentDiv.appendChild(newDiv);
    return newDiv;
}

function ajouterCelluleSpan(parentDiv, contenu, titre, id) {
    // Crée une nouvelle div
    const newDiv = document.createElement("div");
    newDiv.className = "celLoca";
    parentDiv.appendChild(newDiv);

    // Crée un élément <span>
    const tooltipSpan = document.createElement("span");
    // Ajoute la classe "tooltip" à cet élément
    tooltipSpan.classList.add("tooltip");
    if (id) {
        newDiv.id = id;  // Ajout de l'ID si fourni
    }
    // Ajouter l'attribut "data-tooltip" avec le texte 
    tooltipSpan.setAttribute("data-tooltip", contenu);
    // Ajoute le texte qui sera visible dans le <span>
    tooltipSpan.textContent = titre;
    // Insère ce <span> comme enfant de la nouvelle div
    newDiv.appendChild(tooltipSpan);

    // Retourne la nouvelle div et le span dans un objet
    return { newDiv, tooltipSpan };
}

function ajouterInput(parentDiv, defaultValue, id) {
    const inputDiv = document.createElement("div");
    inputDiv.className = "celLocaPlus";
    const input = document.createElement("input");
    input.type = "number";
    input.value = defaultValue;
    if (id) {
        input.id = id;  // Ajout de l'ID si fourni
    }
    inputDiv.appendChild(input);
    parentDiv.appendChild(inputDiv);
    return input;
}

function ajouterInputArm(parentDiv, defaultValue, id) {
    const inputDiv = document.createElement("div");
    inputDiv.className = "celLocaPlusArm";
    const input = document.createElement("input");
    input.type = "number";
    input.value = defaultValue;
    if (id) {
        input.id = id;  // Ajout de l'ID si fourni
    }
    inputDiv.appendChild(input);
    parentDiv.appendChild(inputDiv);
    return input;
}

// Fonction pour effacer les cases du tableau
function effacerDivsLoca() {
    // Sélectionner toutes les div ayant la classe 'celLoca'
    const celLoca = document.querySelectorAll('.celLoca');
    const celLocaPlus = document.querySelectorAll('.celLocaPlus');
    const celLocaPlusArm = document.querySelectorAll('.celLocaPlusArm');
    
    // Parcourir chaque div et supprimer son contenu
    celLoca.forEach(function(div) {
        div.innerHTML = ""; // Effacer le contenu de chaque div
    });
    celLoca.forEach(function(div) {
        div.remove(); // Supprimer complètement la div
    });
    celLocaPlus.forEach(function(div) {
        div.innerHTML = ""; // Effacer le contenu de chaque div
    });
    celLocaPlus.forEach(function(div) {
        div.remove(); // Supprimer complètement la div
    });
    
    celLocaPlusArm.forEach(function(div) {
        div.innerHTML = ""; // Effacer le contenu de chaque div
    });
    celLocaPlusArm.forEach(function(div) {
        div.remove(); // Supprimer complètement la div
    });
}

// Fonction pour calculer les pv en fonction de la localisation
function calculerPvMembre(type) {
    let basePv = Math.ceil(pv / 3);
    switch (type) {
        case "a": return Math.max(basePv, 2);
        case "b": return Math.max(basePv + 1, 3);
        case "c": return Math.max(basePv - 1, 1);
        default: return Math.max(basePv - 2, 1);
    }
}

// Fonction pour ajouter les valeurs au tableau pvActuel
function ajouterPvActuel(pvActuel) {
    tableauPvActuel.push(pvActuel);  // Ajouter la valeur de pvActuel dans le tableau
}

// Fonction pour rendre visible mvt
function showDiv() {
    const div = document.getElementById("mvt");
    div.style.display = "block";  // Rend la div visible
}

// Fonction pour rendre invisible mvt
function hideDiv() {
    const div = document.getElementById("mvt");
    div.style.display = "none";  // Rend la div invisible
}

// Fonction de reset
function reset() {
    document.getElementById("str").value = "";
    document.getElementById("con").value = "";
    document.getElementById("tai").value = "";
    document.getElementById("dex").value = "";
    document.getElementById("int").value = "";
    document.getElementById("pou").value = "";
    document.getElementById("cha").value = "";
    
    // Réinitialiser l'affichage des caracs secondaires
    document.getElementById("pv").innerHTML = "";
    document.getElementById("vitGuer").innerHTML = "";
    document.getElementById("rangTai").innerHTML = "";
    document.getElementById("rangDex").innerHTML = "";
    document.getElementById("bonDeg").innerHTML = "";
    document.getElementById("degSpi").innerHTML = "";
    document.getElementById("enc").innerHTML = "";
    document.getElementById("pm").innerHTML = "";
    document.getElementById("agi").innerHTML = "";
    document.getElementById("com").innerHTML = "";
    document.getElementById("conn").innerHTML = "";
    document.getElementById("mag").innerHTML = "";
    document.getElementById("man").innerHTML = "";
    document.getElementById("per").innerHTML = "";
    document.getElementById("dis").innerHTML = "";
    document.getElementById("mvt").innerHTML = "";

    // Remet la première option de la liste sélectionnée
    document.getElementById("race").selectedIndex = 0;
    document.getElementById("boutonRecherche").style.display = "none";
    document.getElementById("boutonAleatoire").style.display = "none";
    document.getElementById("boutonReset").style.display = "none";

    // Remet les D6 à 0
    
    document.getElementById("strDice").innerHTML = "";
    document.getElementById("conDice").innerHTML = "";
    document.getElementById("taiDice").innerHTML = "";
    document.getElementById("dexDice").innerHTML = "";
    document.getElementById("intDice").innerHTML = "";
    document.getElementById("pouDice").innerHTML = "";
    document.getElementById("chaDice").innerHTML = "";

    for (let i = 0; i < 10; i++) {
        armBonKeys[i] = 0;
        pvTotalMbKeys[i] = 0;
    }

    effacerDivsLoca();
    hideDiv();
    // etatPerso(pv);
    effacerResume();

    // Réinitialise les états
    inconscient = false;
    mort = false;
    choc = false;
    kos = false;
    detruits = false;
    resetCondMembre();
    compteurBoutonSoin = 0;
}

window.onload = reset;

// Fonction activée lors du clic sur le bouton "atk"
document.getElementById("atk").addEventListener("click", function() {
    // Sélectionne la div parent qui contient les inputs
    let degats = document.getElementById("degats");

    // Sélectionne tous les inputs enfants de degats
    let inputs = degats.querySelectorAll("input");

    // Parcours des inputs et vérification de leur valeur
    inputs.forEach(function(input) {
        let valeur = parseFloat(input.value); // Convertir la valeur en nombre
        if (valeur > 0) {
            // Crée un élément div pour le flash
            let flash = document.createElement("div");
            flash.classList.add("flash-red");
            // Ajoute l'effet de flash au body
            document.body.appendChild(flash);
            // Joue le son d'attaque
            let atkSound = document.getElementById("atkSound");
            // Modifie le volume du son (par exemple, à 50% du volume maximum)
            atkSound.volume = 0.5;
            atkSound.play();
            // Lance une transition pour faire disparaître le flash après 0.5s
            setTimeout(function() {
                flash.classList.add("fade-out");
            }, 100);
            // Supprime le flash de l'écran après l'animation
            setTimeout(function() {
                flash.remove();
            }, 400); // 0.3s pour l'animation et 0.1s avant qu'elle commence

            // Récupération de l'index
            const raceData = raceDiceData[race];
            let id = input.id;
            let cle = parseInt(id.match(/\d+/)[0], 10); // Récupère la partie numérique de l'ID et la convertit en entier
            let loca = raceData[localisationKeys[cle]]
            // Dégâts après armure
            valeurX = valeur - tableauArmure[cle];
            valeur = Math.max(valeurX, 0);
            let degats = valeur;
            // Limitation des dégâts max
            valeur = Math.min(valeur, pvMaxKeys[cle] * 2);
            // Limite minimale
            let limiteMin = 2 * pvMaxKeys[cle]; // Limite à ne pas dépasser
            // Calcul de la nouvelle valeur tout en respectant la limite
            let nouvelleValeur = pvTotalMbKeys[cle] + valeur; // Valeur potentielle après addition
            pvTotalMbKeys[cle] = Math.min(nouvelleValeur, limiteMin); // Assurer que la valeur ne soit pas inférieure à limiteMin
            // Impact sur les PV de base
            newPv -= valeur;
            document.getElementById("pv").innerHTML = "PV Total : " + newPv + "/" + pv;
            // Ajout de la blessure au résumé
            ajouterResume(loca, valeur);
            // Ajout au tableau de dégâts
            tableauDegats.push(valeur);
            // Mettre à jour les conditions
            let pvMembre = pvMaxKeys[cle] - pvTotalMbKeys[cle];
            let pvMembreMax = pvMaxKeys[cle];
            conditionsSante(cle, degats, pvMembre, pvMembreMax);
        }
        conditionPerso();
        genererLocalisations(race);
    });
});

// Fonction pour inscrire la blessure dans le résumé
function ajouterResume(membreTouche, pertePv) {
    // Sélectionner la div avec l'ID "resume"
    const resumeDiv = document.getElementById("resume");
    // Créer une nouvelle div pour le résumé
    const nouvelleDiv = document.createElement("div");
    // Ajouter du contenu dans la nouvelle div (localisation et perte de PV)
    nouvelleDiv.textContent = `- Blessure sur ${membreTouche} de ${pertePv} points de vie`;
    nouvelleDiv.setAttribute("dataMembreTouche", membreTouche); // Stocker la localisation du membre touché dans un attribut data
    // Ajouter un style ou des classes si nécessaire
    nouvelleDiv.classList.add("resume-item");  // Vous pouvez ajouter une classe CSS pour le style
    // Ajouter la nouvelle div comme enfant de la div "resume"
    resumeDiv.appendChild(nouvelleDiv);
    // Intégration du bouton de soin
    const newButton = document.createElement("button");
    newButton.id = "boutonSoin" + compteurBoutonSoin;
    newButton.classList.add("boutonSoin");
    newButton.textContent = "Premiers soins";
    nouvelleDiv.appendChild(newButton);
    // Intégration de l'input de soin
    const newInput = document.createElement("input");
    newInput.id = "inputSoin" + compteurBoutonSoin;
    newInput.className = "inputSoin";
    newInput.type = "number";
    newInput.value = 0;
    nouvelleDiv.appendChild(newInput)
    // Intégration de la checkbox
    const soinDiv = document.createElement("div");
    soinDiv.className = "soinDivSoin";
    soinDiv.id = "soinDiv" + compteurBoutonSoin;
    soinDiv.hidden = true;
    nouvelleDiv.appendChild(soinDiv);
    compteurBoutonSoin += 1;

    // Ajouter un écouteur d'événement à chaque bouton
    newButton.addEventListener("click", function() {
        const raceData = raceDiceData[race];
        let id = newButton.id;
        let cle = parseInt(id.match(/\d+/)[0], 10); // Récupère la partie numérique de l'ID et la convertit en entier
        let inputValue = parseInt(document.getElementById("inputSoin" + cle).value);
        let degatBlessure = tableauDegats[cle];
        inputValue = Math.min(inputValue, degatBlessure);
        if (inputValue >= 0) {
            // Crée un élément div pour le flash
            let flash = document.createElement("div");
            flash.classList.add("flashGreen");
            // Ajoute l'effet de flash au body
            document.body.appendChild(flash);
            // Joue le son d'attaque
            let soinSound = document.getElementById("soinSound");
            // Modifie le volume du son (par exemple, à 50% du volume maximum)
            soinSound.volume = 0.5;
            soinSound.play();
            // Lance une transition pour faire disparaître le flash après 0.5s
            setTimeout(function() {
                flash.classList.add("fade-out");
            }, 100);
            // Supprime le flash de l'écran après l'animation
            setTimeout(function() {
                flash.remove();
            }, 400); // 0.3s pour l'animation et 0.1s avant qu'elle commence

            document.getElementById("soinDiv" + cle).textContent = "Soigné de " + inputValue + " PV.";
            document.getElementById("soinDiv" + cle).hidden = false;
        } else {
            // Crée un élément div pour le flash
            let flash = document.createElement("div");
            flash.classList.add("flash-red");
            // Ajoute l'effet de flash au body
            document.body.appendChild(flash);
            // Joue le son d'attaque
            let sonDouleur = document.getElementById("sonDouleur");
            // Modifie le volume du son (par exemple, à 50% du volume maximum)
            sonDouleur.volume = 0.5;
            sonDouleur.play();
            // Lance une transition pour faire disparaître le flash après 0.5s
            setTimeout(function() {
                flash.classList.add("fade-out");
            }, 100);
            // Supprime le flash de l'écran après l'animation
            setTimeout(function() {
                flash.remove();
            }, 400); // 0.3s pour l'animation et 0.1s avant qu'elle commence

            document.getElementById("soinDiv" + cle).textContent = "Blessure aggravée de " + -inputValue + " PV.";
            document.getElementById("soinDiv" + cle).hidden = false;
        }
        // Récupérer le membre touché
        let membreTouche = nouvelleDiv.getAttribute("dataMembreTouche");
        let index = localisationKeys.findIndex(key => raceData[key] === membreTouche);
        // Impact sur les PV de base
        newPv += inputValue;
        blessureSoin = inputValue;
        document.getElementById("pv").innerHTML = "PV Total : " + newPv + "/" + pv;
        document.getElementById("inputSoin" + cle).value = 0;
        // Modifier les PV du membre blessé
        pvTotalMbKeys[index] -= inputValue;
        newButton.disabled = true;
        newButton.classList.add("boutonStop");
        newButton.classList.remove("boutonSoin");
        conditionPerso();
        genererLocalisations(race);
    });
}

function effacerResume() {
    // Sélectionner toutes les divs avec la classe "resume-item"
    const resumeItems = document.querySelectorAll('.resume-item');

    // Parcourir tous les éléments et les supprimer du DOM
    resumeItems.forEach(item => {
        item.remove();
    });
}

// Fonction pour le bouton clear résumé
document.getElementById("resetResume").addEventListener("click", function() {
    effacerResume()
})

// Modale de guérison
// Sélectionne les éléments
let modal = document.getElementById("myModal");
let openModalBtn = document.getElementById("soinHub");
let closeModalBtn = document.getElementById("closeModalBtn");

// Lorsque l'utilisateur clique sur le bouton, afficher le modal
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
    remplirModal(race);
});

// Lorsque l'utilisateur clique sur le bouton de fermeture (X), cacher le modal
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Si l'utilisateur clique en dehors du modal, fermer le modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Fonction pour remplir la modale
function remplirModal(race) {
    const raceData = raceDiceData[race];  // Récupérer les données de la race sélectionnée
    
    // Parcourir les localisations (de 1 à 10)
    for (let i = 1; i <= 10; i++) {
        const key = `loca${i}`;  // Générer la clé (loca1, loca2, etc.)
        const localisation = raceData[key];  // Accéder à la localisation correspondante

        if (localisation !== "") {
            let modal = document.getElementById("modal" + i);

            if (modal) {
                // Réinitialise le contenu de la modal avant de la remplir
                modal.innerHTML = "";

                // Crée un nouvel élément div pour la localisation
                let locaModal = document.createElement("div");
                locaModal.textContent = localisation;
                // Ajouter du style ou des classes si nécessaire
                locaModal.classList.add("localisation-item");
                // Ajouter le nouveau contenu à la modale
                modal.appendChild(locaModal);

                // Crée un nouvel input pour la localisation
                let modalInput = document.createElement("input");
                modalInput.type = "number";
                modalInput.value = 0;
                modalInput.className = "modalInput";
                let y = i - 1;
                modalInput.id = "modalInput" + y;
                modal.appendChild(modalInput);
            }
        }
    }
}

// Fonction de soin via modale
function soinModal() {
    let inputSoins = document.querySelectorAll(".modalInput");
    let soins = 0;  // Initialiser la variable "soins" à 0
    // Parcourir les inputs et additionner leurs valeurs
    inputSoins.forEach(function(input) {
        let valeur = parseFloat(input.value) || 0;  // Convertir la valeur en nombre, ou 0 si c'est vide
        // Récupérer l'ID de l'input
        let inputId = input.id;
        let cle = parseInt(inputId.match(/\d+/)[0], 10);
        pvTotalMbKeys[cle] -= Math.min(valeur, pvTotalMbKeys[cle]);

        soins += valeur;  // Ajouter la valeur à la variable "soins"
        input.value = 0;
    });
    // Soin des PV globaux
    let maxSoin = pv - newPv;
    newPv += Math.min(soins, maxSoin);
    genererLocalisations(race);
    document.getElementById("pv").innerHTML = "PV Total : " + newPv + "/" + pv;
}

// Bouton de soin dans la modale
let boutonSoinModal = document.getElementById("boutonModale");
boutonSoinModal.addEventListener("click", function() {
    soinModal();
    conditionPerso();

    // Crée un élément div pour le flash
    let flash = document.createElement("div");
    flash.classList.add("flashGreen");
    // Ajoute l'effet de flash au body
    document.body.appendChild(flash);
    // Joue le son d'attaque
    let soinSound = document.getElementById("soinSound");
    // Modifie le volume du son (par exemple, à 50% du volume maximum)
    soinSound.volume = 0.5;
    soinSound.play();
    // Lance une transition pour faire disparaître le flash après 0.5s
    setTimeout(function() {
        flash.classList.add("fade-out");
    }, 100);
    // Supprime le flash de l'écran après l'animation
    setTimeout(function() {
        flash.remove();
    }, 400); // 0.3s pour l'animation et 0.1s avant qu'elle commence
})

// Fonction de mise à jour du tableau armBonKeys
function mettreAJourArmBon(input) {
    if (input) {
        let valeur = parseInt(input.value) || 0;  // Convertir en nombre, ou 0 si la valeur n'est pas valide
        let id = input.id;
        // Extraire la partie numérique de l'ID (par exemple, '1' à partir de 'armBon1')
        let cle = parseInt(id.match(/\d+/)[0], 10); // Convertit l'ID en index pour le tableau armBonKeys
        armBonKeys[cle] = valeur;  // Mettre à jour la valeur dans armBonKeys à l'index correspondant
    }
}
document.getElementById("majArmure").addEventListener("click", function() {
    for (let i = 0; i <= 10; i++) {
        let input = document.getElementById("armBonId" + i);
        mettreAJourArmBon(input);
    }
    genererLocalisations(race);
});

// Fonction pour mettre à jour les conditions des membres
function conditionsSante(cle, degats, pvMembre, pvMembreMax) {
    const raceData = raceDiceData[race];  // Récupérer les données pour la race actuelle
    let importLoca = raceData[importKeys[cle]];
    spanConId = "conId" + cle;
    if (membreTranche[cle] == true) {
        contenuCondition[cle] = "Ouch mauvais signe";
        titreCondition[cle] = "Membre tranché";
    } else {
        if (degats >= 3 * pvMembreMax) {
            if (importLoca == "i") {
                ko[cle] = true;
                membreTranche[cle] = true;
            } else {
                detruit[cle] = true;
                contenuCondition[cle] = "Il est toujours temps de prier";
                titreCondition[cle] = "Mort sur le coup";
            }
        } else if (degats >= 2 * pvMembreMax) {
            if (importLoca == "i") {
                detruit[cle] = false;
                // membre inutilisable
                console.log("membre inutilisable");
            } else {
                detruit[cle] = false;
                ko[cle] = true;
                // hemorragie
                console.log("hemorragie");
            }
        } else if (pvMembre <= -pvMembreMax) {
            if (importLoca == "i") {
                detruit[cle] = false;
                ko[cle] = false;
                // membre inutilisable
                console.log("membre inutilisable");
            } else {
                detruit[cle] = false;
                ko[cle] = true;
                // hemorragie
                console.log("hemorragie");
            }
        } else if (pvMembre <= 0) {
            if (importLoca == "i") {
                detruit[cle] = false;
                ko[cle] = false;
                // membre inutilisable
                console.log("membre inutilisable");
            } else if (importLoca == "ik") {
                detruit[cle] = false;
                ko[cle] = false;
                // jambes inutilisables
                console.log("jambes inutilisables");
            } else if (importLoca == "h") {
                detruit[cle] = false;
                ko[cle] = false;
                contenuCondition[cle] = "Vous toussez du sang !";
                titreCondition[cle] = "hemorragie interne";
            } else {
                detruit[cle] = false;
                ko[cle] = true;
                console.log("ko");
            }
        } else if (pvMembre > 0){
            detruit[cle] = false;
            ko[cle] = false;
            contenuCondition[cle] = "Tout va bien !";
            titreCondition[cle] = "Normal";
            console.log("Normal");
        }}
}

// Fponction pour remettre à zéro les conditions des membres
function resetCondMembre() {
    for (let i = 0; i < 10; i++) {
        // Utilisation de l'index numérique i pour les objets detruit, ko, etc.
        detruit[i] = false;
        ko[i] = false;
        membreTranche[i] = false;
    }
}

// Fonction pour la condition générale
function conditionPerso() {
    // Vérifie si au moins un élément du tableau ko est `true`
    let kos = ko.some(function(val) {
        return val === true;
    });
    // Vérifie si au moins un élément du tableau detruit est `true`
    let detruits = detruit.some(function(val) {
        return val === true;
    });

    // Réinitialisation des états mort et inconscient
    mort = false;
    inconscient = false;

    // Priorité aux conditions : PV <= 0 d'abord
    if (newPv <= 0) {
        mort = true;
    }
    if (newPv <= 2) {
        inconscient = true;
    }
    if (detruits == true) {
        mort = true;
    }
    if (kos == true) {
        inconscient = true;
    }

    // Mise à jour des éléments DOM
    let vie = document.getElementById("mort");
    let inconsc = document.getElementById("inconsc");

    vie.textContent = mort ? "Mort" : "Vivant";
    inconsc.textContent = inconscient ? "Inconscient" : "Conscient";
}


