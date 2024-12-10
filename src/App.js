import React, { useState, useCallback } from "react";

const Task = React.memo(
  ({ task, onComplete, onDelete, onMoveToTodo, completed }) => {
    console.log("Rendered:", task); // Debugging to verify re-renders
    return (
      <div style={styles.task}>
        <span>{task}</span>
        {!completed ? (
          <button onClick={onComplete} style={styles.button}>
            შესრულება
          </button>
        ) : (
          <>
            <button onClick={onMoveToTodo} style={styles.button}>
              უკან დაბრუნება
            </button>
            <button onClick={onDelete} style={styles.deleteButton}>
              წაშლა
            </button>
          </>
        )}
      </div>
    );
  }
);

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTodoList([...todoList, task]);
      setTask("");
    }
  };

  const completeTask = useCallback(
    (index) => {
      const completedTask = todoList.splice(index, 1)[0];
      setTodoList([...todoList]);
      setCompletedList([...completedList, completedTask]);
    },
    [todoList, completedList]
  );

  const deleteTask = useCallback(
    (index) => {
      const updatedList = completedList.filter((_, i) => i !== index);
      setCompletedList(updatedList);
    },
    [completedList]
  );

  const moveToTodo = useCallback(
    (index) => {
      const taskToMove = completedList.splice(index, 1)[0];
      setCompletedList([...completedList]);
      setTodoList([...todoList, taskToMove]);
    },
    [completedList, todoList]
  );

  return (
    <div style={styles.container}>
      <h1>ToDo სია</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="შემოიყვანე დავალება"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          დამატება
        </button>
      </div>
      <div style={styles.listContainer}>
        <div style={styles.column}>
          <h2>შესასრულებელი</h2>
          {todoList.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => completeTask(index)}
              completed={false}
            />
          ))}
        </div>
        <div style={styles.column}>
          <h2>შესრულებული</h2>
          {completedList.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onMoveToTodo={() => moveToTodo(index)}
              completed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
  input: { padding: "10px", marginRight: "10px" },
  button: { padding: "10px", margin: "5px", cursor: "pointer" },
  deleteButton: {
    padding: "10px",
    margin: "5px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
  },
  listContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  column: { width: "45%", textAlign: "left" },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
};

export default App;
