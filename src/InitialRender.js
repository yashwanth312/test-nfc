import {React, useState, useEffect} from 'react';


function InitialRedner () {
  const [isEthereumAvailable, setIsEthereumAvailable] = useState(false);

  useEffect(() => {
    // Check if window.ethereum is available
    if (window.ethereum) {
        setIsEthereumAvailable(true);
    }
}, []);

const openInMetaMask = () => {
  window.location.href = 'https://metamask.app.link/dapp/https://35a7-208-59-144-6.ngrok-free.app/';
};

return (
  <div>
      {isEthereumAvailable ? (
          <h1>Welcome</h1>
      ) : (
          <button
              onClick={openInMetaMask}
          >
              Open In Metamask
          </button>
      )}
  </div>
);
}

export default InitialRedner;