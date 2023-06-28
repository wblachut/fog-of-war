import map from './assets/map-homm3.png';
import { ExplorerMap } from './components/map/ExplorerMap';

// Add Explorer Map
// 1. Display Simple map X
// 2. Todos: Implement map in Canvas.js or gaming lib
// 3. Add player => marker UI Component and
// 4. Uncover area near player marker

// Add Player Marker movability => logic inside canvas map
// Add Map Unfolding
// Add Player progress (Context API)

function App() {
  return (
    <>
      <ExplorerMap mapSrc={map} PlayerMarker={<></>} />
    </>
  );
}

export default App;
