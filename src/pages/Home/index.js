import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const DURATION = [300, 600, 1800, 3600];
const COLOR = ["Blue", "Red"]
const Home = () => {
    const { account, createBattle,
        joinBattle, getArbTokenBalance,
        getAllHarmonyWhales, listenToCreatedBattles,
        listenToWonBattles, listenToCanceledBattles,
        listenToAcceptedBattles, cancelBattle
    } = useContext(Web3Context);
    const [createBattleForm, setCreateBattleForm] = useState({
        whaleId: "",
        amount: "10",
        color: 0,
        duration: 300,

    })
    const [createWhaleMetadata, setCreateWhaleMetadata] = useState();
    const [joinWhaleMetadata, setJoinWhaleMetadata] = useState();
    const [createdBattles, setCreatedBattles] = useState([]);
    const [battlesToJoin, setBattlesToJoin] = useState([]);
    const [battlesWon, setBattlesWon] = useState([]);
    const [joinBattleForm, setJoinBattleForm] = useState({
        battleId: "",
        whaleId: "",
    });
    const [arbTokenBalance, setArbTokenBalance] = useState("Loading...");
    const [harmonyWhales, setHarmonyWhales] = useState(undefined);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const food = ["Donuts", "Goldfish", "Shrimpo", "Steak"];
    useEffect(() => {
        const fetchStuff = async () => {
            getArbTokenBalance().then(res => setArbTokenBalance(res)).catch(e => setArbTokenBalance("Failed to Fetch Token Balance"));
            getAllHarmonyWhales().then(res => {
                setHarmonyWhales(res)
                setCreateBattleForm({ ...createBattleForm, whaleId: res[0] });
                setJoinBattleForm({ ...joinBattleForm, whaleId: res[0] });
            }).catch(e => { setHarmonyWhales([]) });
            listenToCreatedBattles(handleOnCreateBattle);
            listenToCreatedBattles(handleOnCreateOwnBattle, true);
            listenToWonBattles(handleOnWinBattle);
            listenToCanceledBattles(handleOnCancelledBattle);
            listenToAcceptedBattles(handleOnJoinedBattle);

        }
        if (account) {
            fetchStuff();
        }
    }, [account])
    const handleOnWinBattle = async (data) => {
        console.log(data.battleId + ":WOn")
        if (battlesWon.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...battlesWon]
            _newCreatedBattle.push(data);
            setBattlesWon((e) => ([...e, data]));
        }
    }

    const handleOnCreateBattle = async (data) => {
        console.log("created Battle:" + data.battleId);
        if (battlesToJoin.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...battlesToJoin, data]

            setBattlesToJoin((e) => ([...e, data]));

        }
        console.log(data);
    }
    const handleOnCancelledBattle = async (data) => {
        setBattlesToJoin((battlesToJoin) => battlesToJoin.filter((e) => e.battleId !== data.battleId));
        setCreatedBattles((createdBattles) => createdBattles.filter((e) => e.battleId !== data.battleId));

    }
    const handleOnJoinedBattle = async (data) => {
        console.log("jonied battle: " + data.battleId);
        setBattlesToJoin((battlesToJoin) => battlesToJoin.filter((e) => e.battleId !== data.battleId));
        setCreatedBattles((createdBattles) => createdBattles.filter((e) => e.battleId !== data.battleId));
    }
    const handleOnCreateOwnBattle = async (data) => {
        if (createdBattles.filter((e) => e.battleId === data.battleId).length === 0) {
            let _newCreatedBattle = [...createdBattles]
            _newCreatedBattle.push(data);
            setCreatedBattles((e) => ([...e, data]));
        }
        console.log(data);
    }
    const handleCreateBattleChange = (field, value) => {
        const _createBattleForm = { ...createBattleForm };
        _createBattleForm[field] = value;
        setCreateBattleForm(_createBattleForm);

    }
    const handleJoinBattleChange = (field, value) => {
        const _joinBattleForm = { ...joinBattleForm };
        _joinBattleForm[field] = value;
        setJoinBattleForm(_joinBattleForm);
    }

    const handleCreateBattle = async () => {
        console.log(createBattleForm)
        createBattle(createBattleForm);
    }
    const handleJoinBattle = async (battleId, amount) => {
        joinBattle({ ...joinBattleForm, battleId, amount });
    }
    const handleCancelBattle = async (battleId) => {
        await cancelBattle(battleId);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img src={"/assets/nature_cycle.jpeg"} alt="" className="w-96 mt-16" />
            <div style={{ backgroundColor: "#E2FACF" }} className=" w-full p-8 mt-16 ">
                <p className="mt-1 text-4xl w-full text-center font-semibold sm:tracking-tight ">
                    Mission
                </p>
                <p className="max-w-5xl text-center mt-5 mx-auto text-lg text-gray-800">
                    Bring non-governmental organizations (NGOs) and Charities working on nature restoration to Decentralize autonomous organization
                </p>
                <div className="flex mt-8 justify-center">
                    <a
                        target={"_blank"}
                        href="https://discord.com/invite/APbfVTM5JV"
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                    >
                        <span>Join Discord</span>
                    </a>
                </div>
                <p className="mt-20 text-4xl w-full text-center font-semibold sm:tracking-tight ">
                    Blockchain Problem and Solution

                </p>
                <p className="max-w-5xl text-center mt-5 mx-auto text-lg text-gray-800">
                    <b> Problem:</b> High Energy consumption and centralization of miners and validators
                    <br />
                    <b>Solutions:</b> Renewables and decentralization on hot and developing countries

                </p>
                <div className="flex mt-8 justify-center">
                    <a
                        target={"_blank"}
                        href="https://docs.naturedao.tech/"
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                    >
                        <span>Read Docs</span>
                    </a>
                </div>
            </div>

        </div >)

}
export default Home;