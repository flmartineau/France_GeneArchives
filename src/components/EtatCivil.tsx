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
    selectedArchiveType: string;
}


class EtatCivil extends React.Component<EtatCivilProps, EtatCivilState> {
    constructor(props: EtatCivilProps) {
        super(props);
        this.state = {
            selectedCommune: null,
            communeList: [],
            selectedArchiveType: "etat-civil"
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

        let typeUrl: string = this.state.selectedArchiveType == 'etat-civil' ? urlData.etatCivilUrl : urlData.recensementUrl;
        let typeParamFormat: string = this.state.selectedArchiveType == 'etat-civil' ? urlData.etatCivilParamFormat : urlData.recensementParamFormat;

        let differentBaseUrl: boolean = typeUrl.startsWith("http");

        let isArkoFormat: boolean = typeUrl.includes("@ARKO_PARAMS");


        if (isArkoFormat) {
            let arkoRegex = /@ARKO_PARAMS\(([^,]*),([^)]*)\)/;
            let params = typeUrl.match(arkoRegex)?.[0] ?? '';
            let id1 = typeUrl.match(arkoRegex)?.[1] ?? '';
            let id2 = typeUrl.match(arkoRegex)?.[2] ?? '';

            let arkoParams = `arko_default_${id1}--filtreGroupes[groupes][0]` +
                `[arko_default_${id2}][op]=AND&arko_default_${id1}--filtreGroupes[groupes][0]` + 
                `[arko_default_${id2}][q][]=@PARAM&arko_default_${id1}--filtreGroupes[groupes][0][arko_default_${id2}][extras][mode]=popup`;

        
            return ((!differentBaseUrl ? urlData.baseUrl : "") + typeUrl)
                .replace(params, arkoParams)
                .replace("@PARAM", FormatHelper.applyFormatToCommuneName(commune.nom, typeParamFormat));
        }

    
        let archiveUrl: string = ((!differentBaseUrl ? urlData.baseUrl : "") + typeUrl)
            .replaceAll("@PARAM", FormatHelper.applyFormatToCommuneName(commune.nom, typeParamFormat));
        return archiveUrl;
    }

    handleArchiveTypeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({selectedArchiveType: event.target.value});
    }


    render() {
        return (
            <div className="etatcivil-content">
                <div className="archives-select">
                    <div>
                        <input type="radio" id="etat-civil" name="archive-type" value="etat-civil" 
                                checked={this.state.selectedArchiveType == 'etat-civil'}
                                onChange={this.handleArchiveTypeChange}/>
                        <label htmlFor="etat-civil">État civil</label>
                    </div>
                    <div>
                        <input type="radio" id="recensements" name="archive-type" value="recensements" 
                                checked={this.state.selectedArchiveType == 'recensements'}
                                onChange={this.handleArchiveTypeChange}/>
                        <label htmlFor="cadastre">Recensements</label>
                    </div>
                </div>
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