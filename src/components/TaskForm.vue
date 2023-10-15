<template>
  <div class="flex">
    <div class="relative m-2">
      <input
        v-model="taskName"
        type="search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Task Name"
        required
      />
    </div>

    <select
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="taskOption"
    >
      <option v-for="option in ComputeOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <button
      @click="handleTask()"
      :disabled="!taskName"
      type="button"
      class="m-2 px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        class="w-3.5 h-3.5 mr-2 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>

      Start new task
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ComputeOptions, Task, type TaskOption } from "@/include/Task";
import { useTasks } from "@/composables/useTasks";
import { runTask } from "@/include/taskRunner";

const taskName = ref("");
const taskOption = ref<TaskOption>("VM-S");
const { runningTasks, completedTasks } = useTasks();

const handleTask = async () => {
  const newTask = reactive(Task(taskName.value, taskOption.value));

  runningTasks.value.push(newTask);
  taskName.value = "";
  taskOption.value = "VM-S";

  const finishedTaskName = await runTask(newTask);

  const idx = runningTasks.value.findIndex(
    (item) => item.name === finishedTaskName
  );
  if (idx !== -1) {
    const [finishedTask] = runningTasks.value.splice(idx, 1);
    completedTasks.value.push(finishedTask);
  }
};
</script>

<style scoped lang="scss"></style>
