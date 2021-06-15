import { readFile } from 'fs/promises'
import { resolve } from 'path'

let config = {} 

export function healthCheck(): void {
}

export async function init(): Promise<void> {
  const p = getPath()
  try {
    await readPath(p)
    const branch = getBranch()
  } catch(e) {
    throw new Error(e)
  }

}

export function getPath() {
  return resolve(__dirname, 'branch-config.json')
}

export async function readPath(p: string): Promise<any | void> {
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

export function getBranch(): string | void {
  if (process.env.BRANCH === undefined) {
    throw new Error('no BRANCH environment defined')
  }

  return process.env.BRANCH
}
