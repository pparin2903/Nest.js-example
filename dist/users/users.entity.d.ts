export declare class User {
    id: number;
    user_name: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    user_status: boolean;
    user_state: string;
    update_by: string;
    create_date: Date;
    update_date: Date;
}
export interface UserState {
    id: number;
    user_state: string;
}
