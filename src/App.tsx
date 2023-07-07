import map from './assets/map-homm3.png';
import InfoModal from './components/info/InfoModal';
import { ExplorerMap } from './components/map/ExplorerMap/ExplorerMap';

function App() {
  return (
    <>
      <ExplorerMap mapSrc={map} />
      <InfoModal />
    </>
  );
}

export default App;
