let selected_commune = null;


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsElement = document.getElementById('results');

    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value;

        if (searchValue.length >= 2) {
            fetch(`https://geo.api.gouv.fr/communes?nom=${searchValue}&type=commune-actuelle&fields=codeParent,nom,code,codeDepartement&format=json`)
                .then(response => response.json())
                .then(data => {
                    resultsElement.innerHTML = '';
                    data.forEach(commune => {
                        const option = document.createElement('div');
                        option.textContent = commune.nom + " (" + commune.code + ")";
                        option.classList.add('autocomplete-option');
                        option.addEventListener('click', function() {
                            selected_commune = commune;
                            searchInput.value = option.textContent;
                            resultsElement.innerHTML = '';
                        });
                        resultsElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
        } else {
            resultsElement.innerHTML = '';
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value;
        if (searchQuery) {
            const searchUrl = getArchiveURL(selected_commune);
            browser.tabs.create({ url: searchUrl });
        }
    });
});



/**
  Fetch the URL for the given city.
**/
function getArchiveURL(commune) {
  const codeDepartement = commune.codeDepartement;
  let archiveUrl = "";

  switch (codeDepartement) {
    case "01": //Ain
      archiveUrl = `https://www.archives.ain.fr/archive/resultats/etatcivil/n:88?REch_commune=%22${encodeURIComponent(commune.nom)}%22`;
      break;
    case "02": //Aisne
      archiveUrl = `https://archives.aisne.fr/archive/resultats/etatcivil/n:11?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "03": //Allier
      archiveUrl = `https://archives.allier.fr/archives-en-ligne/genealogie-histoire-des-familles/etat-civil-en-ligne?arko_default_5f992f52cfc55--filtreGroupes[groupes][0][arko_default_5f99316db4ce5][op]=AND&arko_default_5f992f52cfc55--filtreGroupes[groupes][0][arko_default_5f99316db4ce5][q][]=${encodeURIComponent(commune.nom)}&arko_default_5f992f52cfc55--filtreGroupes[groupes][0][arko_default_5f99316db4ce5][extras][mode]=popup`;
      break;
    case "04": //Alpes-de-Haute-Provence
      archiveUrl = `https://archives04.fr/r/59/etat-civil`;
      break;
    case "05": //Hautes-Alpes
      archiveUrl = `https://archives.hautes-alpes.fr/archive/resultats/etatcivil/n:198?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "06": //Alpes-Maritimes
      archiveUrl = `https://archives06.fr/archive/resultats/etatcivil2/n:101?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "07": //Ardèche
      archiveUrl = `https://archives.ardeche.fr/archive/resultats/etatcivil/n:96?RECH_comm=${encodeURIComponent(commune.nom)}`;
      break;
    case "08": //Ardennes
      archiveUrl = `https://archives.cd08.fr/arkotheque/consult_fonds/index.php?ref_fonds=4`;
      break;
    case "09": //Ariège
      archiveUrl = `http://mdr-archives.ariege.fr/mdr/index.php/rechercheTheme/requeteConstructor/1/1/R/${encodeURIComponent(getCommuneFirstLetter(commune.nom))}/0`;
      break;
    case "10": //Aube
      archiveUrl = `https://www.archives-aube.fr/recherches/documents-numerises/genealogie/tout-letat-civil/etat-civil-des-communes-de-laube-hors-troyes-1552-1919?arko_default_6228a5627b9b1--filtreGroupes[groupes][0][arko_default_6228a6607b8e9][op]=AND&arko_default_6228a5627b9b1--filtreGroupes[groupes][0][arko_default_6228a6607b8e9][q][]=${encodeURIComponent(commune.nom)}`;
      break;
    case "11": //Aude
      archiveUrl = `https://archivesdepartementales.aude.fr/letat-civil`;
      break;
    case "12": //Aveyron
      archiveUrl = `https://archives.aveyron.fr/archive/resultats/etatcivil/n:22?Rech_comune=${encodeURIComponent(commune.nom)}`;
      break;
    case "13": //Bouches-du-Rhône
      archiveUrl = `https://www.archives13.fr/archive/resultats/etatcivil/n:64?Rech_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "14": // Calvados
      archiveUrl = `https://archives.calvados.fr/search/results?formUuid=ecf01748-923d-463a-8d80-bd4142582bcd&sort=date_asc&mode=list&controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}+%28Calvados%29`;
      break;
    case "15": // Cantal
      archiveUrl = `https://archives.cantal.fr/vos-archives/etat-civil/recherche-dans-letat-civil?arko_default_5f8ef8b61e0d4--filtreGroupes[groupes][0][arko_default_5f8ef8e7d58fc][op]=AND&arko_default_5f8ef8b61e0d4--filtreGroupes[groupes][0][arko_default_5f8ef8e7d58fc][q][]=${encodeURIComponent(commune.nom)}&arko_default_5f8ef8b61e0d4--filtreGroupes[groupes][0][arko_default_5f8ef8e7d58fc][extras][mode]=popup `;
      break;
    case "16": // Charente
      archiveUrl = `https://archives.lacharente.fr/s/12/registres-paroissiaux-et-etat-civil/?`;
      break;
    case "17": // Charente-Maritime
      archiveUrl = `http://www.archinoe.net/v2/ad17/registre.html`;
      break;
    case "18": // Cher
      archiveUrl = `https://www.archives18.fr/archives-numerisees/registres-paroissiaux-et-etat-civil?arko_default_61011a8e5db65--filtreGroupes[groupes][0][arko_default_61011b4c3eacb][op]=AND&arko_default_61011a8e5db65--filtreGroupes[groupes][0][arko_default_61011b4c3eacb][q][]=${encodeURIComponent(commune.nom)}&arko_default_61011a8e5db65--filtreGroupes[groupes][0][arko_default_61011b4c3eacb][extras][mode]=popup`;
      break;
    case "19": // Corrèze
      archiveUrl = `http://www.archinoe.fr/cg19/registre.php`;
      break;
    case "2A": // Corse-du-Sud
      archiveUrl = `http://archives.corsedusud.fr/Internet_THOT/FrmSommaireFrame.asp`;
      break;
    case "2B": // Haute-Corse
      archiveUrl = `http://archives.isula.corsica/Internet_THOT/FrmSommaireFrame.asp`;
      break;
    case "21": // Côte-d'Or
      archiveUrl = `https://archives.cotedor.fr/console/ir_ead_visu.php?eadid=FRAD021_000000912&ir=26564`;
      break;
    case "22": // Côtes-d'Armor
      archiveUrl = `https://sallevirtuelle.cotesdarmor.fr/EC/ecx/commune.aspx?lettre=${encodeURIComponent(getCommuneFirstLetter(commune.nom))}`;
      break;
    case "23": // Creuse
      archiveUrl = `https://archives.creuse.fr/rechercher/archives-numerisees/registres-paroissiaux-et-de-letat-civil?arko_default_6089614c0e9ed--filtreGroupes[groupes][0][arko_default_6089619817b3c][op]=AND&arko_default_6089614c0e9ed--filtreGroupes[groupes][0][arko_default_6089619817b3c][q][]=${encodeURIComponent(commune.nom)}&arko_default_6089614c0e9ed--filtreGroupes[groupes][0][arko_default_6089619817b3c][extras][mode]=popup `;
      break;
    case "24": // Dordogne
      archiveUrl = `https://archives.dordogne.fr/archives-numerisees/genealogie/registres-paroissiaux-et-detat-civil?arko_default_6197500eceff4--filtreGroupes[groupes][0][arko_default_6197504d97f6f][op]=AND&arko_default_6197500eceff4--filtreGroupes[groupes][0][arko_default_6197504d97f6f][q][]=${encodeURIComponent(commune.nom)}&arko_default_6197500eceff4--filtreGroupes[groupes][0][arko_default_6197504d97f6f][extras][mode]=popup `;
      break;
    case "25": // Doubs
      archiveUrl = `https://archives.doubs.fr/search/results?formUuid=4d44dde5-4523-4384-a2da-c1169870f1b2&sort=date_asc&mode=list&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(formatWithPrefix(commune.nom))}`;
      break;
    case "26": // Drôme
      archiveUrl = `https://archives.ladrome.fr/search/results?formUuid=f6e7c1a1-9bda-40bc-a68b-13ed003eb0e5&sort=date_asc&mode=list&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}+%28Dr%C3%B4me%2C+France%29`;
      break;
    case "27": // Eure
      archiveUrl = `https://archives.eure.fr/search?preset=80&adv[1][type]=Descripteurs+lieux&adv[1][value][0]=${encodeURIComponent(commune.nom)}&adv-query=(Descripteurs+lieux%3A+%22${encodeURIComponent(commune.nom)}%22)&view=list`;
      break;
    case "28": // Eure-et-Loir
      archiveUrl = `https://archives28.fr/archives-et-inventaires-en-ligne/histoire-des-individus-des-populations-et-genealogie/les-registres-paroissiaux-et-detat-civil?arko_default_6241bc24d7427--filtreGroupes[groupes][0][arko_default_6241bc68aa536][op]=AND&arko_default_6241bc24d7427--filtreGroupes[groupes][0][arko_default_6241bc68aa536][q][]=${encodeURIComponent(commune.nom)}&arko_default_6241bc24d7427--filtreGroupes[groupes][0][arko_default_6241bc68aa536][extras][mode]=popup`;
      break;
    case "29": // Finistère
      archiveUrl = `https://recherche.archives.finistere.fr/document/FRAD029_Etatcivil`;
      break;
    case "30": // Gard
      archiveUrl = `https://earchives.gard.fr/archives/classification-scheme`;
      break;
    case "31": // Haute-Garonne
      archiveUrl = `https://archives.haute-garonne.fr/archive/resultats/etatcivil/n:97?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "32": // Gers
      archiveUrl = `https://www.archives32.fr/archives_numerisees/portail/etats_civils/`;
      break;
    case "33": // Gironde
      archiveUrl = `https://archives.gironde.fr/archive/resultats/etatcivil/n:89?REch_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "34": // Hérault
      archiveUrl = `https://archives-pierresvives.herault.fr/archive/resultats/etatcivil/n:23?RECH_COMMUNE=${encodeURIComponent(commune.nom)}`;
      break;
    case "35": // Ille-et-Vilaine
      archiveUrl = `https://archives-en-ligne.ille-et-vilaine.fr/thot_internet/FrmSommaireFrame.asp`;
      break;
    case "36": // Indre
      archiveUrl = `https://www.archives36.fr/fonds-numerises/etat-civil?arko_default_61a0b234355b3--filtreGroupes[groupes][0][arko_default_61a0b2b3cb0f3][op]=AND&arko_default_61a0b234355b3--filtreGroupes[groupes][0][arko_default_61a0b2b3cb0f3][q][]=${encodeURIComponent(commune.nom)}&arko_default_61a0b234355b3--filtreGroupes[groupes][0][arko_default_61a0b2b3cb0f3][extras][mode]=popup `;
      break;
    case "37": // Indre-et-Loire
      archiveUrl = `https://archives.touraine.fr/search/results?formUuid=e9414896-40cc-4ec3-936c-8acdfdb11770&sort=date_asc&mode=list&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}+%28Indre-et-Loire%2C+France%29`;
      break;
    case "38": // Isère
      archiveUrl = `http://archivesenligne.archives-isere.fr/mdr/index.php/rechercheTheme/requeteConstructor/1/1/R/${encodeURIComponent(getCommuneFirstLetter(commune.nom))}/0`;
      break;
    case "39": // Jura
      archiveUrl = `https://archives39.fr/search/results?formUuid=1eb1f0a3-b7ba-4c8a-bdae-395b322800e4&sort=referencecode_asc&mode=list&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(formatWithPrefix(commune.nom))}%2C+commune`;
      break;
    case "40": // Landes
      archiveUrl = `https://archives.landes.fr/faire-une-recherche/archives-numerisees/etat-civil?arko_default_62a88e82782fb--filtreGroupes[groupes][0][arko_default_62a88ef4ebacf][op]=AND&arko_default_62a88e82782fb--filtreGroupes[groupes][0][arko_default_62a88ef4ebacf][q][]=${encodeURIComponent(commune.nom)}&arko_default_62a88e82782fb--filtreGroupes[groupes][0][arko_default_62a88ef4ebacf][extras][mode]=popup `;
      break;
    case "41": // Loir-et-Cher
      archiveUrl = `http://archives.culture41.fr/archive/resultats/etatcivil?Rech_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "42": // Loire
      archiveUrl = `https://archives.loire.fr/archive/resultats/etatcivil/n:92?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "43": // Haute-Loire
      archiveUrl = `https://www.archives43.fr/archives-en-ligne/familles-et-individus-en-haute-loire/etat-civil-de-la-haute-loire?arko_default_616fd22b91d20--filtreGroupes[groupes][0][arko_default_616fd46414cf1][op]=AND&arko_default_616fd22b91d20--filtreGroupes[groupes][0][arko_default_616fd46414cf1][q][]=${encodeURIComponent(commune.nom)}&arko_default_616fd22b91d20--filtreGroupes[groupes][0][arko_default_616fd46414cf1][extras][mode]=popup`;
      break;
    case "44": // Loire-Atlantique
      archiveUrl = `https://archives-numerisees.loire-atlantique.fr/v2/ad44/registre.html`;
      break;
    case "45": // Loiret
      archiveUrl = `https://www.archives-loiret.fr/faire-vos-recherches/archives-numerisees/etat-civil?arko_default_61e6b3f775f99--filtreGroupes[groupes][0][arko_default_61e6b4731902f][op]=AND&arko_default_61e6b3f775f99--filtreGroupes[groupes][0][arko_default_61e6b4731902f][q][]=${encodeURIComponent(commune.nom)}&arko_default_61e6b3f775f99--filtreGroupes[groupes][0][arko_default_61e6b4731902f][extras][mode]=popup`;
      break;
    case "46": // Lot
      archiveUrl = `https://archives.lot.fr/f/adlot/tableau/?&crit1=2&v_2_1=${encodeURIComponent(commune.nom)}`;
      break;
    case "47": // Lot-et-Garonne
      archiveUrl = `http://www.archinoe.fr/v2/ad47/registre.html`;
      break;
    case "48": // Lozère
      archiveUrl = `https://archives.lozere.fr/archive/resultats/etatcivil/tableau/FRAD048_ETATCIVIL/n:88?REch_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "49": // Maine-et-Loire
      archiveUrl = `https://recherche-archives.maine-et-loire.fr/v2/ad49/registre.html`;
      break;
    case "50": // Manche
      archiveUrl = `https://www.archives-manche.fr/e/ad50_etatcivil?from=0&f_6[0]=${encodeISO88591(formatWithPrefix(commune.nom))}`;
      break;
    case "51": // Marne
      archiveUrl = `https://archives.marne.fr/search/results?formUuid=6977c5eb-072c-470c-8dfa-6d6488a2d71e&sort=date_asc&mode=table&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(formatWithPrefix(commune.nom))}+%28Marne%2C+France%29`;
      break;
    case "52": // Haute-Marne
      archiveUrl = `https://archives.haute-marne.fr/document/FRAD052_Edepot_etat-civil`;
      break;
    case "53": // Mayenne
      archiveUrl = `https://archives.lamayenne.fr/archives-en-ligne/custom-results.html?base=ead2&rbase=ead2&facets=udate%3Bfgeogcommune%3Bfanciennescommune%3Bfinstitution_paroisse%3Bftypedocec%3Bflisteacte%3Bfbdate&name=etat-civil&linkBack=true&cop1=AND&champ1=fcommunes_paroisses&query1=${encodeURIComponent(commune.nom)}+%28Mayenne%2C+France%29`;
      break;
    case "54": // Meurthe-et-Moselle
      archiveUrl = `https://archivesenligne.archives.cg54.fr/archives-en-ligne/registres-paroissiaux-et-detat-civil?arko_default_62bc67565d099--filtreGroupes[groupes][0][arko_default_62bc67951f875][op]=AND&arko_default_62bc67565d099--filtreGroupes[groupes][0][arko_default_62bc67951f875][q][]=${encodeURIComponent(commune.nom)}&arko_default_62bc67565d099--filtreGroupes[groupes][0][arko_default_62bc67951f875][extras][mode]=popup`;
      break;
    case "55": // Meuse
      archiveUrl = `https://archives.meuse.fr/search/results?formUuid=32239fba-c3ac-416c-b0f7-889cfa87214a&sort=date_asc&mode=list&facet_media=image&0-controlledAccessGeographicName[]=${encodeURIComponent(formatWithPrefix(commune.nom).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "56": // Morbihan
      archiveUrl = `https://rechercher.patrimoines-archives.morbihan.fr/archive/resultats/etatcivil/n:6?REch_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "57": // Moselle
      archiveUrl = `https://www.archives57.com/index.php/recherches/archives-en-ligne/registres-paroissiaux`;
      break;
    case "58": // Nièvre
      archiveUrl = `https://archives.nievre.fr/search/results?formUuid=9430efb3-399f-4de3-a3e7-004e232d8601&sort=date_asc&mode=mosaic&0-controlledAccessGeographicName[]=${encodeURIComponent(commune.nom.toUpperCase())}`;
      break;
    case "59": // Nord
      archiveUrl = `https://archivesdepartementales.lenord.fr/search/results?formUuid=dc4e871d-0b62-41fb-9921-5ded573781b8&sort=relevance&0-controlledAccessGeographicName[]=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "60": // Oise
      archiveUrl = `https://ressources.archives.oise.fr/v2/ad60/registre.html`;
      break;
    case "61": // Orne
      archiveUrl = `https://archives.orne.fr/etat-civil`;
      break;
    case "62": // Pas-de-Calais
      archiveUrl = `https://archivesenligne.pasdecalais.fr/console/ir_seriel.php?id=56&p=formulaire_etat_civil`;
      break;
    case "63": // Puy-de-Dôme
      archiveUrl = `https://www.archivesdepartementales.puy-de-dome.fr/archive/resultats/etatcivil/n:13?RECH_comune=${encodeURIComponent(commune.nom)}`;
      break;
    case "64": // Pyrénées-Atlantiques
      archiveUrl = `https://earchives.le64.fr/archives-en-ligne/results.html?base=ead&rbase=ead&facets=root-id%3Bdctype%3Bfpersname%3Bdccreator%3Bdccontributor%3Bdcsubject%3Bqdcspatial%3Bdcpublisher%3Bdcsource%3Bobject%3Bfbdate&name=etat-civil&linkBack=true&n-start=0&champ1=root-id&query1=FRAD064003_IR0002&cop1=AND&hidden1=true&cop2=AND&champ2=fgeogname&ff=root-id&fv=FRAD064003_IR0002&query2=${encodeURIComponent(commune.nom)}+%28Pyr%C3%A9n%C3%A9es-Atlantiques%2C+France%29&op2=OR`;
      break;
    case "65": // Hautes-Pyrénées
      archiveUrl = `https://archivesenligne65.fr/archives/acces-geographique/communes?arko_default_634fc50722e59--filtreGroupes[groupes][0][arko_default_634feb7ceb78f][op]=AND&arko_default_634fc50722e59--filtreGroupes[groupes][0][arko_default_634feb7ceb78f][q][]=${encodeURIComponent(commune.nom)}&arko_default_634fc50722e59--filtreGroupes[groupes][0][arko_default_634feb7ceb78f][extras][mode]=popup `;
      break;
    case "66": // Pyrénées-Orientales
      archiveUrl = `https://archives.cd66.fr/mdr/index.php/rechercheTheme/requeteConstructor/1/1/R/${encodeURIComponent(getCommuneFirstLetter(commune.nom))}/0`;
      break;
    case "67": // Bas-Rhin
      archiveUrl = `https://archives.bas-rhin.fr/registres-paroissiaux-et-documents-d-etat-civil/`;
      break;
    case "68": // Haut-Rhin
      archiveUrl = `https://archives68.alsace.eu/search/results?formUuid=f4ed0a71-fe36-42d4-81bd-780da14c2125&sort=relevance&mode=list&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}`;
      break;
    case "69": // Rhône
      archiveUrl = `https://archives.rhone.fr/search/results?formUuid=dde23a8f-cc71-4300-9805-bda67eec1ac0&sort=date_asc&mode=list&0-controlledAccessGeographicName[]=${encodeURIComponent(commune.nom.toUpperCase())}`;
      break;
    case "70": // Haute-Saône
      archiveUrl = `https://archives.haute-saone.fr/archive/resultats/etatcivil2/n:119?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "71": // Saône-et-Loire
      archiveUrl = `https://www.archives71.fr/consulter/en-ligne/familles-et-individus/etat-civil?arko_default_61b1ccdceb9a7--filtreGroupes[groupes][0][arko_default_61b1cd7726c84][op]=AND&arko_default_61b1ccdceb9a7--filtreGroupes[groupes][0][arko_default_61b1cd7726c84][q][]=${encodeURIComponent(commune.nom)}&arko_default_61b1ccdceb9a7--filtreGroupes[groupes][0][arko_default_61b1cd7726c84][extras][mode]=popup `;
      break;
    case "72": // Sarthe
      archiveUrl = `https://archives.sarthe.fr/archives-en-ligne/registres-paroissiaux-etat-civil?arko_default_6319dbb9a1c43--filtreGroupes[groupes][0][arko_default_6319dbfb4cff8][op]=AND&arko_default_6319dbb9a1c43--filtreGroupes[groupes][0][arko_default_6319dbfb4cff8][q][]=${encodeURIComponent(commune.nom)}&arko_default_6319dbb9a1c43--filtreGroupes[groupes][0][arko_default_6319dbfb4cff8][extras][mode]=popup `;
      break;
    case "73": // Savoie
      archiveUrl = `https://recherche-archives.savoie.fr/?label_geogname=Communes%2C+lieux&form_search_geogname=%22${encodeURIComponent(commune.nom)}%22&action=search&id=recherche_guidee_etat_civil_web`;
      break;
    case "74": // Haute-Savoie
      archiveUrl = `https://archives.hautesavoie.fr/archive/resultats/etatcivil/line/FRAD074_000000197/n:139?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "75": // Paris
      archiveUrl = `https://archives.paris.fr/r/124/etat-civil-de-paris`;
      break;
    case "76": // Seine-Maritime
      archiveUrl = `https://www.archivesdepartementales76.net/archive/resultats/etatcivil/n:113?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "77": // Seine-et-Marne
      archiveUrl = `http://archives-en-ligne.seine-et-marne.fr/mdr/index.php/rechercheTheme/requeteConstructor/14/1/R/${encodeURIComponent(commune.nom[0].toUpperCase())}/0`;
      break;
    case "78": // Yvelines
      archiveUrl = `https://archives.yvelines.fr/rechercher/archives-en-ligne/registres-paroissiaux-et-detat-civil/registres-paroissiaux-et-detat-civil?arko_default_618914e3ee7e4--filtreGroupes[groupes][0][arko_default_61894fee776d8][op]=AND&arko_default_618914e3ee7e4--filtreGroupes[groupes][0][arko_default_61894fee776d8][q][]=${encodeURIComponent(commune.nom)}&arko_default_618914e3ee7e4--filtreGroupes[groupes][0][arko_default_61894fee776d8][extras][mode]=popup`;
      break;
    case "79": // Deux-Sèvres
      archiveUrl = `https://archives-deux-sevres-vienne.fr/archive/resultats/etatcivil/n:100?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "80": // Somme
      archiveUrl = `https://archives.somme.fr/search/results?formUuid=cebd4a00-25b1-4b1c-a31e-8ea66d58efa2&sort=date_asc&mode=list&1-controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}+%28Somme%2C+France%29`;
      break;
    case "81": // Tarn
      archiveUrl = `https://e-archives.tarn.fr/archives/classification-scheme#tt2-39`;
      break;
    case "82": // Tarn-et-Garonne
      archiveUrl = `https://archivesdepartementales.ledepartement82.fr`;
      break;
    case "83": // Var
      archiveUrl = `https://archives.var.fr/arkotheque/consult_fonds/index.php?ref_fonds=2`;
      break;
    case "84": // Vaucluse
      archiveUrl = `https://earchives.vaucluse.fr/document/FRAD084_IR0001730`;
      break;
    case "85": // Vendée
      archiveUrl = `https://etatcivil-archives.vendee.fr/f/etatcivil/tableau/?&crit1=1&v_1_1=${encodeISO88591(formatWithPrefix(commune.nom))}`;
      break;
    case "86": // Vienne
      archiveUrl = `https://archives-deux-sevres-vienne.fr/archive/resultats/etatcivil/n:100?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "87": // Haute-Vienne
      archiveUrl = `https://archives.haute-vienne.fr/rechercher/archives-en-ligne/etat-civil?arko_default_603517b8650b3--filtreGroupes[groupes][0][arko_default_616d87384282a][op]=AND&arko_default_603517b8650b3--filtreGroupes[groupes][0][arko_default_616d87384282a][q][]=${encodeURIComponent(commune.nom)}&arko_default_603517b8650b3--filtreGroupes[groupes][0][arko_default_616d87384282a][extras][mode]=popup`;
      break;
    case "88": // Vosges
      archiveUrl = `https://recherche-archives.vosges.fr/archive/resultats/etatcivil/n:2?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "89": // Yonne
      archiveUrl = `https://archivesenligne.yonne.fr/archive/resultats/etatcivil?RECH_comms=${encodeURIComponent(commune.nom)}`;
      break;
    case "90": // Territoire de Belfort
      archiveUrl = `https://archives.territoiredebelfort.fr/search/results?formUuid=ce8c3b7f-77f9-493b-81dd-d09d11bdc431&sort=date_asc&mode=table&0-controlledAccessGeographicName%5B%5D=${encodeURIComponent(commune.nom)}+%28Territoire+de+Belfort%2C+France%29`;
      break;
    case "91": // Essonne
      archiveUrl = `https://archives.essonne.fr/search/results?formUuid=63a201cb-bad5-4257-83fc-6f844178c9d8&sort=referencecode_asc&mode=list&2-controlledAccessGeographicName%5B%5D=${encodeURIComponent(formatWithPrefix(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase())}+Commune&6-controlledAccessSubject%5B%5D=%C3%A9tat+civil`;
      break;
    case "92": // Hauts-de-Seine
      archiveUrl = `https://archives.hauts-de-seine.fr/archive/resultats/etatcivil/n:92?RECH_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "93": // Seine-Saint-Denis
      archiveUrl = `https://archives.seinesaintdenis.fr/archive/resultats/etatcivil/n:217?rech_commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "94": // Val-de-Marne
      archiveUrl = `https://archives.valdemarne.fr/recherches/archives-en-ligne/etat-civil?arko_default_6303325b22a2d--filtreGroupes[groupes][0][arko_default_630332ab3ef85][op]=AND&arko_default_6303325b22a2d--filtreGroupes[groupes][0][arko_default_630332ab3ef85][q][]=${encodeURIComponent(commune.nom)}`;
      break;
    case "95": // Val-d'Oise
      archiveUrl = `https://archives.valdoise.fr/archive/resultats/EtatCivilNumerise/n:419?RECH_Commune=${encodeURIComponent(commune.nom)}`;
      break;
    case "971": // Guadeloupe
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=GUADELOUPE&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "972": // Martinique
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=MARTINIQUE&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "973": // Guyane
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=GUYANE&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "974": // La Réunion
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=REUNION&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "975": // Saint-Pierre-et-Miquelon
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=SAINT-PIERRE-ET-MIQUELON&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    case "976": // Mayotte
      archiveUrl = `http://anom.archivesnationales.culture.gouv.fr/caomec2/resultats.php?territoire=MAYOTTE&commune=${encodeURIComponent(commune.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())}`;
      break;
    default:
      archiveUrl = '';
  }
  return archiveUrl;
}


/**
  Get the city's first letter for sites only allowing a letter as parameter.
**/
function getCommuneFirstLetter(name) {

  for (let determinant of ["L'", "La ", "Le ", "Les ", "Los "]) {
    if (name.startsWith(determinant)) {
          return name.charAt(determinant.length).toUpperCase();
    }
  }
  return name.charAt(0).toUpperCase();
}

/**
  Change name format for cities names.
  Example : "Le Grand-Lemps" => "Grand-Lemps (Le)"
**/
function formatWithPrefix(name) {
  return name.split(" ").length > 1 ? `${name.split(" ")[1]} (${name.split(" ")[0]})` : name;
}

/**
 Encode a string to match ISO 8859-1 format
**/
function encodeISO88591(str) {
    return str
      .replace(/\u00EA/g, '%EA')
      .replace(/\u00E2/g, '%E2')
      .replace(/\u00E8/g, '%E8')
      .replace(/\u00E9/g, '%E9')
      .replace(/\u00F4/g, '%F4')
      .replace(/ /g, '%20');
}
