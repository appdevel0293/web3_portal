import './App.css';
import Web3 from 'web3';

function App() {


  var clientAccount = null;
  var phantomProviderEVM = null;

  const quicknodeRPCConfig = {

    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/'],

  };

  const isPhantomInstalled = window?.phantom?.ethereum?.isPhantom;

  const getProvider = async () => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
      return; 
    }
   const provider = window.phantom?.ethereum;
   if (provider) {
    provider.request({
      method: 'eth_requestAccounts'
    }).then((accounts) => {
          clientAccount = accounts[0];
          console.log(clientAccount);
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          }).then( () => {
              if(phantomProviderEVM===null){
                phantomProviderEVM = provider;
                console.log("assigned provider ",phantomProviderEVM);
              }
             }       
          ).catch((error) => {
            console.error(error);
          });
        }
    ).catch((error) => {
      console.error(error);
    });
    }
  }

  getProvider();

  async function testingTx(){
    console.log("send tx ", clientAccount);
    console.log("phantomprovider: ",phantomProviderEVM);

    let web3 = Web3(phantomProviderEVM);

    const result = await phantomProviderEVM.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account_client,
        to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
        value: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
        gasLimit: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
        gasPrice: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
      }],
    });


  }



  return (
    <div className="App">
      <header className="App-header">
      <p> Mint and Verify NFT</p>
      <button onClick={testingTx}> Send Tx </button>
      </header>
    </div>
  );
}

export default App;
