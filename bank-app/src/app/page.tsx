"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        console.log(`from: ${fromAccount}`);
        console.log(`to: ${toAccount}`);
        console.log(`amount: ${amount}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full md:max-w-lg lg:max-w-xl flex flex-col gap-8">
                {/* title */}
                <h1 className="text-3xl font-bold text-center pb-1">&quot;honor system&quot; bank</h1>

                {/* subtitle */}
                <p className="text-sm text-center">
                    gitflow, ci/cd, docker, typescript, next.js (react), express.js, mongodb, postgres, kafka, aws
                </p>

                {/* transaction form and log stream */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* form */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <div>
                            <label htmlFor="fromAccount" className="block text-sm mb-1">from</label>
                            <input
                                id="fromAccount"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={fromAccount}
                                onChange={(e) => setFromAccount(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="toAccount" className="block text-sm mb-1">to</label>
                            <input
                                id="toAccount"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={toAccount}
                                onChange={(e) => setToAccount(e.target.value)}
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
                    </div>

                    {/* log stream text area */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <label htmlFor="logstream" className="block text-sm mb-1">integration log stream</label>
                        <textarea
                            id="logstream"
                            placeholder=""
                            className="w-full p-2 border rounded font-mono text-sm flex-1 bg-gray-50 dark:bg-gray-800"
                        />
                    </div>
                </div>

                {/* submit button */}
                <div className="flex justify-center mt-2">
                    <button
                        type="submit"
                        className="p-2 border rounded font-mono text-xs bg-blue-900 hover:bg-blue-700 text-white"
                        onClick={handleSubmit}
                    >
                        submit
                    </button>
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