describe('Testing TODO list', () => {
	it('Visit TODO list', () => {
		cy.visit('https://todomvc.com/examples/vanillajs/')
	})

	it('Initialization was correctly', () => {
		cy.get('title').contains('VanillaJS • TodoMVC')
		cy.get('.todoapp').should('exist')
		cy.get('.new-todo').should('exist')
	})

	describe('Add a task', () => {
		it('A task can add', () => {
			cy.get('.new-todo').type('Task 1{newTodo}', { release: true })
			cy.get('.todoapp').click()
		})

	})
})