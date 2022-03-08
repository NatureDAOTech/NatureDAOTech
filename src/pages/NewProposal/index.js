import Web3Context, { NDAO_CONTRACT_ADDRESS } from "contexts/Web3Context";
import { useContext, useState } from "react";
//setGI(address _GIAddress
//setCT(address _CTAddress)
//setCoreTeam(address _VestingAddress
//mintTokens(address _to, uint _amount)
//burn(uint amount)
const FUNCTION_TYPES = [
    {
        index: 0,
        name: "burn",
        params: [
            { name: "amount", type: "wei" }
        ],
    },
    {
        index: 1,
        name: "mintTokens",
        params: [
            { name: "address_to", type: "address" },
            { name: "amount", type: "wei" }

        ]
    },
    {
        index: 2,
        name: "setCoreTeam",
        params: [
            { name: "_VestingAddress", type: "address" }
        ]
    },
    {
        index: 3,
        name: "setCT",
        params: [
            { name: "_CTAddress", type: "address" }
        ]
    },
    {
        index: 4,
        name: "setGI",
        params: [
            { name: "_GIAddress", type: "address" }
        ]
    },
]
const NewProposal = ({ }) => {
    const { createProposal } = useContext(Web3Context);

    const [formDetails, setFormDetails] = useState({ contractAddress: NDAO_CONTRACT_ADDRESS, functionType: FUNCTION_TYPES[0], functionParams: [] });
    const handleUpdate = (field, value) => {
        let _formDetails = { ...formDetails };
        _formDetails[field] = value;
        setFormDetails(_formDetails);

    }
    const handleSubmit = async () => {
        // console.log(formDetails);
        createProposal(formDetails)
    }
    return (<>
        <div className="mt-10 container mx-auto px-4">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new Proposal</h3>
                        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                            Function
                                        </label>
                                        <select
                                            id="location"
                                            name="location"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            value={formDetails.functionType.index}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                let _formDetails = {
                                                    ...formDetails,
                                                    functionType: FUNCTION_TYPES[e.target.value],
                                                    functionName: FUNCTION_TYPES[e.target.value].name,
                                                    functionParams: FUNCTION_TYPES[e.target.value]?.params?.map(e => undefined)
                                                };
                                                setFormDetails(_formDetails);


                                            }}
                                        >
                                            {FUNCTION_TYPES.map(e => {
                                                return (<option value={e.index}>{e.name}</option>)
                                            })}


                                        </select>
                                    </div>


                                    {formDetails?.functionType?.params?.map((e, index) => {
                                        return (
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                    {e.name}
                                                </label>
                                                <input

                                                    value={formDetails?.functionParams[index]}
                                                    onChange={(ee) => {
                                                        let newVal = formDetails?.functionParams;
                                                        newVal[index] = ee.target.value
                                                        handleUpdate("functionParams", newVal)
                                                    }}
                                                    name={e.name}
                                                    id={e.name}
                                                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>);
                                    })}



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