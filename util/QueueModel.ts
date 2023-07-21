class QueueModel {
	constructor() {
		this.qevents: QueueEvent[] = [];
		this.qevents.push({
			timestamp: 0,
			type: 'arrival',
		})
	}

	async generateEvents(upTo: number) {
		while (qev[0].timestamp < upTo) {
			yield qev
		}
	}
}
