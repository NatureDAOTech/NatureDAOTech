const people = [
    {
        name: 'Sunil Patil - Founder',
        role: 'Concept refinement and execution',
        imageUrl:
            '/sunilPatil.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Hetal Shah - Co-founder',
        role: 'Finance, Taxation, and Fiat Handling',
        imageUrl:
            '/hetalShah.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Arnab Ray',
        role: 'Blockchain Developer',
        imageUrl:
            '/arnabRay.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Ace Vikings',
        role: 'Blockchain Developer',
        imageUrl:
            '/aceVikings.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Anik Ghosh',
        role: 'Blockchain Developer',
        imageUrl:
            '/anikGhosh.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Anshuman Singh',
        role: 'Web3 Frontend / Backend Developer',
        imageUrl:
            '/anshumanSingh.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Soumojit Ash',
        role: 'Web3 Frontend / Backend Developer',
        imageUrl:
            '/soumojitGhosh.png',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    // More people...
]

export default function Team() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Core team</h2>

                    </div>
                    <ul
                        role="list"
                        className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
                    >
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="space-y-6">
                                    <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                                    <div className="space-y-2">
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-green-600">{person.role}</p>
                                        </div>
                                        <ul role="list" className="flex justify-center space-x-5">
                                            <li>
                                                <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="-only">Twitter</span>

                                                </a>
                                            </li>
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="-only">LinkedIn</span>

                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}