import { getProgress, runningTime, startingTime } from "./utils";
import type { Task } from "./Task";


export const runTask = (task: Task) => {
	return new Promise<string>((resolve) => {
		task.metadata.startingDuration = startingTime()

		// 1. Starting phase
		const startingInterval = setInterval(() => {
			task.metadata.time += 0.05
			task.metadata.progress = getProgress(task)

			if (task.metadata.time >= task.metadata.startingDuration) {
				clearInterval(startingInterval)

				task.metadata.time = 0
				task.metadata.runningDuration = runningTime(task.option)
				task.phase = 'Running'

				// 2. Running phase
				const runningInterval = setInterval(() => {
					task.metadata.time += 0.05
					task.metadata.progress = getProgress(task)

					if (task.metadata.time >= task.metadata.runningDuration) {
						clearInterval(runningInterval)

						// 3. Completed phase
						task.metadata.time = 0
						task.metadata.progress = 100
						task.phase = 'Completed'
						resolve(task.name)
					}
				}, 50)
			}
		}, 50)
	})
}
