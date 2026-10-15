import {config} from "dotenv";
import {resolve} from "path";

const NODE_ENV = process.env.NODE_ENV;

const envpath = {
    development: ".env.development",
    production: ".env.production",
}

config({path: resolve(`./config/${envpath[NODE_ENV]}`)});

export const port = process.env.PORT || 7000;
export const DB_URI = process.env.DB_URI;
export const DB_NAME = process.env.DB_NAME;