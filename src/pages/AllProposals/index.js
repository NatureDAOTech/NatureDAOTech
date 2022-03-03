/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, LocationMarkerIcon, UsersIcon, PlusIcon, CardIcon } from '@heroicons/react/solid'
import Web3Context from 'contexts/Web3Context'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const IndividualProposal = ({ proposal = {} }) => {

    const { approveProposal } = useContext(Web3Context);
    return (<li key={proposal?.proposalId}>
        <a href="#" className="block hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">Proposal ID:{proposal.proposalId}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {proposal?.approve ? "Approved" : "Approve"}
                        </p>
                    </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                            <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {proposal.receiver}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {proposal.amount}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p>
                            Contract address: {proposal.contractAddress}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </li>)

}

export default function AllProposals() {
    const [proposals, setProposals] = useState([]);
    const { getAllProposals } = useContext(Web3Context);
    useEffect(() => {
        getAllProposals().then(val => setProposals(val));
    }, [])
    return (
        <>
            <div className="min-h-screen my-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mt-16 mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                            All Proposals
                        </h2>
                        <p className="mt-3 text-xl text-gray-700 sm:mt-4">
                            All of the proposals here, click Approve to add your signature
                        </p>
                    </div>
                    <div className="w-full flex justify-center mt-8">
                        <Link
                            to={"/app/proposals/new"}
                            type="button"
                            className="relative mx-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            <span>Create new proposal</span>
                        </Link>
                    </div>
                </div>

                <div className="container mt-8 px-4 mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {proposals.map(e => {
                                e.proposalId = e._id;
                                return (<IndividualProposal proposal={e} />)
                            })}

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}