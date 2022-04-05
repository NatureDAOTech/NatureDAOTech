/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
    {
        question: "Why Blockchain and DAO?",
        answer:
            "Blockchain features a. Immutable, transparent data storage b.Decentralized, no need for intermediaries c. Resistant against malicious participants d. Open to everyone. These features are synergic to work with NGOs and nature preservation and conservation"
    },
    {
        question: "What if crypto mining goes out of business and people can run validators on their mobile devices?",
        answer:
            "By then NatureDAO and NGOs will be already having matured partnership. This partnership can work on supporting the requirements of current and next generation blockchain, Defis and DAOs. We’ve plans to introduce microfinance with communities engaged on NDAO to further enhance nature restoration operations.",
    },
    {
        question: "How it is different than existing DAOs e.g. klimadao&Toucan which are also working for climate change?",
        answer:
            "Nature DAO is working on very specific use case of engaging local NGOs to bring them on Defi. We’ve very specific roadmap with starting point is running mining sites with renewable energy. Many DAOs work on bond, stake and sell (3,3) mechanism where we’re planning to work on revenue generation model by engaging NGOs. We directly link our carbon offset to our crypto revenue. We have a model which a general investor can understand and participate without complexity and 3rd party / intermediaries involvements. ",
    },
    {
        question: "How this plan will be implemented?",
        answer:
            "Please read the docs https://docs.naturedao.tech",
    },

    // More questions...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-medium text-gray-900">{faq.question}</span>
                                                <span className="ml-6 h-7 flex items-center">
                                                    <ChevronDownIcon
                                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
