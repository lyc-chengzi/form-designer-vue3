export interface IConfig {
    // 监听端口
    port: string | number;
    // mongodb配置
    mongodb: {
        host: string;
        port: number;
        db: string;
    };
}
