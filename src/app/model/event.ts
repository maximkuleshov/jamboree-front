import { EventStatus } from './event.status';
import { User } from './user';

export class EventCustom {
    id: string;
    startDate : Date;
    endDate: Date;
    title: string;
    description: string;
    status: EventStatus;
    participants: User[];

    constructor(obj?: any) {
        Object.assign(this, obj);
        if (obj['startDate']) {
            this.startDate = new Date(obj['startDate']);
        }
        if (obj['endDate']) {
            this.endDate = new Date(obj['endDate']);
        }
    }
}
