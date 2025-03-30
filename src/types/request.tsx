export interface Request {
    _id: string;
    location: {
        lat?: number;
        long?: number;
    };
    status: string;
    group: string;
    urgency: string;
    reachedUsers: any[]; // You may want to define a specific type for reachedUsers if available
    createdAt: string;
    updatedAt?: string;
}
