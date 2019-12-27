export class ApplyRequest {
    userLogin: string;
    eventId: string;

    constructor (userLogin: string, eventId: string) {
        this.userLogin = userLogin;
        this.eventId = eventId;
    }
}
