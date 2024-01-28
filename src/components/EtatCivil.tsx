import React from "react";
import { ICommune } from "../interfaces/ICommune";
import { FormatHelper } from "../helper/FormatHelper";
import { IUrls } from "../interfaces/IUrls";

interface EtatCivilProps {
    urlsData: IUrls[] | null;
}

interface EtatCivilState {
    selectedCommune: ICommune | null;
    communeList: ICommune[];
}


class EtatCivil extends React.Component<EtatCivilProps, EtatCivilState> {
    constructor(props: EtatCivilProps) {
        super(props);
        this.state = {
            selectedCommune: null,
            communeList: []
        };
    }


   
    updateCommuneList(searchValue: string): void {
        this.setState({selectedCommune: null});
        this.setState({communeList: []});
        if (searchValue.length >= 2) {
            fetch(`https://geo.api.gouv.fr/communes?nom=${searchValue}&type=commune-actuelle&fields=codeParent,nom,code,codeDepartement&format=json`)
                .then(response => response.json())
                .then((data: ICommune[]) => {
                    this.setState({communeList: data});
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
      }

    }


    selectCommune(commune: ICommune | null): void {
        this.setState({selectedCommune: commune});
        const searchInput: HTMLInputElement = document.getElementById('searchInput') as HTMLInputElement;
        searchInput.value = commune?.nom + " (" + commune?.code + ")" ?? '';
    }

    searchCommune = (): void => {
        const searchUrl: string = this.state.selectedCommune ? this.getArchiveURL(this.state.selectedCommune) : '';
        browser.tabs.create({ url: searchUrl }); 
    }



    /**
    Fetch the URL for the given city.
    **/
    getArchiveURL(commune: ICommune): string {

        if (this.props.urlsData === null) {
            return '';
        }
    
        let urlData = this.props.urlsData.find((urlData: IUrls) => urlData.codeDepartement === commune.codeDepartement);
        if (urlData === undefined) {
            return '';
        }

        let differentBaseUrl: boolean = urlData.etatCivilUrl.startsWith("http");
    
        let archiveUrl: string = ((!differentBaseUrl ? urlData.baseUrl : "") + urlData.etatCivilUrl).replace("@PARAM", FormatHelper.applyFormatToCommuneName(commune.nom, urlData.etatCivilParamFormat));
        return archiveUrl;
    }


    render() {
        return (
            <div className="etatcivil-content">
                <div className="popup-search">
                    <input type="text" 
                            id="searchInput" placeholder="Entrez le nom d'une ville"
                            onChange={e => this.updateCommuneList(e.target.value)}/>
                    <button id="searchButton" onClick={this.searchCommune}>Rechercher</button>
                </div>

                <div id="results">
                    {!this.state.selectedCommune && this.state.communeList.map((commune: ICommune) => (
                        <div className="autocomplete-option" 
                            key={commune.code}
                            onClick={() => this.selectCommune(commune)}>
                                {commune.nom} ({commune.code})
                        </div>
                    ))}

                </div>
                <div className="footer">
                    <p>Remarque : La recherche d'informations sur certaines villes peut ne pas être disponible pour tous les départements.
                    Dans ce cas, vous serez redirigé vers le formulaire de recherche d'état civil du département associé
                    pour poursuivre votre recherche.</p>
                </div>
            </div>
        );
    }
}


export default EtatCivil;