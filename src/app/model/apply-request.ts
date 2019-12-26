export class ApplyRequest {
    userId: number;
    eventId: number;

    constructor (userId: number, eventId: number) {
        this.userId = userId;
        this.eventId = eventId;
    }
}
