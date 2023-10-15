<template>
  <div
  v-if="runningTasks.length"
  class="relative overflow-x-auto shadow-md sm:rounded-lg m-2"
  >
    <h6 class="text-lg font-bold dark:text-white mb-2">Running Tasks</h6>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="header in runningHeaders"
            :key="header"
            scope="col"
            class="px-6 py-3"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in runningTasks"
          :key="task.name"
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
        >
          <td
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ task.name }}
          </td>
          <td class="px-6 py-4">{{ task.option }}</td>
          <td class="px-6 py-4">{{ task.phase }}</td>
          <td class="px-6 py-4">
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                :class="{
                  'text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full': true,
                  'bg-yellow-600': task.phase === 'Starting',
                  'bg-green-600': task.phase === 'Running',
                }"
                :style="`width: ${task.metadata.progress}%`"
              >
                {{ task.metadata.progress }}%
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--  -->

  <div
    v-if="completedTasks.length"
    class="relative overflow-x-auto shadow-md sm:rounded-lg m-2"
  >
    <h6 class="text-lg font-bold dark:text-white mb-2">Completed Tasks</h6>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="header in completedHeaders"
            :key="header"
            scope="col"
            class="px-6 py-3"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in completedTasks"
          :key="task.name"
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
        >
        <td
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ task.name }}
        </td>
        <td class="px-6 py-4">
          {{ task.option }}
        </td>
        <td class="px-6 py-4">
          {{ task.metadata.startingDuration.toFixed(2) }}
        </td>
        <td class="px-6 py-4">
          {{ task.metadata.runningDuration.toFixed(2) }}
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from "@/composables/useTasks";

const { runningTasks, completedTasks } = useTasks();
const runningHeaders = ["Task Name", "VM Option", "Phase", "Progress"];
const completedHeaders = [
  "Task Name",
  "VM Option",
  "Starting Duration",
  "Running Duration",
];
</script>
