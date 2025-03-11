export type Transaction = {
	amount: number
	currency: 'ICS' | 'GCS'
	date: string
	id: string
	status: 'inProgress' | 'blocked' | 'completed'
	user: string
}

export type Planet = {
	climate: string
	created: string
	diameter: string
	edited: string
	films: string[]
	gravity: string
	id: string
	name: string
	orbital_period: string
	population: string
	residents: string[]
	rotation_period: string
	surface_water: string
	terrain: string
}
