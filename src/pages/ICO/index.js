import Web3Context from "contexts/Web3Context";
import React, { useContext, useEffect, useState } from "react"
export default function ICO() {
    const [amount, setAmount] = useState(0);
    const { investDao, getBasePriceNDAO, checkIfPaused, account, baseCoinPrice, stats } = useContext(Web3Context);
    console.log(stats);
    useEffect(() => {
        const doWork = async () => {
            const [isPaused, basePrice] = await Promise.all([checkIfPaused(), getBasePriceNDAO()]);
            console.log(isPaused, basePrice);
        }
        doWork()
    }, [account])
    if (!account) {
        return (<>
            <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className=" pt-4 sm:pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                                Please connect your wallet to continue!
                            </h2>
                            <p className="mt-3 text-xl text-gray-700 sm:mt-4">
                                (You will be prompted to switch to Polygon Network.)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className=" pt-4 sm:pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                                Nature DAO ICO
                            </h2>
                            <p className="mt-3 text-xl text-gray-700 sm:mt-4">
                                ICO description
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 pb-12  sm:pb-16">
                        <div className="relative">
                            <div className="absolute inset-0 h-1/2 " />
                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                        <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Base Price</dt>
                                            <dd className="order-1 text-5xl font-extrabold text-green-600">{parseFloat(stats?.basePrice || "0").toFixed(4)}</dd>
                                        </div>
                                        <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Total Supply</dt>
                                            <dd className="order-1 text-5xl font-extrabold text-green-600">{parseFloat(stats?.totalSupply || "0").toFixed(4)}{ }</dd>
                                        </div>
                                        <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">You Own</dt>
                                            <dd className="order-1 text-5xl font-extrabold text-green-600">{parseFloat(stats?.balanceOf || "0").toFixed(4)}{ }</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Amount you purchase
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={amount}
                                        onChange={(e) => {
                                            // if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                                            setAmount(parseFloat(e.target.value))
                                            // }
                                            // else {

                                            // }
                                        }}
                                        id="number"
                                        name="number"
                                        type="number"
                                        autoComplete="number"
                                        required
                                        className="appearance-none text-5xl block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 "
                                    />
                                    NDAO
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Amount you pay
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        disabled
                                        autoComplete="email"
                                        required
                                        value={(parseFloat(parseFloat(amount) * parseFloat(baseCoinPrice)) / 1000000).toFixed(4)}
                                        className="appearance-none text-5xl block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 "
                                    />
                                    USDT
                                </div>
                            </div>



                            <div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (amount !== "" && parseInt(amount) > 0) {
                                            investDao(amount);
                                        }
                                    }}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Purchase
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}