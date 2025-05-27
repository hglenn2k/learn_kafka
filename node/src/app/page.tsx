"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
    // Account form state
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [balance, setBalance] = useState("");

    // Transaction form state
    const [fromAccountName, setFromAccountName] = useState("");
    const [toAccountName, setToAccountName] = useState("");
    const [amount, setAmount] = useState("");

    const handleAccountSubmit = () => {
        console.log(`name: ${name}`);
        console.log(`country: ${country}`);
        console.log(`balance: ${balance}`);
    };

    const handleTransactionSubmit = () => {
        console.log(`fromAccountName: ${fromAccountName}`);
        console.log(`toAccountName: ${toAccountName}`);
        console.log(`amount: ${amount}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full md:max-w-4xl lg:max-w-6xl flex flex-col gap-8">
                {/* title */}
                <h1 className="text-3xl font-bold text-center pb-1">&quot;honor system&quot; bank</h1>

                {/* subtitle */}
                <p className="text-sm text-center">
                    gitflow, ci/cd, docker, typescript, next.js (react), express.js, mongodb, postgres, kafka, aws
                </p>

                {/* separator */}
                <div className="border-t border-white"></div>

                {/* account and transaction forms */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* account form */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-center">create account</h2>

                        <div>
                            <label htmlFor="name" className="block text-sm mb-1">name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm mb-1">country</label>
                            <input
                                id="country"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="balance" className="block text-sm mb-1">balance</label>
                            <input
                                id="balance"
                                type="number"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 border rounded font-mono text-xs bg-blue-900 hover:bg-blue-700 text-white"
                                onClick={handleAccountSubmit}
                            >
                                create account
                            </button>
                        </div>
                    </div>

                    {/* transaction form */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-center">make transaction</h2>

                        <div>
                            <label htmlFor="fromAccountName" className="block text-sm mb-1">fromaccountname</label>
                            <input
                                id="fromAccountName"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={fromAccountName}
                                onChange={(e) => setFromAccountName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="toAccountName" className="block text-sm mb-1">toaccountname</label>
                            <input
                                id="toAccountName"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={toAccountName}
                                onChange={(e) => setToAccountName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="amount" className="block text-sm mb-1">amount</label>
                            <input
                                id="amount"
                                type="number"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 border rounded font-mono text-xs bg-blue-900 hover:bg-blue-700 text-white"
                                onClick={handleTransactionSubmit}
                            >
                                submit transaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* separator */}
                <div className="border-t border-white"></div>

                {/* log streams */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* integration log stream */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h2 className="text-lg font-semibold text-center mb-1">integration log stream</h2>
                        <textarea
                            id="logstream"
                            placeholder=""
                            readOnly
                            className="w-full p-2 border rounded font-mono text-sm h-48 bg-gray-50 dark:bg-gray-800"
                        />
                    </div>

                    {/* kafka log stream */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h2 className="text-lg font-semibold text-center mb-1">kafka log stream</h2>
                        <textarea
                            id="kafkalogstream"
                            placeholder=""
                            readOnly
                            className="w-full p-2 border rounded font-mono text-sm h-48 bg-gray-50 dark:bg-gray-800"
                        />
                    </div>
                </div>

                {/* footer Link */}
                <footer className="text-center mt-8">
                    <a
                        href="https://github.com/hglenn2k/learn_kafka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm hover:underline"
                    >
                        <Image
                            aria-hidden
                            src="/globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                        />
                        project repo -&gt;
                    </a>
                </footer>
            </div>
        </div>
    );
}