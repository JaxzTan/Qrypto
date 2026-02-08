"use client";

import { useState } from "react";

const PaymentPage = () => {
    const [amount, setAmount] = useState("");
    const [response, setResponse] = useState(null);

    const handlePay = async () => {
        if (!amount) {
            alert("Please enter an amount");
            return;
        }

        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: parseFloat(amount) }),
            });

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setResponse({ success: false, message: "server error" });
        }
    };

    return (
        <div>
            <h1>Fake Payment(to change to merchant name)</h1>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePay}>Pay</button>

            {response && (
                <div>
                    <h2>Hardcoded response:</h2>
                    <ul>
                        {Object.entries(response).map(([key, value]) => (
                            <li key={key}>
                                {key}: {value.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PaymentPage;