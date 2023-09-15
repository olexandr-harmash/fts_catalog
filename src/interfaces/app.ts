export interface App {
    Init (...args: any[]): Promise<void>;
}