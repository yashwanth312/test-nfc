
import './App.css';
import MetaMaskConnect from './ConnectToMetamask';
import PurchaseSongs from './UserPreferences';



function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <MetaMaskConnect />
      <PurchaseSongs />
    </div>
  );
}


export default App;
