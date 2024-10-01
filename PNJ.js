// Etat du perso
let inconscient = false;
let mort = false;

// Fonction pour réinitialiser les valeurs lors du chargement de la page
window.onload = function() {
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

    effacerDivsLoca()
    hideDiv()

    // Réinitialise les états
    inconscient = false;
    mort = false;
}

// Données de dés en fonction des races
const raceDiceData = {
    "humain": {
        str: "3d6",
        con: "3d6",
        tai: "2d6+6",
        dex: "3d6",
        int: "2d6+6",
        pou: "3d6",
        cha: "3d6",
        armure: "0",
        deplac: "8",
        page: "*",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "coureur": {
        str: "2d6",
        con: "2d6+6",
        tai: "2d6",
        dex: "2d6+6",
        int: "2d6+6",
        pou: "3d6",
        cha: "3d6",
        armure: "0",
        deplac: "5/9(arbres)",
        page: "22B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "dryad": {
        str: "2d6",
        con: "3d6",
        tai: "2d6+3",
        dex: "3d6+6",
        int: "2d6+16",
        pou: "4d6",
        cha: "2d6+12",
        armure: "0",
        deplac: "9",
        page: "18B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "elfBleu": {
        str: "2d4+1",
        con: "3d6",
        tai: "2d6",
        int: "1d6+12",
        pou: "2d6+6",
        dex: "3d6+3",
        cha: "3d6",
        armure: "4(queue)",
        deplac: "0/9(nage)",
        page: "23B",
        locaUn: "Queue-fouet",
        locaDeux: "Abdomen",
        locaTrois: "Poitrine",
        locaQuatre: "Bras droit",
        locaCinq: "Bras gauche",
        locaSix: "Tête",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-7",
        locaNumDeux: "8-11",
        locaNumTrois: "12",
        locaNumQuatre: "13-15",
        locaNumCinq: "16-18",
        locaNumSix: "19-20",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "4",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "b",
        locaPvQuatre: "c",
        locaPvCinq: "c",
        locaPvSix: "a",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "elfBrun": {
        str: "2d6+2",
        con: "3d6",
        tai: "2d4+4",
        int: "3d6+6",
        pou: "2d6+6",
        dex: "3d6+3",
        cha: "3d6",
        armure: "0",
        deplac: "9",
        page: "19B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "elfJaune": {
        str: "2d6+2",
        con: "3d6",
        tai: "2d6",
        int: "3d6+6",
        pou: "2d6+6",
        dex: "3d6+3",
        cha: "3d6",
        armure: "0",
        deplac: "9",
        page: "20B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "elfNoir": {
        str: "2d6",
        con: "3d6",
        tai: "2d4",
        int: "3d6+6",
        pou: "2d6+6",
        dex: "3d6+6",
        cha: "3d6",
        armure: "0",
        deplac: "7",
        page: "23B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "elfVert": {
        str: "2d6+4",
        con: "3d6",
        tai: "3d6",
        int: "3d6+6",
        pou: "2d6+6",
        dex: "3d6+3",
        cha: "3d6",
        armure: "0",
        deplac: "9",
        page: "21B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "pixie": {
        str: "2d4",
        con: "3d6",
        tai: "1D6",
        int: "2d6+6",
        pou: "2d6+6",
        dex: "4d6",
        cha: "3d6",
        armure: "0",
        deplac: "3/10(vol)",
        page: "24B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Aile droite",
        locaSix: "Aile gauche",
        locaSept: "Bras droit",
        locaHuit: "Bras gauche",
        locaNeuf: "Tête",
        locaDix: "",
        locaNumUn: "1-3",
        locaNumDeux: "4-6",
        locaNumTrois: "7-9",
        locaNumQuatre: "10",
        locaNumCinq: "11-12",
        locaNumSix: "13-14",
        locaNumSept: "15-16",
        locaNumHuit: "17-18",
        locaNumNeuf: "19-20",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "0",
        locaArmNeuf: "0",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "d",
        locaPvSix: "d",
        locaPvSept: "c",
        locaPvHuit: "c",
        locaPvNeuf: "a",
        locaPvDix: "",
        plus: ""
    },
    "archer": {
        str: "3d6+24",
        con: "4d6+12",
        tai: "3d6+30",
        int: "3d6",
        pou: "3d6",
        dex: "2d6+18",
        cha: "2d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "babouin": {
        str: "3d6+6",
        con: "3d6",
        tai: "3d6",
        int: "2d6+6",
        pou: "2d6+6",
        dex: "3d6+6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "canard": {
        str: "2d6+1",
        con: "2d6+6",
        tai: "1d6+2",
        int: "2d6+6",
        pou: "3d6",
        dex: "2d6+6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "centaure": {
        str: "3d6+6",
        con: "3d6",
        tai: "4d6+12",
        int: "2d6+d",
        pou: "3d6",
        dex: "3d6+3",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "femmeRen": {
        str: "3d6",
        con: "3d6",
        tai: "2d6+3",
        int: "2d6+6",
        pou: "3d6",
        dex: "2d6+6",
        cha: "1d6+12",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "femRenard": {
        str: "2d6",
        con: "2d6+6",
        tai: "1d2",
        int: "2d6+6",
        pou: "3d6",
        dex: "4d6+6",
        cha: "1d6+12",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "manticore": {
        str: "4d6+12",
        con: "2d6+6",
        tai: "4d6+12",
        int: "2d6",
        pou: "3d6",
        dex: "2d6+3",
        cha: "2d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "minotaure": {
        str: "3d6+12",
        con: "2d6+6",
        tai: "3d6+12",
        int: "2d6",
        pou: "3d6",
        dex: "3d6",
        cha: "2d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "satyre": {
        str: "6d6",
        con: "2d6+6",
        tai: "4d6",
        int: "2d6+6",
        pou: "4d6",
        dex: "3d6+6",
        cha: "2d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "dragCret": {
        str: "2d6",
        con: "3d6",
        tai: "2d6",
        int: "4d6",
        pou: "2d6",
        dex: "2d6+9",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "dragBec": {
        str: "2d6+12",
        con: "3d6+6",
        tai: "2d6+12",
        int: "4d6",
        pou: "1d3+11",
        dex: "2d6+3",
        cha: "3d6+3",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "pretreQueue": {
        str: "2d6+6",
        con: "3d6+6",
        tai: "2d6+6",
        int: "4d6",
        pou: "1d3+17",
        dex: "2d6+6",
        cha: "3d6+6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "pretreAile": {
        str: "4d6+12",
        con: "3d6+6",
        tai: "4d6+12",
        int: "4d6",
        pou: "1d3+23",
        dex: "2d6+6",
        cha: "3d6+12",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "enfantVent": {
        str: "2d6",
        con: "3d6",
        tai: "2d6",
        int: "2d6+6",
        pou: "2d6+6",
        dex: "3d6+6",
        cha: "2d6+6",
        armure: "0",
        deplac: "6/12(vol)",
        page: "47B",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Aile droite",
        locaSix: "Aile gauche",
        locaSept: "Bras droit",
        locaHuit: "Bras gauche",
        locaNeuf: "Tête",
        locaDix: "",
        locaNumUn: "1-3",
        locaNumDeux: "4-6",
        locaNumTrois: "7-9",
        locaNumQuatre: "10",
        locaNumCinq: "11-12",
        locaNumSix: "13-14",
        locaNumSept: "15-16",
        locaNumHuit: "17-18",
        locaNumNeuf: "19-20",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "0",
        locaArmNeuf: "0",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "c",
        locaPvHuit: "c",
        locaPvNeuf: "a",
        locaPvDix: "",
        plus: ""
    },
    "frereLoup": {
        str: "3d6",
        con: "3d6",
        tai: "2d6+6",
        int: "2d6+6",
        pou: "3d6",
        dex: "3d6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "frerLoup": {
        str: "6d6",
        con: "3d6",
        tai: "2d6+6",
        int: "1d6+3",
        pou: "3d6",
        dex: "3d6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "geant": {
        str: "3d6+18",
        con: "1d6+12",
        tai: "3d6+18",
        int: "3d6",
        pou: "3d6",
        dex: "3d6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "gorille": {
        str: "4d6+12",
        con: "3d6",
        tai: "2d6+12",
        int: "2d6",
        pou: "3d6",
        dex: "3d6+6",
        cha: "2d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "hommeDemi": {
        str: "3d6+6",
        con: "1d6+16",
        tai: "3d6+6",
        int: "2d6+6",
        pou: "3d6",
        dex: "3d6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "monteSanglier": {
        str: "2d6+6",
        con: "2d6+6",
        tai: "2d6+6",
        int: "2d6+6",
        pou: "3d6",
        dex: "3d6",
        cha: "1d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "morokanth": {
        str: "3d6+6",
        con: "3d6",
        tai: "3d6+6",
        int: "2d6+6",
        pou: "3d6",
        dex: "2d6+3",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "mostali": {
        str: "4d6",
        con: "2d6+6",
        tai: "2d6",
        int: "2d6+6",
        pou: "3d6",
        dex: "3d6",
        cha: "3d6",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "gobeur": {
        str: "2d6+12",
        con: "4d6+12",
        tai: "3d6+12",
        int: "1d6+2",
        pou: "3d6",
        dex: "2d6+8",
        cha: "0",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "jolanti": {
        str: "",
        con: "",
        tai: "",
        int: "",
        pou: "",
        dex: "",
        cha: "",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "nilmerg": {
        str: "",
        con: "",
        tai: "",
        int: "",
        pou: "",
        dex: "",
        cha: "",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "Jambe droite",
        locaDeux: "Jambe gauche",
        locaTrois: "Abdomen",
        locaQuatre: "Poitrine",
        locaCinq: "Bras droit",
        locaSix: "Bras gauche",
        locaSept: "Tête",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "1-4",
        locaNumDeux: "5-8",
        locaNumTrois: "9-11",
        locaNumQuatre: "12",
        locaNumCinq: "13-15",
        locaNumSix: "16/18",
        locaNumSept: "19/20",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "0",
        locaArmDeux: "0",
        locaArmTrois: "0",
        locaArmQuatre: "0",
        locaArmCinq: "0",
        locaArmSix: "0",
        locaArmSept: "0",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "a",
        locaPvDeux: "a",
        locaPvTrois: "a",
        locaPvQuatre: "b",
        locaPvCinq: "c",
        locaPvSix: "c",
        locaPvSept: "a",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
    "": {
        str: "",
        con: "",
        tai: "",
        int: "",
        pou: "",
        dex: "",
        cha: "",
        armure: "",
        deplac: "",
        page: "",
        locaUn: "",
        locaDeux: "",
        locaTrois: "",
        locaQuatre: "",
        locaCinq: "",
        locaSix: "",
        locaSept: "",
        locaHuit: "",
        locaNeuf: "",
        locaDix: "",
        locaNumUn: "",
        locaNumDeux: "",
        locaNumTrois: "",
        locaNumQuatre: "",
        locaNumCinq: "",
        locaNumSix: "",
        locaNumSept: "",
        locaNumHuit: "",
        locaNumNeuf: "",
        locaNumDix: "",
        locaArmUn: "",
        locaArmDeux: "",
        locaArmTrois: "",
        locaArmQuatre: "",
        locaArmCinq: "",
        locaArmSix: "",
        locaArmSept: "",
        locaArmHuit: "",
        locaArmNeuf: "",
        locaArmDix: "",
        locaPvUn: "",
        locaPvDeux: "",
        locaPvTrois: "",
        locaPvQuatre: "",
        locaPvCinq: "",
        locaPvSix: "",
        locaPvSept: "",
        locaPvHuit: "",
        locaPvNeuf: "",
        locaPvDix: "",
        plus: ""
    },
};

let pv = 0;

// Variable globale pour stocker la race
let race = "";

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
function recupRace() {
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
    });
}

// Appeler la fonction pour activer le changement de race
recupRace();

// Fonction de récupération des valeurs
function recupVal() {
    // Récupérer les valeurs des champs et les convertir en nombres
    const tai = parseInt(document.getElementById("tai").value) || 0;
    const dex = parseInt(document.getElementById("dex").value) || 0;
    const str = parseInt(document.getElementById("str").value) || 0;
    const pou = parseInt(document.getElementById("pou").value) || 0;
    const cha = parseInt(document.getElementById("cha").value) || 0;
    const con = parseInt(document.getElementById("con").value) || 0;
    const int = parseInt(document.getElementById("int").value) || 0;
    return {tai, dex, str, pou, cha, con, int};
}

// Fonction pour afficher les PV
function afficherPV() {
    // Récupérer les valeurs des champs et les convertir en nombres
    const {tai, pou, con} = recupVal();

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

    // Affichage des PV dans les différentes divs
    document.getElementById("pv").innerHTML = "PV Total : " + pv;
    document.getElementById("vitGuer").innerHTML = "Vitesse guérison : " + vitGuer;

    
}

// Fonction pour afficher les Rangs d'actions de Tai et de DEX
function afficherRangs() {
    // Récupérer les valeurs des champs et les convertir en nombres
    const {tai, dex, pou, cha, str} = recupVal();

    let rangTai = 0
    let rangDex = 0
    let bonDeg = 0
    let degSpi = 0

    const forTai = str + tai;
    const pouCha = pou + cha;

    // Calcul de rangTai
    if (tai < 7) {
        rangTai = 3;
    } else if (tai < 15) {
        rangTai = 2;
    } else if (tai < 22) {
        rangTai = 1;
    } else {
        rangTai = 0;
    }

    // Calcul de rangDex
    if (dex < 6) {
        rangDex = 5;
    } else if (dex < 9) {
        rangDex = 4;
    } else if (dex < 13) {
        rangDex = 3;
    } else if (dex < 16) {
        rangDex = 2;
    } else if (dex < 19) {
        rangDex = 1;
    } else {
        rangDex = 0;
    }

    // Calcul de bonus de dégâts
    if (forTai < 13) {
        bonDeg = "-1D4";
    } else if (forTai < 25) {
        bonDeg = "0";
    } else if (forTai < 33) {
        bonDeg = "1D4";
    } else if (forTai < 41) {
        bonDeg = "1D6";
    } else if (forTai < 57) {
        bonDeg = "2d6";
    } else if (forTai < 73) {
        bonDeg = "3d6";
    } else if (forTai < 89) {
        bonDeg = "4d6";
    } else if (forTai < 105) {
        bonDeg = "5D6";
    } else {
        bonDeg = "6D6";
    }

    // Calcul de bonus de dégâts spirituels
    if (pouCha < 13) {
        degSpi = "1D3";
    } else if (pouCha < 25) {
        degSpi = "1D6";
    } else if (pouCha < 33) {
        degSpi = "1D6+1";
    } else if (pouCha < 41) {
        degSpi = "1D6+3";
    } else if (pouCha < 57) {
        degSpi = "2d6+3";
    } else if (pouCha < 73) {
        degSpi = "3d6+4";
    } else if (pouCha < 89) {
        degSpi = "4d6+5";
    } else if (pouCha < 105) {
        degSpi = "5D6+6";
    } else {
        degSpi = "6D6+7";
    }

    // Affichage des Rangs d'actions dans les différentes divs
    document.getElementById("rangTai").innerHTML = "Rang d'action de Tai : " + rangTai;
    document.getElementById("rangDex").innerHTML = "Rang d'action de Dex : " + rangDex;
    document.getElementById("bonDeg").innerHTML = "Bonus aux dégâts : " + bonDeg;
    document.getElementById("degSpi").innerHTML = "Dégâts spirituels : " + degSpi;
}

// Fonction pour afficher les élements de Autres
function afficherAutres() {
    // Récupérer les valeurs des champs et les convertir en nombres
    const {str, con, pou} = recupVal();

    let enc = 0;

    // Calcul encombrement
    if (str < con) {
        enc = str;
    } else {
        forCon = str + con;
        enc = Math.ceil(forCon / 2);
    }
    
    // Calcul des points de magie
    let pm = pou;

    // Affichage
    document.getElementById("enc").innerHTML = "Encombrement maximal : " + enc;
    document.getElementById("pm").innerHTML = "Points de magie : " + pm;
    showDiv();
}

// Fonction d'affichage des mods de compétences
function afficherModComp() {
    //Récup des valeurs
    const {str, tai, pou, dex, int, cha} = recupVal();

    let agi = 0;
    let com = 0;
    let conn = 0;
    let mag = 0;
    let man = 0;
    let per = 0;
    let dis = 0;

    // Calcul mod agilité
    if (str < 5) {
        agi -= 5;
    } else if (str < 9) {
        agi += 0;
    } else if (str < 13) {
        agi += 0;
    } else if (str < 17) {
        agi += 0;
    } else if (str < 21) {
        agi += 5;
    } else if (str < 25) {
        agi += 10;
    } else if (str < 29) {
        agi += 15;
    } else {
        agi += 20;
    }

    if (tai < 5) {
        agi += 5;
    } else if (tai < 9) {
        agi += 0;
    } else if (tai < 13) {
        agi += 0;
    } else if (tai < 17) {
        agi += 0;
    } else if (tai < 21) {
        agi -= 5;
    } else if (tai < 25) {
        agi -= 10;
    } else if (tai < 29) {
        agi -= 15;
    } else {
        agi -= 20;
    }

    if (dex < 5) {
        agi -= 10;
    } else if (dex < 9) {
        agi -= 5;
    } else if (dex < 13) {
        agi += 0;
    } else if (dex < 17) {
        agi += 5;
    } else if (dex < 21) {
        agi += 10;
    } else if (dex < 25) {
        agi += 15;
    } else if (dex < 29) {
        agi += 20;
    } else {
        agi += 25;
    }

    if (pou < 5) {
        agi -= 5;
    } else if (pou < 9) {
        agi += 0;
    } else if (pou < 13) {
        agi += 0;
    } else if (pou < 17) {
        agi += 0;
    } else if (pou < 21) {
        agi += 5;
    } else if (pou < 25) {
        agi += 10;
    } else if (pou < 29) {
        agi += 15;
    } else {
        agi += 20;
    }

    //Calcul communication
    if (pou < 5) {
        com -= 5;
    } else if (pou < 9) {
        com += 0;
    } else if (pou < 13) {
        com += 0;
    } else if (pou < 17) {
        com += 0;
    } else if (pou < 21) {
        com += 5;
    } else if (pou < 25) {
        com += 10;
    } else if (pou < 29) {
        com += 15;
    } else {
        com += 20;
    }

    if (int < 5) {
        com -= 5;
    } else if (int < 9) {
        com += 0;
    } else if (int < 13) {
        com += 0;
    } else if (int < 17) {
        com += 0;
    } else if (int < 21) {
        com += 5;
    } else if (int < 25) {
        com += 10;
    } else if (int < 29) {
        com += 15;
    } else {
        com += 20;
    }

    if (cha < 5) {
        com -= 10;
    } else if (cha < 9) {
        com -= 5;
    } else if (cha < 13) {
        com += 0;
    } else if (cha < 17) {
        com += 5;
    } else if (cha < 21) {
        com += 10;
    } else if (cha < 25) {
        com += 15;
    } else if (cha < 29) {
        com += 20;
    } else {
        com += 25;
    }

    // Calcul de connaissances
    if (int < 5) {
        conn -= 10;
    } else if (int < 9) {
        conn -= 5;
    } else if (int < 13) {
        conn += 0;
    } else if (int < 17) {
        conn += 5;
    } else if (int < 21) {
        conn += 10;
    } else if (int < 25) {
        conn += 15;
    } else if (int < 29) {
        conn += 20;
    } else {
        conn += 25;
    }

    if (pou < 5) {
        conn -= 5;
    } else if (pou < 9) {
        conn += 0;
    } else if (pou < 13) {
        conn += 0;
    } else if (pou < 17) {
        conn += 0;
    } else if (pou < 21) {
        conn += 5;
    } else if (pou < 25) {
        conn += 10;
    } else if (pou < 29) {
        conn += 15;
    } else {
        conn += 20;
    }

    //Calcul de magie
    if (pou < 5) {
        mag -= 10;
    } else if (pou < 9) {
        mag -= 5;
    } else if (pou < 13) {
        mag += 0;
    } else if (pou < 17) {
        mag += 5;
    } else if (pou < 21) {
        mag += 10;
    } else if (pou < 25) {
        mag += 15;
    } else if (pou < 29) {
        mag += 20;
    } else {
        mag += 25;
    }

    if (cha < 5) {
        mag -= 5;
    } else if (cha < 9) {
        mag += 0;
    } else if (cha < 13) {
        mag += 0;
    } else if (cha < 17) {
        mag += 0;
    } else if (cha < 21) {
        mag += 5;
    } else if (cha < 25) {
        mag += 10;
    } else if (cha < 29) {
        mag += 15;
    } else {
        mag += 20;
    }

    //Calcul manipulation
    if (str < 5) {
        man -= 5;
    } else if (str < 9) {
        man += 0;
    } else if (str < 13) {
        man += 0;
    } else if (str < 17) {
        man += 0;
    } else if (str < 21) {
        man += 5;
    } else if (str < 25) {
        man += 10;
    } else if (str < 29) {
        man += 15;
    } else {
        man += 20;
    }

    if (dex < 5) {
        man -= 10;
    } else if (dex < 9) {
        man -= 5;
    } else if (dex < 13) {
        man += 0;
    } else if (dex < 17) {
        man += 5;
    } else if (dex < 21) {
        man += 10;
    } else if (dex < 25) {
        man += 15;
    } else if (dex < 29) {
        man += 20;
    } else {
        man += 25;
    }

    if (int < 5) {
        man -= 10;
    } else if (int < 9) {
        man -= 5;
    } else if (int < 13) {
        man += 0;
    } else if (int < 17) {
        man += 5;
    } else if (int < 21) {
        man += 10;
    } else if (int < 25) {
        man += 15;
    } else if (int < 29) {
        man += 20;
    } else {
        man += 25;
    }

    if (pou < 5) {
        man -= 5;
    } else if (pou < 9) {
        man += 0;
    } else if (pou < 13) {
        man += 0;
    } else if (pou < 17) {
        man += 0;
    } else if (pou < 21) {
        man += 5;
    } else if (pou < 25) {
        man += 10;
    } else if (pou < 29) {
        man += 15;
    } else {
        man += 20;
    }

    // Calcul perception
    if (int < 5) {
        per -= 10;
    } else if (int < 9) {
        per -= 5;
    } else if (int < 13) {
        per += 0;
    } else if (int < 17) {
        per += 5;
    } else if (int < 21) {
        per += 10;
    } else if (int < 25) {
        per += 15;
    } else if (int < 29) {
        per += 20;
    } else {
        per += 25;
    }

    if (pou < 5) {
        per -= 5;
    } else if (pou < 9) {
        per += 0;
    } else if (pou < 13) {
        per += 0;
    } else if (pou < 17) {
        per += 0;
    } else if (pou < 21) {
        per += 5;
    } else if (pou < 25) {
        per += 10;
    } else if (pou < 29) {
        per += 15;
    } else {
        per += 20;
    }

    // Calcul discrétion
    if (tai < 5) {
        dis += 10;
    } else if (tai < 9) {
        dis += 5;
    } else if (tai < 13) {
        dis += 0;
    } else if (tai < 17) {
        dis -= 5;
    } else if (tai < 21) {
        dis -= 10;
    } else if (tai < 25) {
        dis -= 15;
    } else if (tai < 29) {
        dis -= 20;
    } else {
        dis -= 25;
    }

    if (dex < 5) {
        dis -= 10;
    } else if (dex < 9) {
        dis -= 5;
    } else if (dex < 13) {
        dis += 0;
    } else if (dex < 17) {
        dis += 5;
    } else if (dex < 21) {
        dis += 10;
    } else if (dex < 25) {
        dis += 15;
    } else if (dex < 29) {
        dis += 20;
    } else {
        dis += 25;
    }

    if (int < 5) {
        dis -= 10;
    } else if (int < 9) {
        dis -= 5;
    } else if (int < 13) {
        dis += 0;
    } else if (int < 17) {
        dis += 5;
    } else if (int < 21) {
        dis += 10;
    } else if (int < 25) {
        dis += 15;
    } else if (int < 29) {
        dis += 20;
    } else {
        dis += 25;
    }

    if (pou < 5) {
        dis += 5;
    } else if (pou < 9) {
        dis += 0;
    } else if (pou < 13) {
        dis += 0;
    } else if (pou < 17) {
        dis += 0;
    } else if (pou < 21) {
        dis -= 5;
    } else if (pou < 25) {
        dis -= 10;
    } else if (pou < 29) {
        dis -= 15;
    } else {
        dis -= 20;
    }


    // Affichage
    document.getElementById("agi").innerHTML = "Agilité : " + agi;
    document.getElementById("com").innerHTML = "Communication : " + com;
    document.getElementById("conn").innerHTML = "Connaissances : " + conn;
    document.getElementById("mag").innerHTML = "Magie : " + mag;
    document.getElementById("man").innerHTML = "Manipulation : " + man;
    document.getElementById("per").innerHTML = "Perception : " + per;
    document.getElementById("dis").innerHTML = "Discretion : " + dis;
}

// Attacher l'événement de clic au bouton
document.getElementById("boutonRecherche").addEventListener("click", function name(params) {
    afficherPV();
    afficherRangs();
    afficherAutres();
    afficherModComp();
    genererLocalisations(raceChoisie);
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
    if (!raceChoisie) {
        alert("Veuillez sélectionner une race avant de générer des valeurs.");
        return;
    }
    genererValeursAleatoires();
    afficherPV();
    afficherRangs();
    afficherAutres();
    afficherModComp();
    genererLocalisations(raceChoisie);
});


// Bouton reset pour remettre à zero
document.getElementById("boutonReset").addEventListener("click", window.onload)

// Fonction pour générer les localisations dynamiquement
function genererLocalisations(race) {
    // Sélectionner l'élément HTML où insérer les localisations
    const locaDiv = document.getElementById("loca");
    const dVingtDiv = document.getElementById("dVingt");
    const armDiv = document.getElementById("arm");
    const pvDiv = document.getElementById("pvLoca");
    const armBonDiv = document.getElementById("armBon");
    const degDiv = document.getElementById("degats");
    const conDiv = document.getElementById("condition");

    // Récupérer les données associées à la race choisie
    const raceData = raceDiceData[race];

    // Liste des clés des localisations à vérifier
    const localisationKeys = [
        "locaUn", "locaDeux", "locaTrois", "locaQuatre", "locaCinq",
        "locaSix", "locaSept", "locaHuit", "locaNeuf", "locaDix"
    ];
    const dVingtKeys = [
        "locaNumUn","locaNumDeux","locaNumTrois","locaNumQuatre","locaNumCinq",
        "locaNumSix","locaNumSept","locaNumHuit","locaNumNeuf","locaNumDix"
    ];
    const armKeys = [
        "locaArmUn", "locaArmDeux", "locaArmTrois", "locaArmQuatre", "locaArmCinq",
        "locaArmSix", "locaArmSept", "locaArmHuit", "locaArmNeuf", "locaArmDix"
    ]
    const pvKeys = [
        "locaPvUn", "locaPvDeux", "locaPvTrois", "locaPvQuatre", "locaPvCinq",
        "locaPvSix", "locaPvSept", "locaPvHuit", "locaPvNeuf", "locaPvDix", 
    ]

    // Vider les anciennes localisations
    locaDiv.innerHTML = '<div class="titreLoca">Localisation</div>';
    dVingtDiv.innerHTML = '<div class="titreLoca">D20</div>';
    armDiv.innerHTML = '<div class="titreLoca">Armure</div>';
    pvDiv.innerHTML = '<div class="titreLoca">PV</div>';
    armBonDiv.innerHTML = '<div class="titreLoca">Armure bonus</div>';
    degDiv.innerHTML = '<div class="titreLoca">Dégâts</div>';
    conDiv.innerHTML = '<div class="titreLoca">Conditions</div>';

    // Parcourir les localisations
    localisationKeys.forEach(key => {
        const value = raceData[key];
        if (value !== "") { // Si la valeur n'est pas vide
            // Créer une nouvelle div avec la classe 'celLoca'
            const newDiv = document.createElement("div");
            newDiv.className = "celLoca";
            newDiv.textContent = value;

            // Ajouter la nouvelle div dans l'élément locaDiv
            locaDiv.appendChild(newDiv);
        }
    });

    dVingtKeys.forEach(key => {
        const value = raceData[key];
        if (value !== "") { // Si la valeur n'est pas vide
            // Créer une nouvelle div avec la classe 'celLoca'
            const newDiv = document.createElement("div");
            newDiv.className = "celLoca";
            newDiv.textContent = value;

            // Ajouter la nouvelle div dans l'élément dVingtDiv
            dVingtDiv.appendChild(newDiv);
        }
    });

    armKeys.forEach(key => {
        const value = parseInt(raceData[key], 10); // Conversion de la valeur de raceData en nombre
        if (!isNaN(value)) { // Si la valeur est un nombre valide
            // Créer une nouvelle div avec la classe 'celLoca' pour l'armure
            const newDiv = document.createElement("div");
            newDiv.className = "celLoca";
            newDiv.textContent = value; // Afficher la valeur de base
    
            // Créer une div pour le bonus d'armure avec un input
            const plusDiv = document.createElement("div");
            plusDiv.className = "celLocaPlus";
    
            // Créer un input de type number pour le bonus
            const bonusInput = document.createElement("input");
            bonusInput.type = "number";
            bonusInput.value = 0; // Valeur par défaut
    
            // Fonction pour mettre à jour l'armure avec le bonus
            function updateArmure() {
                const bonusValue = parseInt(bonusInput.value, 10); // Récupérer la valeur de l'input
                if (!isNaN(bonusValue)) {
                    newDiv.textContent = value + bonusValue; // Mise à jour avec bonus
                }
            }
    
            // Écouter les changements sur l'input
            bonusInput.addEventListener("input", updateArmure);
    
            // Ajouter l'input à la div plusDiv
            plusDiv.appendChild(bonusInput);
    
            // Ajouter la nouvelle div dans les éléments correspondants
            armDiv.appendChild(newDiv);
            armBonDiv.appendChild(plusDiv);
        }
    });
    

    pvKeys.forEach(key => {
        const value = raceData[key]; // Garde la valeur sous forme de chaîne de caractères pour les comparaisons
        let pvMembre = 0;
        if (value !== "") {
            if (value === "a") {
                pvMembre = Math.ceil(pv / 3);
                if (pvMembre < 2) {
                    pvMembre = 2;
                }
            } else if (value === "b") {
                pvMembre = Math.ceil(pv / 3) + 1;
                if (pvMembre < 3) {
                    pvMembre = 3;
                }
            } else if (value === "c") {
                pvMembre = Math.ceil(pv / 3) - 1;
                if (pvMembre < 1) {
                    pvMembre = 1;
                }
            } else {
                pvMembre = Math.ceil(pv / 3) - 2;
                if (pvMembre < 1) {
                    pvMembre = 1;
                }
            }
        
            // Créer une nouvelle div avec la classe 'celLoca' pour les pv
            const newDiv = document.createElement("div");
            newDiv.className = "celLoca";
            newDiv.textContent = pvMembre; // Afficher la valeur de base
        
            // Créer une div pour le malus de PV avec un input
            const plusDiv = document.createElement("div");
            plusDiv.className = "celLocaPlus";
        
            // Créer un input de type number pour le malus
            const malusInput = document.createElement("input");
            malusInput.type = "number";
            malusInput.value = 0; // Valeur par défaut
        
            // Fonction pour mettre à jour les pv avec le malus
            function updatePv() {
                const malusValue = parseInt(malusInput.value, 10); // Récupérer la valeur de l'input
                if (!isNaN(malusValue)) {
                    const pvAvecMalus = pvMembre - malusValue;
                    newDiv.textContent = pvAvecMalus;
                }
            }

            // Créer une div pour les conditions
            const divCondi = document.createElement("div");
            divCondi.className = "celLoca";
        
            // Écouter les changements sur l'input
            malusInput.addEventListener("input", updatePv);
        
            // Ajouter l'input à la div plusDiv
            plusDiv.appendChild(malusInput);
        
            // Ajouter la nouvelle div dans les éléments correspondants
            pvDiv.appendChild(newDiv);
            degDiv.appendChild(plusDiv);
            conDiv.appendChild(divCondi);
        }
    });
    

}

let raceChoisie = "";

// Fonction pour gérer le changement de race
document.getElementById("race").addEventListener("change", function() {
    raceChoisie = this.value;
    genererLocalisations(raceChoisie);
    updateDeplacValue();
});

// Fonction pour effacer les cases du tableau
function effacerDivsLoca() {
    // Sélectionner toutes les div ayant la classe 'celLoca'
    const celLoca = document.querySelectorAll('.celLoca');
    const celLocaPlus = document.querySelectorAll('.celLocaPlus');
    
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
}

// Fonction pour mettre à jour la valeur de déplacement
function updateDeplacValue() {
    const raceChoisie = document.getElementById("race").value; // Récupère la race sélectionnée
    const deplacValue = raceDiceData[raceChoisie]?.deplac; // Récupère la valeur associée à "deplac" pour cette race

    if (deplacValue) {
        document.getElementById("mvt").innerText = "Mouvement : " + deplacValue; // Affiche la valeur dans le div
    } else {
        document.getElementById("mvt").innerText = "Mouvement : "; // Réinitialise si aucune race n'est sélectionnée
    }
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

// Écouter l'événement click sur le bouton d'attaque
const atkButton = document.getElementById("atk");
atkButton.addEventListener("click", () => {
    // Récupérer la div avec l'ID 'degats'
    const degatsDiv = document.getElementById("degats");

    // Récupérer tous les inputs enfants de cette div
    const inputs = degatsDiv.querySelectorAll("input");

    // Initialiser la variable pour stocker le total des dégâts
    let degatTotal = 0;

    // Parcourir chaque input et additionner sa valeur au total
    inputs.forEach(input => {
        const valeur = parseInt(input.value, 10); // Convertir la valeur de l'input en nombre
        if (!isNaN(valeur)) { // Vérifier si la conversion a réussi
            degatTotal += valeur; // Ajouter la valeur au total
        }
    });

    // Mettre à jour les PV
    pv -= degatTotal;

    // Afficher les nouveaux PV
    document.getElementById("pv").innerHTML = "PV Total : " + pv;

    // Vérification santé
    if (pv < 3) {
        if (pv < 1) {
            mort = true;
            alert("MORT");
        } else {
            inconscient = true;
            alert("Inconscience");
        }
    }

    // remise à zéro des inputs
    inputs.forEach(input => {
        input.value = 0; // Réinitialiser la valeur de chaque input à 0
    });
});



