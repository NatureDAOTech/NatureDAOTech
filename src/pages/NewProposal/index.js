import Web3Context from "contexts/Web3Context";
import { useContext, useState } from "react";

const NewProposal = ({ }) => {
    const { createProposal } = useContext(Web3Context);
    const [formDetails, setFormDetails] = useState({ contractAddress: "", amount: "", receiver: "" });
    const handleUpdate = (field, value) => {
        let _formDetails = { ...formDetails };
        _formDetails[field] = value;
        setFormDetails(_formDetails);

    }
    const handleSubmit = async () => {
        createProposal(formDetails)
    }
    return (<>
        <div className="mt-10 container mx-auto px-4">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new Voucher</h3>
                        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="contract-address" className="block text-sm font-medium text-gray-700">
                                            Contract Address
                                        </label>
                                        <input
                                            type="text"
                                            value={formDetails.contractAddress}
                                            onChange={(e) => handleUpdate("contractAddress", e.target.value)}
                                            name="contract-address"
                                            id="contract-address"
                                            autoComplete="contractAddress"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>



                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={formDetails.amount}
                                            onChange={(e) => handleUpdate("amount", e.target.value)}
                                            name="amount"
                                            id="amount"
                                            autoComplete="amount"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">
                                            Receiver
                                        </label>
                                        <input
                                            value={formDetails.receiver}
                                            onChange={(e) => handleUpdate("receiver", e.target.value)}

                                            type="text"
                                            name="receiver"
                                            id="receiver"
                                            autoComplete="receiver"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSubmit()
                                    }}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>);
}
export default NewProposal