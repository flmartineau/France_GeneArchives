import React, { useEffect, useState } from 'react';
import EtatCivil from './components/EtatCivil';
import { IUrls } from './interfaces/IUrls';

const App: React.FC = () => {

    const [urlsData, setUrlsData] = useState<IUrls[] | null>(null);

    useEffect(() => {    
        fetch('./data/data.json')
              .then(response => response.json())
            .then((data: IUrls[] | null) => {
                setUrlsData(data);
         });
    }, []);

  return (
    <div className="popup-content">
      <div className="app-version">
        <p>v1.0</p>
      </div>
      <div className="popup-header">
        <img className="app-icon" src="assets/icon.svg" />
        <h2 className="app-title">GeneArchives</h2>
      </div>
      {urlsData && (<EtatCivil urlsData={urlsData}/>)}
      <script src="popup.js"></script>
    </div>
  );
}

export default App;