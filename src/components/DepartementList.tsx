import React from "react";
import { ICommune } from "../interfaces/ICommune";
import { FormatHelper } from "../helper/FormatHelper";
import { IUrls } from "../interfaces/IUrls";
import { IDepartement } from "../interfaces/IDepartement";

interface DepartementListProps {
    urlsData: IUrls[] | null;
}

interface DepartementListState {
    selectedDepartementCode: string | null;
    departementList: IDepartement[];
}


class DepartementList extends React.Component<DepartementListProps, DepartementListState> {
    constructor(props: DepartementListProps) {
        super(props);
        this.state = {
            selectedDepartementCode: '01',
            departementList: []
        };

        fetch(`https://geo.api.gouv.fr/departements`)
                .then(response => response.json())
                .then((data: IDepartement[]) => {
                    console.log(data);
                    this.setState({departementList: data});
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
    }


    selectDepartement(departementCode: string): void {
        this.setState({selectedDepartementCode: departementCode});
    }

    searchDepartement = (): void => {

        if (this.props.urlsData === null) {
            return;
        }
       
        let urlData = this.props.urlsData.find((urlData: any) => urlData.codeDepartement === this.state.selectedDepartementCode);
        if (urlData === null || urlData === undefined) {
            return;
        }

        browser.tabs.create({ url: urlData.baseUrl }); 
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
    
        let archiveUrl: string = (urlData.baseUrl + urlData.etatCivilUrl).replace("@PARAM", FormatHelper.applyFormatToCommuneName(commune.nom, urlData.etatCivilParamFormat));
        return archiveUrl;
    }


    render() {
        return (
            <div className="departements-content">
                <div className="popup-search">
                    <select id="select-departements" name="selectedDepartement" onChange={(e) => this.selectDepartement(e.target.value)}>
                        {this.state.departementList.map((departement: IDepartement) => (
                            <option value={departement.code}>{departement.code} - {departement.nom}</option>
                        ))}
                    </select>

                    <button id="searchButton" onClick={this.searchDepartement}>Rechercher</button>
                </div>
                
            </div>
        );
    }
}


export default DepartementList;