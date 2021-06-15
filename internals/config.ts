import { readFile, opendir } from 'fs/promises'
import { resolve } from 'path'

export class Config {
  private branch: string | undefined = process.env.BRANCH
  private config = {}

  public constructor(branch: string | undefined) {
    this.branch = branch
  }

  public get getBranch(): string | undefined{
    return this.branch
  }

  public set setBranch(branch: string) {
    this.branch = branch
  }

  public get getConfig(): any {
    return this.config
  }

  public set setConfig(config: any) {
    this.config = config
  }

  public healthCheck(): void {
    try {
      this.validateBranchAssignment()
      this.validateConfig()
    } catch(e) {
    }
  }

  public getPath(): string {
    return resolve(__dirname, 'branch-config.json')
  }

  public validateBranchAssignment(): boolean | void {
    if (this.branch === undefined) {
      throw new Error('no BRANCH environment defined')
    }

    return true
  }
  
  public validateConfig(): boolean | void {
    const keys = Object.keys(this.config)
    if (keys.length === 0) {
      throw new Error('config has not been set')
    }

    return true
  }

  public async readConfigBranchFile(p: string): Promise<Buffer | void> {
    try {
      return await readFile(p)
    } catch(e) {
      switch(e.code) {
        case 'ENOENT':
          throw new Error('was unable to locate branch-config.json file please make sure it is in the root folder')

        default:
          throw new Error(e)
      }
    }
  }

  public async locateConfigBasedOnBranch(configPath: string) {
    try {
      const dir    = await opendir(configPath)
      const branch = this.getBranch

      for await (const dirent of dir) {
        let cName = dirent.name.split('.')[0]
        if (cName === branch) {
          const fullConfigPath = resolve(configPath, dirent.name)
          return fullConfigPath
        }
      }

      throw new Error('config file not found for the branch assigned in .env')
    } catch(e) {
      console.log('error in applyConfigBasedOnBranch', e)
    }
  }

  public async applyConfig(configToLoad: string) {
    try {
      // const conf = await readFile(configToLoad)
      const conf = await import(configToLoad)

      console.log('config', conf)

      this.setConfig = conf
      console.log('config', this.getConfig)
    } catch(e) {
      console.log('error in apply config', e)
    }
  }
}
