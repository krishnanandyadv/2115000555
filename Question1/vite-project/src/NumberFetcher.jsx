import React, { useState } from 'react';
import axios from 'axios';

const NumberFetcher = () => {
    const [type, setType] = useState('e');
    const [response, setResponse] = useState(null);
    const [numbersWindow, setNumbersWindow] = useState([]);
    const windowSize = 10;
    const BEARER_TOKEN = 'Bearer';  

    const fetchNumbers = async (type) => {
        const urlMap = {
            'p': 'https://20.244.56.144/test/primes',
            'f': 'https://20.244.56.144/test/fibonacci',
            'e': 'https://20.244.56.144/test/even',
            'r': 'https://20.244.56.144/test/random'
        };

        try {
            const response = await axios.get(urlMap[type], {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`
                },
                timeout: 500
            });
            console.log('API Response:', response);
            return response.data.numbers;
        } catch (error) {
            console.error('Error fetching numbers:', error);
            return [];
        }
    };

    const calculateAverage = (numbers) => {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return sum / numbers.length;
    };

    const handleFetch = async () => {
        const prevState = [...numbersWindow];
        const newNumbers = await fetchNumbers(type);

        newNumbers.forEach(number => {
            if (!numbersWindow.includes(number)) {
                if (numbersWindow.length >= windowSize) {
                    numbersWindow.shift();
                }
                numbersWindow.push(number);
            }
        });

        const average = calculateAverage(numbersWindow);

        setResponse({
            windowPrevState: prevState,
            windowCurrState: [...numbersWindow],
            numbers: newNumbers,
            avg: average.toFixed(2)
        });
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="p">Prime</option>
                <option value="f">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={handleFetch}>Fetch Numbers</button>
            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default NumberFetcher;
