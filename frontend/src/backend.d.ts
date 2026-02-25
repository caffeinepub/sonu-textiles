import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MehndiDesign {
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export interface ClothingItem {
    nameHindi: string;
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getBusinessInfo(): Promise<{
        phone: string;
        location: string;
    }>;
    getClothingItemsByPrice(): Promise<Array<ClothingItem>>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getMehndiDesignsByPrice(): Promise<Array<MehndiDesign>>;
    submitContactMessage(name: string, phone: string, email: string, message: string): Promise<void>;
}
