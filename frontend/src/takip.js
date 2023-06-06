import React from react
import ReactDOM from react-dom

const App = () => {
  return (
    <div >
      <button onClick={() => alert('button click catched')}>Click me</button>
    </div>
  );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root );