/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { CreditCardIcon } from '@heroicons/react/solid'
import Web3Context from "contexts/Web3Context";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Docs', href: 'https://docs.naturedao.tech/', current: false },
    { name: 'Team', link: '/team', current: false },
    { name: 'FAQ', link: '/faq', current: false },
    { name: 'Sites', link: '/site', current: false },
    // { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomeNavbar() {
    const navigate = useNavigate()
    const { connectWallet, account } = useContext(Web3Context)
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <a href="https://docs.naturedao.tech/tokenomics-ndao-token" target={"_blank"} className="w-full">
                        <div style={{ backgroundColor: "#E2FACF" }} className="cursor-pointer w-full py-2 font-bold text-lg  text-center">NDAO Token launch - April 2022</div>
                    </a>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-24">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 font-extrabold  text-2xl flex items-center">
                                    <Link
                                        to="/">
                                        <img src={"/nature_logo.png"} className='h-32 cursor-pointer' />
                                    </Link>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => {
                                        if (item.link) {
                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.link}
                                                    className={classNames(
                                                        item.current ? '' : ' hover:bg-gray-300 ',
                                                        'px-3 py-2 rounded-md text-md font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        }
                                        return (<a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            className={classNames(
                                                item.current ? 'cursor-pointer' : ' hover:bg-gray-300 ',
                                                'px-3 py-2 cursor-pointer rounded-md text-md font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>)
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="hidden md:block flex-shrink-0">
                                    <button
                                        onClick={() => navigate("/app")}
                                        type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                                    >
                                        <span>Go to App</span>
                                    </button>
                                </div>
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">


                                    {/* Profile dropdown */}
                                    {/* <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => {
                                if (item.link) {
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.link}
                                            className={classNames(
                                                item.current ? 'bg-gray-300 text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                }
                                return (<a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    className={classNames(
                                        item.current ? 'bg-gray-300 text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>)
                            })}
                            <Disclosure.Button
                                as="div"
                                className={
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                }
                            >
                                <button
                                    onClick={() => navigate("/app")}
                                    type="button"
                                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                                >
                                    <span>Go to App</span>
                                </button>                            </Disclosure.Button>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            {/* <div className="flex items-center px-5 sm:px-6">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div> */}
                            <div className="mt-3 px-2 space-y-1 sm:px-3">
                                {/* {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))} */}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}