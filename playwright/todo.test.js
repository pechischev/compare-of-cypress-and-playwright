describe('Testing TODO list', () => {
	it('Visit TODO list', async () => {
		await page.goto('https://todomvc.com/examples/vanillajs/')
	})

	const addTaskField = () => page.$('.new-todo')

	it('Initialization was correctly', async () => {
		const title = await page.textContent('title')

		expect(title).toBe('VanillaJS • TodoMVC')
		expect(await page.$('.todoapp')).toBeTruthy()
		expect(await addTaskField()).toBeTruthy()
	})

	const getTasks = () => page.$$('.todo-list > li')

	async function expectTaskCount(expectedCount) {
		const items = await getTasks()

		expect(items).toHaveLength(expectedCount)
	}

	describe('Add a task', () => {
		async function createTask(title) {
			const field = await addTaskField()

			await field.fill(title)
			await field.press('Enter')
		}

		it('The task can add', async () => {
			await createTask('task 1')

			await expectTaskCount(1)
		})

		it('Can add some tasks', async () => {
			await createTask('task 2')
			await createTask('task 3')

			await expectTaskCount(3)
		})
	})

	it('The task can complete', async () => {
		const tasks = await getTasks()
		const checkbox = await tasks[0].$('.toggle')
		await checkbox.click()

		expect(await tasks[0].getAttribute('class')).toEqual('completed')
	})

	it('The task can remove', async () => {
		const tasks = await getTasks()
		const deleteButton = await tasks[0].$('.destroy')
		await deleteButton.click()

		await expectTaskCount(2)
	})

	it('Check finish state', async () => {
		const completedTask = page.$('.todo-list > .completed')
		const activeTask = page.$('.todo-list > not(.completed)')

		expect(completedTask).toBeTruthy()
		expect(activeTask).toBeTruthy()
	})
})