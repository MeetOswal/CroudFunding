import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    '0xcff31e9d533563533Ad57727B247F2f83712d866'
);

export default instance;