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

	async function createTask(title) {
		const field = await addTaskField()

		await field.fill(title)
		await field.press('Enter')
	}

	it('Can add some tasks', async () => {
		await createTask('task 1')
		await createTask('task 2')
		await createTask('task 3')

		await expectTaskCount(3)
	})

	it('The task can complete', async () => {
		const tasks = await getTasks()
		const checkbox = await tasks[1].$('.toggle')
		await checkbox.click()

		expect(await tasks[1].getAttribute('class')).toEqual('completed')
	})

	it('The task can remove', async () => {
		const tasks = await getTasks()
		await tasks[0].hover()
		const deleteButton = await tasks[0].$('.destroy')
		await deleteButton.click()

		await expectTaskCount(2)
	})

	it('Check finish state', async () => {
		const completedTask = await page.$('.todo-list > .completed')
		const activeTask = await page.$('.todo-list > :not(.completed)')

		expect(completedTask).toBeTruthy()
		expect(activeTask).toBeTruthy()
	})
})