import React, { useEffect, useState } from 'react';
import EtatCivil from './components/EtatCivil';
import { IUrls } from './interfaces/IUrls';
import DepartementList from './components/DepartementList';

const App: React.FC = () => {

    const [urlsData, setUrlsData] = useState<IUrls[] | null>(null);
    const [isCommuneView, setIsCommuneView] = useState<boolean>(false);
    const [appVersion, setAppVersion] = useState<string | null>(null);

    useEffect(() => {    
        fetch('./data/data.json')
              .then(response => response.json())
            .then((data: IUrls[] | null) => {
                setUrlsData(data);
         });
    }, []);


    useEffect(() => {
      fetch('./manifest.json')
        .then(response => response.json())
        .then(data => {
          setAppVersion(data.version);
        });
    }, []);


    const goToDepartementsPage = (): void => {
        setIsCommuneView(false);
    }

    const goToCommunePage = (): void => {
        setIsCommuneView(true);
    }

  return (
    <div className="popup-content">
      <div className="app-version">
        <p>{appVersion}</p>
      </div>
      <div className="popup-header">
        <img className="app-icon" src="assets/icon.svg" />
        <h2 className="app-title">GeneArchives</h2>
      </div>

      {isCommuneView && <button className="departements-button" onClick={goToDepartementsPage}>Archives départements</button>}
      {!isCommuneView && <button className="departements-button" onClick={goToCommunePage}>État civil par ville</button>}
      {isCommuneView && urlsData && (<EtatCivil urlsData={urlsData}/>)}
      {!isCommuneView && urlsData && (<DepartementList urlsData={urlsData}/>)}
    </div>
  );
}

export default App;