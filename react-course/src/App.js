// styles, components
import './app.css';
import Todo from './components/todo';

// hooks
import appState from './hooks/states';

function App() {
  const dataSample = [
    { id: 3, task: 'Buy masks', done: true },
    { id: 1, task: 'Learn React', done: false },
    { id: 2, task: 'Bike washing', done: false },
  ];

  const [data, deleteTask] = 
    appState({
      tasks: dataSample
    });

  return (
    <>
      <h1>TODOs</h1>

      <div className="todo-container">
        { data.tasks.map( (item, i) => 
          <Todo
            key={item.id}
            id={item.id}
            task={item.task}
            done={item.done}
            deleteBehavior={deleteTask}
          />
        )}
      </div>
    </>
  )  
}

export default App;
