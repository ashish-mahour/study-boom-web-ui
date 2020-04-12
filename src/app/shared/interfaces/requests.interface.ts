import { Users } from './users.interfaces';

export interface Requests {
    id: number;
    requestText: string;
    processed: boolean;
    status: "NOT_STARTED" | "ACCEPTED" | "NOT_ACCEPTED";
    lastModified: Date;
    dateCreated: Date;
    userIdToRequests: Users
}

export interface RequestDetails {
    userId: number;
	requestId: number;
	requestText: string;
	processed: boolean;
	status: "NOT_STARTED" | "ACCEPTED" | "NOT_ACCEPTED";
}