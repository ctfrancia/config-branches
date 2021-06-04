import { Config } from '../internals/config'

export const config = new Config(process.env.BRANCH)
/*
export function loadConfig(): Config {
  return new Config(process.env.BRANCH)
}
*/
