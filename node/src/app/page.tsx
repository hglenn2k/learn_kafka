"use client";

import Image from "next/image";
import { useState } from "react";
import { bankApi } from "@/service/bankApiService";

export default function Home() {
    // account form state
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [balance, setBalance] = useState("");
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    // transaction form state
    const [fromAccountName, setFromAccountName] = useState("");
    const [toAccountName, setToAccountName] = useState("");
    const [amount, setAmount] = useState("");
    const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);

    // log state for displaying messages (populated by kafka)
    const [logs/*, setLogs*/] = useState<string[]>([]);
    const [fraudLogs/*, setFraudLogs*/] = useState<string[]>([]);

    // helper functions to add log messages (will be called by kafka integration)
    /*
    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };
    const addFraudLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setFraudLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };
    */

    // TODO: Expose these functions to Kafka integration
    // You can access them via useImperativeHandle, global window object, or context

    const handleAccountSubmit = async () => {
        if (!name.trim() || !country.trim()) {
            return;
        }

        setIsCreatingAccount(true);

        try {
            await bankApi.createAccount({
                name: name.trim(),
                country: country.trim(),
                balance: Number(balance) || 0
            });

            setName("");
            setCountry("");
            setBalance("");
        } catch (error) {
            console.error('Failed to create account:', error);
        } finally {
            setIsCreatingAccount(false);
        }
    };

    const handleTransactionSubmit = async () => {
        if (!fromAccountName.trim() || !toAccountName.trim()) {
            return;
        }

        setIsCreatingTransaction(true);

        try {
            await bankApi.createTransaction({
                fromAccountName: fromAccountName.trim(),
                toAccountName: toAccountName.trim(),
                amount: Number(amount) || 0
            });

            setFromAccountName("");
            setToAccountName("");
            setAmount("");
        } catch (error) {
            console.error('Failed to transact:', error);
        } finally {
            setIsCreatingTransaction(false);
        }
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
                                disabled={isCreatingAccount}
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
                                disabled={isCreatingAccount}
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
                                disabled={isCreatingAccount}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 border rounded font-mono text-xs bg-blue-900 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleAccountSubmit}
                                disabled={isCreatingAccount}
                            >
                                {isCreatingAccount ? "creating..." : "create account"}
                            </button>
                        </div>
                    </div>

                    {/* transaction form */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-center">make transaction</h2>

                        <div>
                            <label htmlFor="fromAccountName" className="block text-sm mb-1">from (account name)</label>
                            <input
                                id="fromAccountName"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={fromAccountName}
                                onChange={(e) => setFromAccountName(e.target.value)}
                                disabled={isCreatingTransaction}
                            />
                        </div>

                        <div>
                            <label htmlFor="toAccountName" className="block text-sm mb-1">to (account name)</label>
                            <input
                                id="toAccountName"
                                type="text"
                                placeholder=""
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                value={toAccountName}
                                onChange={(e) => setToAccountName(e.target.value)}
                                disabled={isCreatingTransaction}
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
                                disabled={isCreatingTransaction}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 border rounded font-mono text-xs bg-blue-900 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleTransactionSubmit}
                                disabled={isCreatingTransaction}
                            >
                                {isCreatingTransaction ? "processing..." : "submit transaction"}
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
                            value={logs.join('\n')}
                            className="w-full p-2 border rounded font-mono text-sm h-48 bg-gray-50 dark:bg-gray-800"
                        />
                    </div>

                    {/* fraud check log stream */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h2 className="text-lg font-semibold text-center mb-1">fraud check log stream</h2>
                        <textarea
                            id="fraudlogstream"
                            placeholder=""
                            readOnly
                            value={fraudLogs.join('\n')}
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