import { EventStatus } from './event.status';
import { User } from './user';
import { isString } from 'util';

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
        if (obj['startDate'] && typeof obj['startDate'] === "string") {
            this.startDate = new Date(Date.parse(obj['startDate']));
        }
        if (obj['endDate'] && typeof obj['endDate'] === "string") {
            this.endDate = new Date(Date.parse(obj['endDate']));
        }
    }
}
