/*
export function loadConfigFromBranch(branch: string): any { // TODO return value will be the shape of the config file
  return 
}
*/

export class Config {
  private config = {}

  public constructor(branch: string) {}

  private get getConfigFile(): any {
    return this.config
  }

  private set setConfigfile(config: any) {
    this.config = config
  }

  public loadConfigFromBranch(): void {
    // read object based on BRANCH.config[.js | .ts]
    this.setConfigfile({
      db : {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password1'
      },
      redis: {
        host: 'localhost',
        port: 6397
      }
    })
  }

  public loadConfigEntity(key: string): any {
    return this.config[key]
  }
}
