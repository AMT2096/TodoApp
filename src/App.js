import './App.css';
import Todo from './Todo'
function App() {
  return (
    <>
      <section className="container">
        <div className="extHeading">Todo App</div>
        <div className="App">
          <Todo />
        </div>
        <div className="extVersion">Version 1.05</div>
      </section>
    </>
  );
}

export default App;
