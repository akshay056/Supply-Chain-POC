import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x0fb1aA08a315B8420985415Ed7cfF6B81935937C"
);

export default instance;