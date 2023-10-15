import { Task } from '@/include/Task'
import { ref, watch } from 'vue'

const KEY = 'SIGNALOID_LOCALSTORAGE'

const getStorage = (): Task[] => {
	const result = localStorage.getItem(KEY)
	return result ? JSON.parse(result) : []
}

const setStorage = (list: Task[]) => {
	localStorage.setItem(KEY, JSON.stringify(list))
}

const runningTasks = ref<Task[]>([])
const completedTasks = ref<Task[]>(getStorage())

watch(completedTasks, () => {
	setStorage(completedTasks.value)
}, { deep: true })

export const useTasks = () => ({ runningTasks, completedTasks })
