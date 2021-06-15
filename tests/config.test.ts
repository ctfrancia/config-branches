import { config } from '../src/index'
import { init, readPath, getBranch } from '../internals/config'
import { resolve } from 'path'
import dotenv from 'dotenv'

describe('Init Function', () => {
  it('should throw an error if branch-config.json cannot be located', async () => {
     const p = resolve(__dirname, '../tests/foo.json')

     await expect(readPath(p))
     .rejects
     .toThrow('was unable to locate branch-config.json file please make sure it is in the root folder')
  })

  it('should find the branch-config.json file', async () => {
     const p = resolve(__dirname, '../tests/branch-config.json')
     console.log('path', p)
     try {
        await readPath(p)
     } catch(e) {
        expect(e).toBe(undefined)
     }
  })

  it('should return an error if there is no BRANCH variable defined', () => {
    expect(() => {
       getBranch()
    }).toThrow('no BRANCH environment defined')
  })

  it('should load and return the BRANCH environment variable', () => {
     dotenv.config()
     const b = getBranch()
     expect(b).toBe('test')
  })
})
