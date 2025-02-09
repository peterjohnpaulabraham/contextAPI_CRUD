import './App.css';
import Dashbord from './Dashboard';
import {CrudContextProvider} from './CrudProvider';
function App() {
  return (
    <div>
      <CrudContextProvider>
        <Dashbord/>
      </CrudContextProvider>
       
    </div>
  );
}

export default App;
