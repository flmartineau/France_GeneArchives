let selected_commune = null;
let urlsData = null;

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsElement = document.getElementById('results');

    fetch(browser.runtime.getURL('/data.json'))
      .then(response => response.json())
      .then(data => {
        urlsData = data;
    });

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
 * Change the commune name format to match the given format
 * @param {*} communeName the commune name
 * @param {*} format the format to apply
 * @returns the commune name with the given format
 */
function applyFormatToCommuneName(communeName, format) {
  switch (format) {
    case "SIMPLE_NAME" :
      return encodeURIComponent(communeName);
    case "SIMPLE_NAME_UPPERCASE" :
      return encodeURIComponent(communeName.toUpperCase());
    case "NAME_PREFIX_END":
      return encodeURIComponent(formatWithPrefix(communeName));
    case "NAME_PREFIX_END_ISO88591":
      return encodeISO88591(formatWithPrefix(communeName));
    case "NAME_NO_ACCENTS_UPPERCASE":
      return encodeURIComponent(communeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    case "NAME_NO_ACCENTS_UPPERCASE_PREFIX_END":
      return encodeURIComponent(formatWithPrefix(communeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()));
    case "FIRST_LETTER_NAME_UPPERCASE":
      return encodeURIComponent(commune.nom[0].toUpperCase());
    case "FIRST_LETTER_NAME_NO_PREFIX_UPPERCASE":
      return encodeURIComponent(getCommuneFirstLetter(commune.nom));
    default:
      return "";
  }
}


/**
  Fetch the URL for the given city.
**/
function getArchiveURL(commune) {
  let urlData = urlsData.find(urlData => urlData.codeDepartement === commune.codeDepartement);
  let archiveUrl = (urlData.baseUrl + urlData.etatCivilUrl).replace("@PARAM", applyFormatToCommuneName(commune.nom, urlData.etatCivilParamFormat));
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
