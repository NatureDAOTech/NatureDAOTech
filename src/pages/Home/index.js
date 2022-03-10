import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";


const Home = () => {
   
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img src={"/nature_cycle.png"} alt="" className="max-w-xl p-4 lg:p-0 w-full" />
            <div style={{ backgroundColor: "#E2FACF" }} className=" w-full p-8 mt-8 ">
                <p className="mt-1 text-4xl w-full text-center font-semibold sm:tracking-tight ">
                    Mission
                </p>
                <p className="max-w-5xl text-center mt-5 mx-auto text-lg text-gray-800">
                    Bring non-governmental organizations (NGOs) and Charities working on nature restoration to Decentralize autonomous organization
                </p>
                <div className="flex mt-8 justify-center">
                    <a
                        target={"_blank"}
                        href="https://discord.com/invite/APbfVTM5JV"
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                    >
                        <span>Join Discord</span>
                    </a>
                </div>
                <p className="mt-20 text-4xl w-full text-center font-semibold sm:tracking-tight ">
                    Blockchain Problem and Solution

                </p>
                <p className="max-w-5xl text-center mt-5 mx-auto text-lg text-gray-800">
                    <b> Problem:</b> High Energy consumption and centralization of miners and validators
                    <br />
                    <b>Solutions:</b> Renewables and decentralization on hot and developing countries

                </p>
                <div className="flex mt-8 justify-center">
                    <a
                        target={"_blank"}
                        href="https://docs.naturedao.tech/"
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                    >
                        <span>Read Docs</span>
                    </a>
                </div>
            </div>

        </div >)

}
export default Home;