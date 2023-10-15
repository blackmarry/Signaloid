import type { Task, TaskOption } from './Task'

export const startingTime = () => 1 + roundValue(Math.random())

export const runningTime = (option: TaskOption) => {
	const r = roundValue(Math.random())
	switch (option) {
		case 'VM-S': return 1 + r
		case 'VM-M': return 2 + r
		case 'VM-L': return 3 + r
	}
}

const getPercentage = (maxValue: number, actualValue: number) => {
	return Math.round((actualValue / maxValue) * 100)
}

export const getProgress = (task: Task) => {
	switch (task.phase) {
		case 'Starting': return getPercentage(task.metadata.startingDuration, task.metadata.time)
		case 'Running': return getPercentage(task.metadata.runningDuration, task.metadata.time)
		default: return 100
	}
}

/** https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
export const roundValue = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100
