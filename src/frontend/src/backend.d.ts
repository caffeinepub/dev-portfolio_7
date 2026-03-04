import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    subject: string;
    name: string;
    isRead: boolean;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMessage(id: bigint): Promise<void>;
    getAllMessages(): Promise<Array<ContactMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTotalMessageCount(): Promise<bigint>;
    getUnreadCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markMessageAsRead(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, subject: string, message: string): Promise<bigint>;
}
