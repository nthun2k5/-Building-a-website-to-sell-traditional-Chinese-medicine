export class User {
    id: number;
    email: string;
    password?: string;
    fullName: string | null;
    phone: string | null;
    address: string | null;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    // Tiện ích làm sạch dữ liệu, loại bỏ trường mật khẩu nhạy cảm
    static sanitize(user: any): Omit<User, 'password'> | null {
        if (!user) return null;
        const { password, isActive, ...rest } = user;
        return {
            ...rest,
            isActive: isActive === true || isActive === 1 || isActive === '1',
        };
    }
}
