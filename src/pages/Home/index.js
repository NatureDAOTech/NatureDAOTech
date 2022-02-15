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
    if (!account) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-4xl font-bold">Connect to a wallet first!</div>
                <div className="text-xl text-center font-semibold">You can connect to the test wallets(1 and 2) that have test tokens and test whales<br />Or<br />You can connect with your own wallet</div>
            </div>)
    }
    return (<>

        <div className="flex justify-around">
            <div>
                <div className="flex justify-around">
                    <div className=" sm:px-6 lg:px-0 ">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create a Battle</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Select a whale, and the food
                                        </p>
                                    </div>
                                    <div className="md:flex">
                                        <div className="px-4">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                Whale
                                            </label>
                                            {harmonyWhales && <>
                                                <select
                                                    id="whale_create"
                                                    name="whale_create"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    value={createBattleForm["whaleId"]}
                                                    onChange={e => handleCreateBattleChange("whaleId", e.target.value)}
                                                >
                                                    {harmonyWhales.map(e => {
                                                        return (<option className="flex" value={e}>Whale #{e}</option>
                                                        )
                                                    })}

                                                </select>
                                                <img src={`https://api.harmonywhales.com/images/${createBattleForm["whaleId"]}`} alt="" className="px-2 w-full" />
                                            </>
                                            }
                                        </div>
                                        <div className="px-4">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                Food
                                            </label>
                                            {food && <>
                                                <div className="flex items-center w-full">
                                                    <select
                                                        id="whale_create"
                                                        name="whale_create"
                                                        className=" block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                        value={createBattleForm["whaleId"]}
                                                        onChange={e => handleCreateBattleChange("whaleId", e.target.value)}
                                                    >
                                                        {food.map(e => {
                                                            return (<option className="flex" value={e}>{e}</option>
                                                            )
                                                        })}

                                                    </select>
                                                    <img src={`assets/Whale Food/${food[0]}.png`} alt="" className="px-2 w-32" />
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>


                                    <div className="col-span-3">
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Amount
                                            </label>
                                            <div className="mt-1 relative rounded-md shadow-sm">

                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"

                                                    value={createBattleForm["amount"]}
                                                    onChange={e => handleCreateBattleChange("amount", e.target.value)}
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="0.00"
                                                    aria-describedby="price-currency"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                        WEI
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        onClick={handleCreateBattle}
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Feed My Whale
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </div>

        </div>



    </>)
}
export default Home;