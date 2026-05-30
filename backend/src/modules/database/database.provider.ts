import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sql from 'mssql';

export const MSSQL_CONNECTION = 'MSSQL_CONNECTION';

function createMssqlConfig(configService: ConfigService): sql.config {
    return {
        user: configService.getOrThrow<string>('server.database.user'),
        password: configService.getOrThrow<string>('server.database.password'),
        server: configService.getOrThrow<string>('server.database.host'),
        database: configService.getOrThrow<string>('server.database.name'),
        port: configService.getOrThrow<number>('server.database.port'),
        options: {
            encrypt: false,
            trustServerCertificate: true,
        },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
    };
}

export const DatabaseProvider: Provider = {
    provide: MSSQL_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        return new sql.ConnectionPool(createMssqlConfig(configService));
    },
};