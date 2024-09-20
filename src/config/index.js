import { variable } from "./environments";

const ENV = process.env.NODE_ENV || "development";
const vercel_env = process.env.REACT_APP_VERCEL_ENV; //Prod and stage on test jenkins and vercel only for dev envs
const NEXT_ENV = "development";
const envConfig = variable[NEXT_ENV];
export const config = Object.assign({ env: NEXT_ENV }, envConfig);
