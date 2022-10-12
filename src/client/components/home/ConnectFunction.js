// these are util functions for connect wallet buttons
import { createAlchemyWeb3 } from '@alch/alchemy-web3';

// this key is a dummy key only used for local development
const api = 'https://eth-mainnet.g.alchemy.com/v2/3XYmEGlXsp48FzFNnVJ-IKgQOOXcGlli';

const wallet = {
  // requests account info on connection
  connectWallet: async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const obj = {
          status: 'wallet connected',
          address: addressArray[0],
        };
        console.log(addressArray);
        if (addressArray.length > 0) sessionStorage.setItem('user', addressArray[0]);
        return obj;
      } catch (err) {
        console.log('error');
        return {
          address: '',
          status: `😥 ${err.message}`,
        };
      }
    } else {
      return {
        address: '',
        status: (
          <span>
            <p>
              {' '}
              🦊
              {' '}
              <a
                target="_blank"
                href="https://metamask.io/download.html"
                rel="noreferrer"
              >
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  },

  getCurrentWalletConnected: async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: '👆🏽 Write a message in the text-field above.',
          };
        }
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        };
      } catch (err) {
        return {
          address: '',
          status: `😥 ${err.message}`,
        };
      }
    } else {
      return {
        address: '',
        status: (
          <span>
            <p>
              {' '}
              🦊
              {' '}
              <a
                target="_blank"
                href="https://metamask.io/download.html"
                rel="noreferrer"
              >
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  },

  grabNfts: async (user) => {
    const web3 = createAlchemyWeb3(api);

    // this grabs every NFT contract address and their token id
    const nfts = await web3.alchemy.getNfts({ owner: user, contractAddresses: ["0x8153f4b100def4b1480b18dd159e64e68f1ad4c7", '0x620b70123fb810f6c653da7644b5dd0b6312e4d8'] });
    // grabs metadata from each nft
    const nftArray = await Promise.all(
      nfts.ownedNfts.map(async (obj) => {
        const response = await web3.alchemy.getNftMetadata({
          contractAddress: obj.contract.address,
          tokenId: obj.id.tokenId,
        });
        if (
          response.contract['address'] == "0x8153f4b100def4b1480b18dd159e64e68f1ad4c7" ||  response.contract['address'] == '0x620b70123fb810f6c653da7644b5dd0b6312e4d8'
        ) {
          const responseObj = {};
          responseObj.title = response.title;
          responseObj.image = response.media[0].gateway;
          return responseObj;
        }
        // filters out undefined values in array
      }),
    ).then((array) => array.filter((value) => value !== undefined));
    // final array that should only have noodle and doodle objects
    return nftArray;
  },
};

export default wallet;
