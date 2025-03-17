import React, { useState, useEffect } from "react";

const Counter: React.FC = () => {
  const LOCAL_STORAGE_KEY = "counterValue";

  // Load counter from local storage or default to 0
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCount ? parseInt(savedCount,) : 0;
  });

  // Update local storage whenever count changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
  }, [count]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
        <button onClick={() => setCount((prev) => prev - 1)} disabled={count <= 0}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;

