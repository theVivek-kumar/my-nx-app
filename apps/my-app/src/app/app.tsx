
import NxWelcome from './nx-welcome';
import { LibOne } from '@my-nx-app/lib-one';
// import { LibTwo } from '@my-nx-app/lib-two';
import MyButton from './button';
import useLocalStorage from './useLocalStorage';

export function App() {
 
  const [count, setCount, clearCount] = useLocalStorage<number>("counter", 0);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Counter: {count}</h1>
        <MyButton label="increase counter" onClick={() => setCount(count + 1)} />
        <MyButton label="decrease counter"  onClick={() => setCount(count - 1)} />
        <MyButton label="reset-counter"  variant="dashed" onClick={clearCount}Reset-value />
        <MyButton label="Danger" onClick={() => alert("Danger! Button pressed")} variant="default" />
        <MyButton label="Disabled" onClick={() => alert("Can't Click coz button is disabled")} disabled />
      </div>
    </div>
  );
}

export default App;
