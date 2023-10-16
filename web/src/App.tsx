import { FC, useState } from "react";
import { Greeter } from "../../api/hello_world/v1/greeter_rsm_react";
import css from "./App.module.css";
// We can choose any id we want because the state will be constructed when we
// make the first .writer call.
const GREETER_ID = "edgar";
// const GREETER_ID = 'test1'

const Greeting: FC<{ text: string }> = ({ text }) => {
  return <div className={css.greeting}>{text}</div>;
};

const App = () => {
  // State of the input component.
  const [greetingMessage, setGreetingMessage] = useState("Hello, Resemble!");
  const [greetInt, setGreetInt] = useState(0);
  const [checked, setChecked] = useState(false);

  const { useGreetings } = Greeter({ id: GREETER_ID });
  const {
    response,
    mutations: { Greet },
  } = useGreetings();

  console.log('response: ', response)

  const handleClick = () => {
    Greet({
      greeting: greetingMessage,
      greetInt: greetInt,
      isChecked: checked
    }).then(() => setGreetingMessage(""));
  };

  const handleGreetIntChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setGreetInt(newValue);
  };

  const handleCheckbox = () => {
    setChecked(!checked)
  }

  return (
    <div className={css.greetings}>
      {response !== undefined &&
        response.greetings.length > 0 &&
        response.greetings.map((greeting: string) => (
          <Greeting text={greeting} key={greeting} />
        ))}
      <input
        type="text"
        className={css.textInput}
        onChange={(e) => setGreetingMessage(e.target.value)}
        value={greetingMessage}
      />
      <button className={css.button} onClick={handleClick}>
        Greet
      </button>
      <input
      type='number'
      min='1'
      max='9'
      onChange={handleGreetIntChange}
      className={css.textInput}
      value={greetInt}
      ></input>
      <input
        type='checkbox'
        onChange={handleCheckbox}
        checked={checked}
      />
    </div>
  );
};

export default App;
