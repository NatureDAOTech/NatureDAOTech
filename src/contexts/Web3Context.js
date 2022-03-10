import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';

import icoAbi from "abis/ico.json";
import usdtAbi from "abis/usdt.json"
import ndaoAbi from "abis/ndao.json";
import { Provider as MulticallProvider, Contract as MulticallContract } from "ethers-multicall";
import { BigNumber, utils } from "../../node_modules/ethers/lib/ethers";
import { toast } from 'react-toastify';
import axios from "axios"

const Web3Context = createContext();

const RPC_URL = "https://rpc-mumbai.matic.today";
const CHAIN_ID = 80001;
const NATIVE_CURRENCY = {
    name: "MATIC",
    symbol: "MATIC", // 2-6 characters long
    decimals: 18,
}
const MULTI_CALL_ADDRESS = "0xd078799c53396616844e2fa97f0dd2b4c145a685";
const CHAIN_NAME = "Mumbai Testnet";
const BASE_URL = "https://ndao-backend.herokuapp.com/proposal";


export const ICO_CONTRACT_ADDRESS = "0x14DB3f9A671B7449d957ACFfa0AAb9995A8875a1";
export const USDT_CONTRACT_ADDRESS = "0x1D506F92737a9bdAfa8ef7Eb39167B0F2638929a";
export const NDAO_CONTRACT_ADDRESS = "0x435e0632714408413E51495aB44341F28F983012";
export const NDAO_TREASURY_ADDRESS = "0x435e0632714408413E51495aB44341F28F983012";
export const Web3Provider = (props) => {

    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [contractObjects, setContractObjects] = useState();
    const [baseCoinPrice, setBaseCoinPrice] = useState()
    const [isPaused, setIsPaused] = useState()
    const [update, setUpdate] = useState(0);
    const [stats, setStats] = useState({})
    const functionsToExport = {};

    const onAccountsChanged = async (accounts) => {
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();
        setSigner(_signer);
    }
    useEffect(() => {
        if (account) {
            calculateStats();
        }
    }, [account, update])
    useEffect(() => {
        try {
            const _signer = signer || new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            );
            const icoContract = new ethers.Contract(ICO_CONTRACT_ADDRESS, icoAbi, _signer);
            const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, usdtAbi, _signer);
            const ndaoContract = new ethers.Contract(NDAO_CONTRACT_ADDRESS, ndaoAbi, _signer);

            const _contractObjects = {
                icoContract,
                usdtContract,
                ndaoContract
            }
            setContractObjects(_contractObjects);
        }
        catch (e) {
            console.log(e)
        }
    }, [signer])
    const addNewChain = async () => {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: `0x${CHAIN_ID.toString(16)}`,
                    rpcUrls: [RPC_URL],
                    chainName: CHAIN_NAME,
                    nativeCurrency: NATIVE_CURRENCY,
                },
            ],
        });
    }
    const switchCain = async () => {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
        });
    }
    const promptChain = async () => {
        try {
            await switchCain();
        }
        catch (e) {
            await addNewChain();
            // await switchCain();
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();
        setSigner(_signer);

    }
    const onChainChanged = async (chainID) => {

        await promptChain()
    }
    const setupMultiCallContract = async (contractAddress, abi) => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        const ethcallProvider = new MulticallProvider(provider);

        await ethcallProvider.init();
        ethcallProvider._multicallAddress =
            MULTI_CALL_ADDRESS;

        const multicallContract = new MulticallContract(contractAddress, abi);
        return ([ethcallProvider, multicallContract]);

    }
    functionsToExport.connectWallet = async (defaultAccount = -1) => {
        const { ethereum } = window

        if (!ethereum) {
            toast.error("You need a wallet to continue!");
            return
        }

        if (ethereum) {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            await promptChain()
            ethereum.on('chainChanged', onChainChanged);
            ethereum.on('accountsChanged', onAccountsChanged);
            setAccount(accounts[0]);
            toast.success("Wallet Connected!")
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = provider.getSigner();
            setSigner(_signer);
        }
    }

    const calculateStats = async () => {
        const basePrice = parseInt((await contractObjects?.icoContract?.basePriceNDAO()).toString()) / 1000000.00;
        const totalSupplyICO = utils.formatEther((await contractObjects?.ndaoContract?.balanceOf(ICO_CONTRACT_ADDRESS)).toString());
        const balanceOf = utils.formatEther((await contractObjects?.ndaoContract?.balanceOf(account)).toString());
        setStats({ basePrice, totalSupplyICO, balanceOf })

    }
    functionsToExport.getBasePriceNDAO = async () => {
        try {
            console.log(contractObjects)
            const basePrice = (await contractObjects?.icoContract?.basePriceNDAO()).toString();
            console.log(basePrice)
            setBaseCoinPrice(basePrice)
            return basePrice;
        }
        catch (e) {
            console.log(e)
        }
    }
    functionsToExport.checkIfPaused = async () => {
        try {
            const paused = (await contractObjects?.icoContract?.paused());
            setIsPaused(paused)
            return paused;
        }
        catch (e) {
            console.log(e)
        }
    }
    functionsToExport.investDao = async (amount) => {
        try {
            console.log(baseCoinPrice);
            const requiredAmount = BigNumber.from(amount * baseCoinPrice);
            console.log(requiredAmount.toString())
            const availableBalance = await contractObjects?.usdtContract.allowance(account, ICO_CONTRACT_ADDRESS);
            console.log(availableBalance)
            if (availableBalance.lt(requiredAmount)) {
                toast.info(`Increasing Allowance for ICO (Placing Transaction)`)
                console.log(requiredAmount.mul(1000000).toString())
                console.log((parseInt(parseFloat(requiredAmount) * 100)).toString());
                const increaseBal = await contractObjects?.usdtContract.increaseAllowance(ICO_CONTRACT_ADDRESS, (parseFloat(requiredAmount) * 100).toString());
                const result = await increaseBal.wait()

            }
            toast.info(`Placing Transaction`)

            const transaction = await contractObjects?.icoContract?.Invest((parseInt(parseFloat(amount) * 100)).toString());
            console.log(transaction);
            console.log(transaction.value.toString());
            toast.info(`Transaction Placed`);

            const transactionHash = await transaction.wait();
            console.log(transactionHash);
            toast.success(`Transaction Successful!`);
            setUpdate(val => val + 1);
        }
        catch (e) {
            console.log(e)
            toast.error(`Transaction Failed`)
            setUpdate(val => val + 1);

        }

    }
    const encodeSinger = async (functionName, parameters) => {
        //let ABI = ["function mint(uint amount) external"];
        let iface = new ethers.utils.Interface(ndaoAbi);
        console.log(functionName,parameters)
        const n = await iface.encodeFunctionData(functionName, parameters);
        console.log(n);
        return n;
    };


    const levelSigner = async (newVal) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const domain = {
            name: "NDAO",
            version: "1",
            chainId: 80001,
            verifyingContract: "0x4b7550803cFbe3659491DfF6896DB8D0ba58f612"
        };
        const types = {
            Signer: [
                { name: "proposalId", type: "uint256" },
                { name: "contractAddress", type: "address" },
                { name: "functionCall", type: "bytes" },
                { name: "gas", type: "uint256" },
                { name: "amount", type: "uint256" },
            ]
        };
        console.log(newVal)
        const functionCall = ethers.utils.arrayify(await encodeSinger(newVal.functionType.name, newVal.functionParams))
        const value = {
            proposalId: newVal.proposalId,
            contractAddress: newVal.contractAddress,
            functionCall: functionCall,
            amount:"0",
            gas:"5000"

        }
        console.log(value)
        // const value = {
        //     proposalId: 1,
        //     contractAddress: "0x9a53d2E5497468eD2569E7D8d7eD9b1379Fb2c05",
        //     amount: 100,
        //     receiver: "0x5d0c83A6bd7bf1986E5519C766f6568D2B390dE0"
        // };
        // const value = {
        //     proposalId: 1,
        //     contractAddress : "0x9b29c09dfF568912B22fFd9A4b03964907df1b57",
        //     amount: 100,
        //     receiver: "0x2141fc90F4d8114e8778447d7c19b5992F6A0611"
        // }

        const _signer = provider.getSigner();

        const sign = await _signer._signTypedData(domain, types, value);
        console.log(sign);
        let test = await ethers.utils.verifyTypedData(domain, types, value, sign);
        console.log(test);
        return [sign, account, functionCall];
    }
    functionsToExport.getAllProposals = async () => {
        const allProposals = await axios.get(`${BASE_URL}/all`)
        return (allProposals.data);
    }
    functionsToExport.createProposal = async (proposalBody) => {
            proposalBody.amount = parseInt(proposalBody.amount);
            console.log(proposalBody);
            // const countRequest = await axios.get(`${BASE_URL}/count`);
            const count = 0;
            // const count = countRequest.data.count + 1;
            console.log(count)
            proposalBody.proposalId = count;
            const [signature, address, functionCall] = await levelSigner(proposalBody);
            proposalBody.functionCall = functionCall
            proposalBody.signature = signature;
            proposalBody.walletAddress = account;
            proposalBody.functionName = proposalBody?.functionType?.name
            
            console.log(proposalBody)
            const result = await axios.post(`${BASE_URL}/new`, proposalBody);
            toast(`Proposal Created!`)

        
     
    }
    functionsToExport.getProposals = async () => {
        try {
            const resp = axios.get(`${BASE_URL}/all`);
            console.log(resp);
        }
        catch (e) {
            console.log(e.response.data)
        }
    }
    functionsToExport.approveProposal = async ({ proposal }) => {
        try {
            const [signature, address, functionSigner] = await levelSigner(proposal);
            const result = await axios.post(`${BASE_URL}/approve`, { walletAddress: address, signature, proposalId: proposal.proposalId });
            toast(`Proposal Approved!`)
        }
        catch (e) {
            toast(`Proposal could not be Approved!`)
        }
    }
    return (<Web3Context.Provider value={{ account, isPaused, baseCoinPrice, stats, ...functionsToExport }}>
        {props.children}
    </Web3Context.Provider>)
}
export default Web3Context;