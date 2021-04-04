let localStorageCache = {}

export const clearLocalStorageCache = () => {
	localStorageCache = {}
}

export const saveLocalStorageToCache = () => {
	Object.keys(localStorage).forEach((key) => {
		localStorageCache[key] = localStorage[key]
	})
}

export const restoreLocalStorageCache = () => {
	Object.keys(localStorageCache).forEach((key) => {
		localStorage.setItem(key, localStorageCache[key])
	})
}

describe('Testing TODO list', () => {
	before(() => {
		clearLocalStorageCache()
	})

	beforeEach(() => {
		restoreLocalStorageCache()
	})

	afterEach(() => {
		saveLocalStorageToCache()
	})

	it('Visit TODO list', () => {
		cy.visit('https://todomvc.com/examples/vanillajs/')
	})

	it('Initialization was correctly', () => {
		cy.get('title').contains('VanillaJS • TodoMVC')
		cy.get('.todoapp').should('exist')
		cy.get('.new-todo').should('exist')
	})

	it('Can add some tasks', () => {
		cy.get('.new-todo').type('task 1').type('{enter}')
		cy.get('.new-todo').type('task 2').type('{enter}')
		cy.get('.new-todo').type('task 3').type('{enter}')

		cy.get('.todo-list').children().should('have.length', 3)
	})

	it('The task can complete', () => {
		cy.get('.todo-list').children().eq(0).find('.toggle').click()

		cy.get('.todo-list').children().eq(0).should('have.class', 'completed')
	})

	it('The task can remove', () => {
		cy.get('.todo-list').children().eq(1).find('.destroy').click({ force: true })

		cy.get('.todo-list').children().should('have.length', 2)
	})

	it('Check finish state', () => {
		cy.get('.todo-list > .completed').children().should('have.length', 1)
		cy.get('.todo-list > :not(.completed)').children().should('have.length', 1)
	})
})