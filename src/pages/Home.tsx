import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find((task) => task.title === newTaskTitle);
    if (taskExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return false;
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks([...newTaskList]);
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter((task) => task.id !== id);
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => false,
        },
        {
          text: "Sim",
          onPress: () => setTasks(newTaskList),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newTaskList = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: taskNewTitle };
      }
      return task;
    });
    setTasks([...newTaskList]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
