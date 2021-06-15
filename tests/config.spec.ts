// import { config } from '../src/index'
// import { init, readConfigBranchFile, getBranch, locateConfigBasedOnBranch } from '../internals/config'
import { Config } from '../internals/config'
const config = new Config(process.env.BRANCH)

import { resolve } from 'path'
import dotenv from 'dotenv'

describe('Load Config (Init)', () => {
  it('should throw an error if branch-config.json cannot be located', async () => {
     const p = resolve(__dirname, '../tests/foo.json')

     await expect(config.readConfigBranchFile(p))
     .rejects
     .toThrow('was unable to locate branch-config.json file please make sure it is in the root folder')
  })

  it('should find the branch-config.json file', async () => {
     const p = resolve(__dirname, '../tests/branch-config.json')
     try {
        await config.readConfigBranchFile(p)
     } catch(e) {
        expect(e).toBe(undefined)
     }
  })

  it('should return the contents of the branch-config.json', async () => {
     try {
        const p = resolve(__dirname, '../tests/branch-config.json')
        const contentJson = await config.readConfigBranchFile(p) as Buffer

        console.log('contents', JSON.parse(contentJson.toString()))
     } catch(e) {
        expect(e).toBe(undefined)
     }
  })

  it('should return an error if there is no BRANCH variable defined', () => {
    expect(() => {
       config.validateBranchAssignment()
    }).toThrow('no BRANCH environment defined')
  })

  it('should load and return the BRANCH environment variable', () => {
     dotenv.config()
     config.setBranch = process.env.BRANCH as string
     expect(config.getBranch).toBe('test')
  })

  it('should open the directory based on the location within the branch-config.json', async () => {
     const p = resolve(__dirname, '../tests/configs/')
     try {
        await config.locateConfigBasedOnBranch(p)
     } catch(e) {
     }
  })

  it('should set config', async () => {
     try {
        const p = resolve(__dirname, '../tests/configs/')
        const f: string = await config.locateConfigBasedOnBranch(p) as string

        config.applyConfig(f)

     } catch(e){}
  })
})
