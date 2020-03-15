import { Users } from './users.interfaces';

export interface Requests {
    id: number;
    requestText: string;
    processed: string;
    status: string;
    lastModified: Date;
    dateCreated: Date;
    userIdToRequests: Users
}

export interface RequestDetails {
    userId: number;
	requestId: number;
	requestText: number;
	processed: number;
	status: number;
}