const sites = [
    {
        name: 'Satchidanand Eco Village - Pilot site',
        type: 'Sustainable Living',
        imageUrl: '/satchidanand.png',
        weburl: 'https://www.facebook.com/Satchidanand-Living-103866858693757'
    },
    {
        name: 'Bhartiya Gau Raksha Dal',
        type: '1000s of cow-shelters',
        imageUrl: '/bbrd.png',
        weburl: 'http://bgrd.org/India/list-of-gau-shala-in-india'
    },
    {
        name: 'Farmers for Forests',
        type: 'Sustainable forest and farming developers ',
        imageUrl: '/fff.jpg',
        weburl: 'https://farmersforforests.org'
    },
    {
        name: 'Bhagini Nivedita Gramin Vigyan Niketan',
        type: 'Sustainable income generation for neglected communities',
        imageUrl: '/bngvn.png',
        weburl: 'http://bngvn.org'
    },
]

export default function Site() {
    return (
        <div className="bg-white">            
            <div className="flex flex-col items-center justify-center">
                <img src={"/UnitOfExecution.png"} alt="" className="" />            
                <p className="text-green-600">Building blocks of the Unit of Execution at an NGO's site
                    <div className="flex mt-8 justify-center">
                        <a
                            target={"_blank"}
                            href="https://www.youtube.com/watch?v=ymsSes7Dp4Q"
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                        >
                            <span>Watch Intro</span>
                        </a>
                    </div>
                </p>
            </div>
            <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                    <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">NGO Sites</h2>

                    </div>
                    <ul
                        role="list"
                        className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
                    >
                        {sites.map((site) => (
                            <li key={site.name}>
                                <div className="space-y-6">
                                    <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={site.imageUrl} alt="" />
                                    <div className="space-y-2">
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{site.name}</h3>
                                            <p className="text-green-600">{site.type}</p>
                                        </div>
                                        <ul role="list" className="flex justify-center space-x-5">
                                            <li>
                                                <a target={"_blank"} href={site.weburl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="-only">Web Url</span>

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
