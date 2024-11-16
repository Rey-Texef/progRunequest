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
let compCombat = 0;
let bonusDegats = 0;
let rangCac = 0;
let rangDist = 0;

// Sélectionner les éléments HTML où insérer les localisations
const locaDiv = document.getElementById("loca");
const dVingtDiv = document.getElementById("dVingt");
const armDiv = document.getElementById("arm");
const pvDiv = document.getElementById("pvLoca");
const armBonDiv = document.getElementById("armBon");
const degDiv = document.getElementById("degats");
const conDiv = document.getElementById("condition");
const armeDiv = document.getElementById("arme");
const compDiv = document.getElementById("pourcent");
const degatsDiv = document.getElementById("degatArme");
const rangDiv = document.getElementById("ra");
const duraDiv = document.getElementById("dura");

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
const armeKeys = ["arme1", "arme2", "arme3", "arme4", "arme5", "arme6", "arme7", "arme8", "arme9", "arme10"];
const armeDescriptionKeys = ["armeD1", "armeD2", "armeD3", "armeD4", "armeD5", "armeD6", "armeD7", "armeD8", "armeD9", "armeD10"];
const compKeys = ["comp1", "comp2", "comp3", "comp4", "comp5", "comp6", "comp7", "comp8", "comp9", "comp10"];
const degatsKeys = ["deg1", "deg2", "deg3", "deg4", "deg5", "deg6", "deg7", "deg8", "deg9", "deg10"];
const lanceKeys = ["lance1", "lance2", "lance3", "lance4", "lance5", "lance6", "lance7", "lance8", "lance9", "lance10"];
const rangKeys = ["rg1", "rg2", "rg3", "rg4", "rg5", "rg6", "rg7", "rg8", "rg9", "rg10"];
const distanceKeys = ["distance1", "distance2", "distance3", "distance4", "distance5", "distance6", "distance7", "distance8", "distance9", "distance10"];
const duraKeys =["dura1", "dura2", "dura3", "dura4", "dura5", "dura6", "dura7", "dura8", "dura9", "dura10"];
let armBonKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pvTotalMbKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pvMaxKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tableauArmure = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tableauDegats = [];
durabilityKeys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let ko = [false, false, false, false, false, false, false, false, false, false];
let detruit = [false, false, false, false, false, false, false, false, false, false];
let contenuCondition = ["Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !", "Tout va bien !"];
let titreCondition = ["Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal", "Normal"];
let membreTranche = [false, false, false, false, false, false, false, false, false, false];
let choc = [false, false, false, false, false, false, false, false, false, false];
let oneShot = [false, false, false, false, false, false, false, false, false, false];
let compKey = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let titreOnglet = document.getElementById("titreOnglet");

let raceDiceData;  // Variable globale pour stocker les données du JSON

// Selection de la catégorie via l'input radio
document.querySelectorAll('input[name="option"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        miniReset();
        const selectedValue = radio.value;
        loadRaceData("reset");
        switch (selectedValue) {
            case "option1":
                loadRaceData("races.json");
                break;
            case "option2":
                loadRaceData("chaos.json");
                break;
            case "option3":
                loadRaceData("monster.json");
                break;
            case "option4":
                loadRaceData("arthro.json");
                break;
            case "option5":
                loadRaceData("animal.json");
                break;
            case "option6":
                loadRaceData("spirit.json");
                break;
            case "option7":
                loadRaceData("terror.json");
                break;
            default:
                // Bloc de code exécuté si aucune des valeurs ne correspond
        }
    });
});

// Fonction pour charger les données du fichier JSON
function loadRaceData(fileJson) {
    // Vérifie si l'argument est 'reset'
    if (fileJson === 'reset') {
        raceDiceData = null;  // Vide raceDiceData
        const raceSelect = document.getElementById("race");
        raceSelect.innerHTML = '<option value="">-- Sélectionnez une race --</option>';
        return;  // Sort de la fonction
    }

    // Si l'argument n'est pas 'reset', continue le chargement des données
    return fetch(fileJson)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier JSON');
            }
            return response.json();
        })
        .then(data => {
            raceDiceData = data;  // Stocke les données dans la variable globale
            populateRaceDropdown();  // Appelle la fonction pour remplir la liste déroulante
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

// Fonction récursive pour créer la liste déroulante avec optgroup imbriqués
function createOptions(parentElement, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];

            if (typeof item === 'object' && !item.str) {  // Vérifie si l'item est un objet sans attributs de race
                // Crée un optgroup pour la catégorie ou sous-catégorie
                const optgroup = document.createElement("optgroup");
                optgroup.label = key;

                // Appelle récursivement la fonction pour les sous-catégories ou races dans la catégorie actuelle
                createOptions(optgroup, item);

                // Ajoute le groupe d'options à l'élément parent
                parentElement.appendChild(optgroup);
            } else {
                // Crée une option pour la race
                const option = document.createElement("option");
                option.value = key;
                option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                parentElement.appendChild(option);
            }
        }
    }
}

// Fonction pour remplir la liste déroulante avec les données JSON
function populateRaceDropdown() {
    const raceSelect = document.getElementById("race");
    raceSelect.innerHTML = '<option value="">-- Sélectionnez une race --</option>';

    // Appelle la fonction récursive avec l'élément de base (select) et les données JSON
    createOptions(raceSelect, raceDiceData);
}

// Fonction récursive pour retrouver les données d'une race par son nom, même si elle est dans une sous-catégorie
function findRaceData(raceName, data) {
    if (data[raceName]) {
        return data[raceName];
    }

    for (const key in data) {
        if (typeof data[key] === 'object') {
            const result = findRaceData(raceName, data[key]);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

// Fonction pour afficher les dés selon la race
function afficherDes(race) {
    const raceData = findRaceData(race, raceDiceData);  // Utilise findRaceData pour rechercher la race

    if (raceData) {
        // Appliquer les valeurs des dés aux divs
        document.getElementById("strDice").innerHTML = raceData.str || "Valeur non définie";
        document.getElementById("conDice").innerHTML = raceData.con || "Valeur non définie";
        document.getElementById("taiDice").innerHTML = raceData.tai || "Valeur non définie";
        document.getElementById("dexDice").innerHTML = raceData.dex || "Valeur non définie";
        document.getElementById("intDice").innerHTML = raceData.int || "Valeur non définie";
        document.getElementById("pouDice").innerHTML = raceData.pou || "Valeur non définie";
        document.getElementById("chaDice").innerHTML = raceData.cha || "Valeur non définie";
    } else {
        console.log("Les données de dés pour la race sélectionnée ne sont pas disponibles.");
    }
}


// Fonction pour récupérer la race et afficher les dés en conséquence
document.getElementById("race").addEventListener("change", function() {
    race = this.value;
    afficherDes(race);
    affichDura(race);
    genererLocalisations(race);
    document.getElementById("boutonRecherche").style.display = "inline-block";
    document.getElementById("boutonAleatoire").style.display = "inline-block";
    document.getElementById("boutonReset").style.display = "inline-block";
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
        pvTai = 5 + Math.floor((tai - 29) / 4);
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
        pvPou = 4 + Math.floor((pou - 29) / 4);
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
        vitGuer = 7 + Math.floor((con - 37) / 6);
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
    const bonDeg = calculBonusDegats(forTai, [13, 25, 33, 41, 57, 73, 89, 105, 121, 137, 153, 169, 185, 201, 217, 233, 249, 265], ["-1D4", "0", "1D4", "1D6", "2D6", "3D6", "4D6", "5D6", "6D6", "7D6", "8D6", "9D6", "10D6", "11D6", "12D6", "13D6", "14D6", "15D6"]);
    const degSpi = calculBonusDegats(pouCha, [13, 25, 33, 41, 57, 73, 89, 105], ["1D3", "1D6", "1D6+1", "1D6+3", "2D6+3", "3D6+4", "4D6+5", "5D6+6", "6D6+7"]);

    // Affichage des résultats
    document.getElementById("rangTai").innerHTML = "Rang d'action de Tai : " + rangTai;
    document.getElementById("rangDex").innerHTML = "Rang d'action de Dex : " + rangDex;
    rangCac = rangTai + rangDex;
    rangDist = rangDex;
    document.getElementById("bonDeg").innerHTML = "Bonus aux dégâts : " + bonDeg;
    bonusDegats = bonDeg;
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

    // Récupération de l'armure et du mouvement
    // Récupérer directement les données de la race en utilisant findRaceData
    const raceData = findRaceData(race, raceDiceData);  
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }
    mvt = raceData.deplac;
    arm = raceData.armure;
    page = raceData.page;

    // Affichage des résultats
    document.getElementById("enc").innerHTML = "Encombrement maximal : " + enc;
    document.getElementById("pm").innerHTML = "Points de magie : " + pm;
    document.getElementById("mvt").innerHTML = "Déplacement : " + mvt;
    document.getElementById("armure").innerHTML = "Armure : " + arm;
    document.getElementById("page").innerHTML = "Page : " + page;

    // Afficher la section
    let visible = true;
    showDiv(visible);
}


// Fonction d'affichage des mods de compétences
function afficherModComp() {
    // Récupérer les valeurs des champs
    const { tai, dex, str, pou, cha, int } = recupVal();

    // Initialisation des modificateurs
    let agi = 0, com = 0, conn = 0, mag = 0, man = 0;

    // Seuils et modificateurs
    // Générer les seuils jusqu'à 201
    const seuils = genererSeuils(5, 4, 201);
    // Modificateurs de base
    const baseUnMods = [-5, 0, 0, 0, 5, 10, 15, 20];
    const baseDeMods = [-10, -5, 0, 5, 10, 15, 20, 25];
    const baseTrMods = [10, 5, 0, -5, -10, -15, -20, -25];
    const baseQuMods = [5, 0, 0, 0, -5, -10, -15, -20];
    
    // Étendre les modificateurs avec la progression constante (delta)
    const UnMods = etendreModificateurs(baseUnMods, 5, seuils.length);
    const DeMods = etendreModificateurs(baseDeMods, 5, seuils.length);
    const TrMods = etendreModificateurs(baseTrMods, -5, seuils.length);
    const QuMods = etendreModificateurs(baseQuMods, -5, seuils.length);

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
    compCombat = man;
    document.getElementById("per").innerHTML = "Mod Perception : " + per;
    document.getElementById("dis").innerHTML = "Mod Discrétion : " + dis;
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
    affichDura(race);
    genererLocalisations(race);
    conditionPerso();
});

// Fonction pour générer un nombre entier aléatoire entre min et max inclus
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour lancer des dés, par exemple '3d6', '2d6+6', ou '3d6*2'
function lancerDes(diceStr) {
    // Si diceStr est un nombre, on retourne directement ce nombre
    if (!isNaN(diceStr)) {
        return Number(diceStr);
    }

    // Regex pour parser des types comme '3d6*2', '3d6+6' ou '3d6'
    const diceRegex = /(\d+)d(\d+)([+-]\d+)?(\*\d+)?/;
    const matches = diceStr.match(diceRegex);

    if (matches) {
        const nbDes = parseInt(matches[1]);     // Nombre de dés à lancer
        const faces = parseInt(matches[2]);     // Nombre de faces du dé
        const modificateur = parseInt(matches[3]) || 0; // Modificateur optionnel (+ ou - un nombre)
        const multiplicateur = matches[4] ? parseInt(matches[4].slice(1)) : 1; // Multiplicateur optionnel

        let resultats = [];
        let total = 0;

        // Lancer un dé supplémentaire
        const nbDesLances = nbDes + 1;

        for (let i = 0; i < nbDesLances; i++) {
            resultats.push(getRandomInt(1, faces));   // Lancer chaque dé
        }

        // Retirer le plus bas
        const minValeur = Math.min(...resultats);  // Trouver le plus petit résultat
        resultats.splice(resultats.indexOf(minValeur), 1);  // Retirer le plus petit

        // Calculer la somme des dés restants
        total = resultats.reduce((acc, val) => acc + val, 0) + modificateur;

        // Appliquer le multiplicateur
        total *= multiplicateur;

        return total;
    } else {
        return 0;  // Renvoie 0 en cas de format incorrect
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
    affichDura(race);
    genererLocalisations(race);
    conditionPerso();
});

// Bouton reset pour remettre à zero
document.getElementById("boutonReset").addEventListener("click", reset);

//Fonction pour générer les tableaux
function genererLocalisations(race) {
    // Récupérer directement les données de la race en utilisant findRaceData
    const raceData = findRaceData(race, raceDiceData);  
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }

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

    for (let i = 1; i <= 10; i++) {
        // Tableau des localisations
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
        conditionsSante(x, 0, pvActuel, pvMax);
        
        // Tableau des armes
        let armeId = "armeId" + x;
        let compId = "compId" + x;
        let degatId = "degatId" + x;
        let rangId = "rangId" + x;
        let duraId = "duraId" + x;
        const armeKey = raceData[armeKeys[x]];
        const armeDescriptionKey = raceData[armeDescriptionKeys[x]];
        const distKey = raceData[distanceKeys[x]];
        const rangArme = raceData[rangKeys[x]];
        let rangKey = 0;
        let degatsKey = 0;
        if (distKey == true) {
            rangKey = rangArme + rangDist;
        } else {
            rangKey = rangArme + rangCac;
        }
        const lanceKey = raceData[lanceKeys[x]];
        if (lanceKey == false && distKey == true) {
            degatsKey = raceData[degatsKeys[x]];
        } else if (lanceKey == true && distKey == true) {
            degatsKey = raceData[degatsKeys[x]] + " + " + bonusDegats + "/2";
        } else {
            degatsKey = raceData[degatsKeys[x]] + " + " + bonusDegats;
        }

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
        if (armeKey != "") {
            // Créer une case pour l'arme
            ajouterCelluleSpan(armeDiv, armeDescriptionKey, armeKey, armeId);
            // Créer une case pour la comp
            ajouterInput(compDiv, compKey[x], compId);
            // Créer une case pour les dégâts
            ajouterCellule(degatsDiv, degatsKey, degatId);
            // Créer une case pour l'init
            ajouterCellule(rangDiv, rangKey, rangId);
            // Créer une case pour la durabilité
            ajouterInput(duraDiv, durabilityKeys[x], duraId);
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
        case "0": return Math.max(basePv, 2);
        case "P1": return Math.max(basePv + 1, 3);
        case "P2": return Math.max(basePv + 2, 4);
        case "P3": return Math.max(basePv + 3, 5);
        case "P4": return Math.max(basePv + 4, 6);
        case "P5": return Math.max(basePv + 5, 7);
        case "M1": return Math.max(basePv - 1, 1);
        default: return Math.max(basePv - 2, 1);
    }
}

// Fonction pour ajouter les valeurs au tableau pvActuel
function ajouterPvActuel(pvActuel) {
    tableauPvActuel.push(pvActuel);  // Ajouter la valeur de pvActuel dans le tableau
}

// Fonction pour rendre les div 'mvt' et 'armure' visible ou invisible
function showDiv(visible) {
    const div = document.getElementById("mvt");
    const div2 = document.getElementById("armure");
    const div3 = document.getElementById("page");
    if (visible) {
        div.style.display = "block";  // Rend la div visible
        div2.style.display = "block";  // Rend la div visible
        div3.style.display = "block";  // Rend la div visible
    } else {
        div.style.display = "none";   // Cache la div
        div2.style.display = "none";   // Cache la div
        div3.style.display = "none";   // Cache la div
    }
}

// Fonction de reset
function miniReset() {
    document.getElementById("str").value = "";
    document.getElementById("con").value = "";
    document.getElementById("tai").value = "";
    document.getElementById("dex").value = "";
    document.getElementById("int").value = "";
    document.getElementById("pou").value = "";
    document.getElementById("cha").value = "";
    document.getElementById("inpuText").value = "";
    
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
        ko[i] = false;
        durabilityKeys[i] = 0;
        compKey[i] = 0;
    }

    effacerDivsLoca();
    let visible = false;
    showDiv(visible);
    // etatPerso(pv);
    effacerResume();
    titreOnglet.textContent = "Runequest-Gestion PNJ";

    // Réinitialise les états
    inconscient = false;
    mort = false;
    kos = false;
    detruits = false;
    resetCondMembre();
    compteurBoutonSoin = 0;
    conditionPerso();
    compCombat = 0;
    bonusDegats = 0;
    rangCac = 0;
    rangDist = 0;
}
function reset() {
    miniReset();
    // Décochage des options
    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach(radio => radio.checked = false);  // Désélectionner toutes les options
    loadRaceData("reset");
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
            sound("atkSound", "flash-red");

            // Récupération de l'index
            // Récupérer directement les données de la race en utilisant findRaceData
            const raceData = findRaceData(race, raceDiceData);  
            if (!raceData) {
                console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
                return;
            }
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
        const raceData = findRaceData(race, raceDiceData);  
        if (!raceData) {
            console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
            return;
        }
        let id = newButton.id;
        let cle = parseInt(id.match(/\d+/)[0], 10); // Récupère la partie numérique de l'ID et la convertit en entier
        let inputValue = parseInt(document.getElementById("inputSoin" + cle).value);
        let degatBlessure = tableauDegats[cle];
        inputValue = Math.min(inputValue, degatBlessure);
        if (inputValue > 0) {
            sound("soinSound", "flashGreen");
            document.getElementById("soinDiv" + cle).textContent = "Soigné de " + inputValue + " PV.";
            document.getElementById("soinDiv" + cle).hidden = false;
        } else if (inputValue == 0) {
            sound("soinSound", "flashGreen");
            document.getElementById("soinDiv" + cle).textContent = "Blessure stabilisée.";
            document.getElementById("soinDiv" + cle).hidden = false;
        } else {
            sound("sonDouleur", "flash-red");
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
        newPvMembre = pvTotalMbKeys[index] - inputValue;
        pvTotalMbKeys[index] = Math.max(newPvMembre, 0);
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
    modal.style.display = "flex";
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
    const raceData = findRaceData(race, raceDiceData);  
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }
    
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
    sound("soinSound", "flashGreen");
})

// Fonction de mise à jour du tableau armBonKeys
function mettreAJourArmBon(input, input2, input3) {
    if (input) {
        let valeur = parseInt(input.value) || 0;  // Convertir en nombre, ou 0 si la valeur n'est pas valide
        let id = input.id;
        // Extraire la partie numérique de l'ID (par exemple, '1' à partir de 'armBon1')
        let cle = parseInt(id.match(/\d+/)[0], 10); // Convertit l'ID en index pour le tableau armBonKeys
        armBonKeys[cle] = valeur;  // Mettre à jour la valeur dans armBonKeys à l'index correspondant
    }
    if (input2) {
        let valeur = parseInt(input2.value) || 0;  // Convertir en nombre, ou 0 si la valeur n'est pas valide
        let id = input2.id;
        // Extraire la partie numérique de l'ID (par exemple, '1' à partir de 'dura1')
        let cle = parseInt(id.match(/\d+/)[0], 10); // Convertit l'ID en index pour le tableau durabilityKeys
        durabilityKeys[cle] = valeur;  // Mettre à jour la valeur dans durabilityKeys à l'index correspondant
    }
    if (input3) {
        let valeur = parseInt(input3.value) || 0;  // Convertir en nombre, ou 0 si la valeur n'est pas valide
        let id = input3.id;
        // Extraire la partie numérique de l'ID (par exemple, '1' à partir de 'dura1')
        let cle = parseInt(id.match(/\d+/)[0], 10); // Convertit l'ID en index pour le tableau compKey
        compKey[cle] = valeur;  // Mettre à jour la valeur dans compKey à l'index correspondant
    }
}
document.getElementById("majArmure").addEventListener("click", function() {
    for (let i = 0; i <= 10; i++) {
        let input = document.getElementById("armBonId" + i);
        let input2 = document.getElementById("duraId" + i);
        let input3 = document.getElementById("compId" + i);
        mettreAJourArmBon(input, input2, input3);
    }
    genererLocalisations(race);
});

// Fonction pour mettre à jour les conditions des membres
function conditionsSante(cle, degats, pvMembre, pvMembreMax) {
    
    // Récupérer directement les données de la race en utilisant findRaceData
    const raceData = findRaceData(race, raceDiceData);  
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }
    let importLoca = raceData[importKeys[cle]];
    spanConId = "conId" + cle;
    if (degats >= 3 * pvMembreMax) {
        if (importLoca === "i") {
            ko[cle] = true;
            membreTranche[cle] = true;
            detruit[cle] = false;
        } else {
            detruit[cle] = true;
            ko[cle] = true;
            oneShot[cle] = true;
        }
    } else if (degats >= 2 * pvMembreMax) {
        if (importLoca === "i") {
            // membre inutilisable
            detruit[cle] = false;
            choc[cle] = true;
        } else {
            // hemorragie
            detruit[cle] = false;
            ko[cle] = true;
            contenuCondition[cle] = "L'aventurier tombe inconscient et commence à perdre 1 point de vie par round à moins d'être traité ou de recevoir les Premiers soins.";
            titreCondition[cle] = "Blessure importante";
        }
    } else if (pvMembre <= -pvMembreMax) {
        if (importLoca === "i") {
            // membre inutilisable
            detruit[cle] = false;
            ko[cle] = false;
            contenuCondition[cle] = "Le membre est inutilisable. S'il s'agit d'une jambe l'aventurier s'effondre, il ne peut rien faire d'autre durant ce round. L'aventurier peut combattre au sol au cours des rounds suivants. Un aventurier com- battant au sol voit toutes ses chances d'attaque divisées par deux. Les chances de parade sont cependant inchangées. Quiconque combat un adversaire au sol bénéficie d'un bonus de +40 % à son attaque.";
            titreCondition[cle] = "Membre inutilisable";
        } else {
            // hemorragie
            detruit[cle] = false;
            ko[cle] = true;
            contenuCondition[cle] = "L'aventurier tombe inconscient et commence à perdre 1 point de vie par round à moins d'être traité ou de recevoir les Premiers soins.";
            titreCondition[cle] = "Blessure importante";
        }
    } else if (pvMembre <= 0) {
        if (importLoca === "i") {
            // membre inutilisable
            detruit[cle] = false;
            ko[cle] = false;
            contenuCondition[cle] = "Le membre est inutilisable. S'il s'agit d'une jambe l'aventurier s'effondre, il ne peut rien faire d'autre durant ce round. L'aventurier peut combattre au sol au cours des rounds suivants. Un aventurier combattant au sol voit toutes ses chances d'attaque divisées par deux. Les chances de parade sont cependant inchangées. Quiconque combat un adversaire au sol bénéficie d'un bonus de +40 % à son attaque.";
            titreCondition[cle] = "Membre inutilisable";
        } else if (importLoca === "ik") {
            // jambes inutilisables
            detruit[cle] = false;
            ko[cle] = false;
            contenuCondition[cle] = "Les deux jambes sont inutilisables et l'aventurier tombe au sol. L'aventurier peut combattre au sol au cours des rounds suivants. Si l'aventurier dispose des moyens de se soigner lui-même par la magie ou via Premiers soins (cf. page 149), il peut le faire. S'il n'est pas traité ou ne reçoit pas les Premiers soins dans les dix minutes qui suivent, il mourra des suites de l'hémorragie.";
            titreCondition[cle] = "Au sol et hémorragie";
        } else if (importLoca === "h") {
            detruit[cle] = false;
            ko[cle] = false;
            contenuCondition[cle] = "L'aventurier tombe et est trop occupé à tousser et à cracher du sang pour faire quoi que ce soit. Il meurt d'hémorragie dans les dix minutes si le saignement n'est pas endigué par Premiers soins. L'aventurier ne peut pas agir, ni se soigner.";
            titreCondition[cle] = "hemorragie interne";
        } else {
            detruit[cle] = false;
            ko[cle] = true;
            contenuCondition[cle] = "l'aventurier est inconscient et doit être traité ou recevoir les Premiers soins dans les cinq minutes (un tour complet) ou mourir.";
            titreCondition[cle] = "Assomé";
        }
    } else if (pvMembre > 0){
        detruit[cle] = false;
        ko[cle] = false;
        contenuCondition[cle] = "Tout va bien !";
        titreCondition[cle] = "Normal";
    }

    if (membreTranche[cle] == true) {
        contenuCondition[cle] = "Le membre est tranché, estropié, et l'aventurier hors combat.";
        titreCondition[cle] = "Membre tranché";
    } else if (choc[cle] == true) {
        contenuCondition[cle] = "Ne peut plus combattre jusqu'à ce qu'il soit soigné et se trouve en état de choc. Il peut essayer de se soigner lui-même.";
        titreCondition[cle] = "Membre inutilisable et choc";
    }

    if (oneShot[cle] == true) {
        contenuCondition[cle] = "L'aventurier meurt sur le coup.";
        titreCondition[cle] = "Mort sur le coup";
        detruit[cle] = true;
    }
}

// Fonction pour remettre à zéro les conditions des membres
function resetCondMembre() {
    for (let i = 0; i < 10; i++) {
        // Utilisation de l'index numérique i pour les objets detruit, ko, etc.
        detruit[i] = false;
        ko[i] = false;
        membreTranche[i] = false;
        choc[i] = false;
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

// Générer les seuils
function genererSeuils(initial, intervalle, max) {
    let seuils = [];
    for (let i = initial; i <= max; i += intervalle) {
        seuils.push(i);
    }
    return seuils;
}

// Fonction pour étendre les modificateurs avec une progression constante
function etendreModificateurs(baseMods, delta, steps) {
    let mods = [...baseMods]; // Démarrer avec les valeurs de base

    for (let i = baseMods.length; i < steps; i++) {
        let nextValue = mods[mods.length - 1] + delta;
        mods.push(nextValue);
    }

    return mods;
}

// Fonction de son
function sound(son, classFlash) {
    // Crée un élément div pour le flash
    let flash = document.createElement("div");
    flash.classList.add(classFlash);
    // Ajoute l'effet de flash au body
    document.body.appendChild(flash);
    // Joue le son d'attaque
    let sonDouleur = document.getElementById(son);
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
}

// Fonction pour afficher les durabilités de base des armes
function affichDura(race) {
    // Récupérer directement les données de la race en utilisant findRaceData
    const raceData = findRaceData(race, raceDiceData);  
    if (!raceData) {
        console.log("Impossible de générer les localisations : les données de race ne sont pas définies.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        durabilityKeys[i] = raceData[duraKeys[i]];
        compKey[i] = raceData[compKeys[i]] + compCombat;
    }
}

// Modification du titre de l'onglet en fonction du nom du perso
document.getElementById("boutonNom").addEventListener("click", function () {
    let nomPerso = document.getElementById("inpuText").value;
    titreOnglet.textContent = nomPerso;
})