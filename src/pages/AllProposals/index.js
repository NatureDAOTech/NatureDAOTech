/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'

const positions = [
    {
        id: 1,
        title: 'Back End Developer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
    },
    {
        id: 2,
        title: 'Front End Developer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Engineering',
        closeDate: '2020-01-07',
        closeDateFull: 'January 7, 2020',
    },
    {
        id: 3,
        title: 'User Interface Designer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Design',
        closeDate: '2020-01-14',
        closeDateFull: 'January 14, 2020',
    },
]

export default function AllProposals() {
    return (
        <>
            <div className="h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mt-16 mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
                            All Proposals
                        </h2>
                        <p className="mt-3 text-xl text-gray-700 sm:mt-4">
                            All of the proposals here, click Approve to add your signature
                        </p>
                    </div>
                </div>
                <div className="container mt-8 px-4 mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {positions.map((position) => (
                                <li key={position.id}>
                                    <a href="#" className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-indigo-600 truncate">{position.title}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {position.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        {position.department}
                                                    </p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                        <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        {position.location}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    <p>
                                                        Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}