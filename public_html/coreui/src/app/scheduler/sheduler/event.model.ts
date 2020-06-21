export class EventModel{
    constructor(
        private eventTitle : String,
        private startTime : String,
        private endTime : String,
        private client : String,
        private candidate : String,
        private comment : String,
        private id ?: String,
    ) {

    };
} 