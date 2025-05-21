import Image from "next/image";
import { useRef } from "react";

export default function Home() {
    const fromAccountRef = useRef<HTMLInputElement>(null);
    const toAccountRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full md:max-w-lg lg:max-w-xl flex flex-col gap-8">
                {/* Title and Subtitle */}
                <h1 className="text-3xl font-bold text-center">"honor system" bank</h1>
                <p className="text-sm text-center">
                    gitflow, docker, typescript, next.js (react), express.js, mongodb, postgres, kafka, aws
                </p>

                {/* Transaction Form and Log Stream */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Form Section */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <div>
                            <label htmlFor="fromAccount" className="block text-sm mb-1">from:</label>
                            <input
                                id="fromAccount"
                                type="text"
                                placeholder="..."
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                ref={fromAccountRef}
                            />
                        </div>

                        <div>
                            <label htmlFor="toAccount" className="block text-sm mb-1">to:</label>
                            <input
                                id="toAccount"
                                type="text"
                                placeholder="..."
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                ref={toAccountRef}
                            />
                        </div>

                        <div>
                            <label htmlFor="amount" className="block text-sm mb-1">amount</label>
                            <input
                                id="amount"
                                type="number"
                                placeholder="..."
                                className="w-full p-2 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800"
                                ref={amountRef}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={() => {
                                const from = fromAccountRef.current?.value || "";
                                const to = toAccountRef.current?.value || "";
                                const amount = amountRef.current?.value || "";
                                console.log({ from, to, amount });
                            }}
                            className="mt-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Log Stream Section */}
                    <div className="w-full md:w-1/2">
                        <label htmlFor="logstream" className="block text-sm mb-1">integration log stream</label>
                        <textarea
                            id="logstream"
                            placeholder=""
                            className="w-full p-2 border rounded font-mono text-sm h-full bg-gray-50 dark:bg-gray-800"
                        />
                    </div>
                </div>

                {/* Footer Link */}
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
