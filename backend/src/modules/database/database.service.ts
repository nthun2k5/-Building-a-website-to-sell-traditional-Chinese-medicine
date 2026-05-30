import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import sql from 'mssql';
import { MSSQL_CONNECTION } from './database.provider';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    constructor(
        @Inject(MSSQL_CONNECTION)
        private readonly db: sql.ConnectionPool,
    ) {}

    private async ensureConnected() {
        if (!this.db.connected) {
            await this.db.connect();
        }
    }

    // Query có hỗ trợ tham số ngăn chặn SQL Injection
    async query<T = any>(query: string, params?: Record<string, any>) {
        await this.ensureConnected();
        const request = this.db.request();
        
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
        }
        
        const result = await request.query<T>(query);
        return result.recordset;
    }

    // Thực thi các câu lệnh DDL khởi tạo bảng/schema
    async runSchema(schemaSql: string) {
        await this.ensureConnected();
        await this.db.request().query(schemaSql);
    }

    // Health check
    async ping() {
        await this.ensureConnected();
        await this.db.request().query('SELECT 1');
    }

    async onApplicationShutdown() {
        await this.db.close();
    }
}
