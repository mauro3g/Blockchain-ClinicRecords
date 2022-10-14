import getWeb3 from "getWeb3";
import React from "react";
import SessionContract from "../../__compiled_contracts/SessionContract.json";

import UsersInformationContract from "../../__compiled_contracts/UsersInformation.json";
import CRSyndromesGeriatricProblems from "../../__compiled_contracts/CRSyndromesGeriatricProblems.json";
import CRSickness from "../../__compiled_contracts/CRSickness.json";
import CRPhysicalExam from "../../__compiled_contracts/CRPhysicalExam.json";
import CRPatologicalHistory from "../../__compiled_contracts/CRPatologicalHistory.json";
import CRCommentary from "../../__compiled_contracts/CRCommentary.json";
import CRClinicalAssessment from "../../__compiled_contracts/CRClinicalAssessment.json";
import CRBiologicFunctions from "../../__compiled_contracts/CRBiologicFunctions.json";

interface Props {
  currentAccount: any;
  sessionContract: any;
  usersInformationContract: any;
  cRSyndromesGeriatricContract: any;
  cRSicknessContract: any;
  cRPhysicalExamContract: any;
  cRPatologicalHistoryContract: any;
  cRCommentaryContract: any;
  cRClinicalAssessmentContract: any;
  cRBiologicFunctionsContract: any;
}

export const EthNetworkContext = React.createContext({} as Props);

const EthNetworkProvider = ({ children }) => {
  const [web3, setWeb3] = React.useState<any>(undefined);
  const [currentAccount, setCurrentAccount] = React.useState<any>(undefined);
  const [sessionContract, setSessionContract] = React.useState<any>(undefined);
  const [usersInformationContract, setUsersInformationContract] =
    React.useState<any>(undefined);
  const [cRSyndromesGeriatricContract, setCRSyndromesGeriatricContract] =
    React.useState<any>(undefined);
  const [cRSicknessContract, setCRSicknessContract] =
    React.useState<any>(undefined);
  const [cRPhysicalExamContract, setCRPhysicalExamContract] =
    React.useState<any>(undefined);
  const [cRPatologicalHistoryContract, setCRPatologicalHistoryContract] =
    React.useState<any>(undefined);
  const [cRCommentaryContract, setCRCommentaryContract] =
    React.useState<any>(undefined);
  const [cRClinicalAssessmentContract, setCRClinicalAssessmentContract] =
    React.useState<any>(undefined);
  const [cRBiologicFunctionsContract, setCRBiologicFunctionsContract] =
    React.useState<any>(undefined);

  React.useEffect(() => {
    if (web3 !== undefined) {
      //account change listener
      if (window.ethereum !== undefined) {
        console.log(window.ethereum);
        try {
          window.ethereum.on("accountsChanged", async () => {
            console.log("bef change", web3);
            if (web3) {
              console.log("change");
              const _accounts = await web3.eth.getAccounts();
              //setAccounts(_accounts);
              setCurrentAccount(_accounts[0]);
            }
          });
        } catch (e: any) {
          alert(`Account change check not available.`);
        }
      }
    }
  }, [web3]);

  React.useEffect(() => {
    const initializeData = async () => {
      try {
        // Get network provider and web3 instance.
        const _web3: any = await getWeb3();

        const _accounts = await _web3.eth.getAccounts();
        console.log(_accounts);

        // Get the contract instance.
        const networkId = await _web3.eth.net.getId(); //obtiene con el metamask
        //5777-ganache 4-rinkeby 1337-metamask localhost
        const deployedNetwork = SessionContract.networks[networkId];
        console.log("networkId ", networkId)
        console.log("deployedNetwork.address ", deployedNetwork.address)
        const sessionContractInstance = new _web3.eth.Contract(
          SessionContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log("sessionContractInstance ", sessionContractInstance.options.address)
        //sessionContractInstance.options.address = "0xB06F8d31B54A59Be6c6d0420594855EBe29EdeAa"
        
        const usersInformationContractInstance = new _web3.eth.Contract(
          UsersInformationContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log("usersInformationContract ", usersInformationContractInstance.options.address)
        const cRSyndromesGeriatricProblemsInstance = new _web3.eth.Contract(
          CRSyndromesGeriatricProblems.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRSicknessInstance = new _web3.eth.Contract(
          CRSickness.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRPhysicalExamInstance = new _web3.eth.Contract(
          CRPhysicalExam.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRPatologicalHistoryInstance = new _web3.eth.Contract(
          CRPatologicalHistory.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRCommentaryInstance = new _web3.eth.Contract(
          CRCommentary.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRClinicalAssessmentInstance = new _web3.eth.Contract(
          CRClinicalAssessment.abi,
          deployedNetwork && deployedNetwork.address
        );
        const cRBiologicFunctionsInstance = new _web3.eth.Contract(
          CRBiologicFunctions.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(_web3);
        setCurrentAccount(_accounts[0]);
        setSessionContract(sessionContractInstance);
        setUsersInformationContract(usersInformationContractInstance);
        setCRSyndromesGeriatricContract(cRSyndromesGeriatricProblemsInstance);
        setCRSicknessContract(cRSicknessInstance);
        setCRPhysicalExamContract(cRPhysicalExamInstance);
        setCRPatologicalHistoryContract(cRPatologicalHistoryInstance);
        setCRCommentaryContract(cRCommentaryInstance);
        setCRClinicalAssessmentContract(cRClinicalAssessmentInstance);
        setCRBiologicFunctionsContract(cRBiologicFunctionsInstance);

        //test
        console.log("test get users ", sessionContractInstance);
        let res = await sessionContractInstance.methods
          .getUserRoles()
          .call({from: _accounts[0]});
        console.log("res test: ", res);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    if (Boolean(!web3)) {
      initializeData();
    }
  }, []);

  return (
    <EthNetworkContext.Provider
      value={{
        currentAccount,
        sessionContract,
        usersInformationContract,
        cRSyndromesGeriatricContract,
        cRSicknessContract,
        cRPhysicalExamContract,
        cRPatologicalHistoryContract,
        cRCommentaryContract,
        cRClinicalAssessmentContract,
        cRBiologicFunctionsContract,
      }}
    >
      {children}
    </EthNetworkContext.Provider>
  );
};

export default EthNetworkProvider;
