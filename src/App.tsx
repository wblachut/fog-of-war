import map from './assets/map-homm3.png';
import { ExplorerMap } from './components/map/ExplorerMap';

function App() {
  return (
    <>
      <ExplorerMap mapSrc={map} />
    </>
  );
}

export default App;
