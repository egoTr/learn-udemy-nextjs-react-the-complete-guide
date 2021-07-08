import { useState } from "react";

function AppState(initial) {
    const [data, setData] = useState(initial);

    const deleteTask = (taskId) => {
        const newTasks = data.tasks.filter(task => task.id !== taskId);

        setData({ ...data, tasks: newTasks });
    }

    return [data, deleteTask];
}

export default AppState;