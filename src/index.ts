import { init } from '../internals/config'

export async function config(): Promise<void> {
  try {
    await init()
  } catch(e) {
    throw new Error(e.message)
  }
}
