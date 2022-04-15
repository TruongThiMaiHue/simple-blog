import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '16070702',
    database: 'simple-blog',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    // type: 'mysql',
    // host: 'localhost',
    // port: 3360,
    // username: 'huetruong',
    // password: '16070702',
    // database: 'simple-blog',
    // entities: [__dirname + '/../**/*.entity.js'],
    // synchronize: true,
}