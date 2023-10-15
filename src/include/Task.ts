
export type TaskOption = 'VM-S' | 'VM-M' | 'VM-L'

export const ComputeOptions: TaskOption[] = ['VM-S', 'VM-M', 'VM-L']

const Phase = Object.freeze({
	Starting: 'Starting',
	Running: 'Running',
	Completed: 'Completed'
})

type Phase = keyof typeof Phase

export type Task = {
	name: string
	option: TaskOption
	phase: Phase
	metadata: {
		time: number
		progress: number
		startingDuration: number
		runningDuration: number
	}
}

export const Task = (name: string, option: TaskOption): Task => ({ 
	name, option, phase: 'Starting',
	metadata: { time: 0, progress: 0, startingDuration: 0, runningDuration: 0 },
})
