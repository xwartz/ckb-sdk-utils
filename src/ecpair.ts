import { ec as EC } from 'elliptic'

import { hexToBytes } from '.'
import { HexStringShouldStartWith0x, ArgumentRequired } from './exceptions'

const ec = new EC('secp256k1')

export interface Options {
  compressed?: boolean
}

class ECPair {
  protected key: EC.KeyPair

  public compressed: boolean = false

  constructor(
    sk: Uint8Array | string,
    { compressed = true }: Options = {
      compressed: true,
    }
  ) {
    if (sk === undefined) throw new ArgumentRequired('Private key')
    if (typeof sk === 'string' && !sk.startsWith('0x')) {
      throw new HexStringShouldStartWith0x(sk)
    }
    this.key = ec.keyFromPrivate(typeof sk === 'string' ? sk.replace(/^0x/, '') : sk)
    this.compressed = compressed
  }

  get privateKey() {
    return `0x${this.key.getPrivate('hex')}`
  }

  get publicKey() {
    return `0x${this.key.getPublic(this.compressed, 'hex') as string}`
  }

  public getPrivateKey = (enc: 'hex' = 'hex') => {
    if (enc === 'hex') {
      return this.privateKey
    }
    return this.key.getPrivate(enc)
  }

  public getPublicKey = (enc: 'hex' | 'array') => {
    if (enc === 'hex') {
      return this.publicKey
    }
    return this.key.getPublic(this.compressed, enc)
  }

  public sign = (message: string | Uint8Array): string => {
    const msg = typeof message === 'string' ? hexToBytes(message) : message
    return `0x${this.key
      .sign(msg, {
        canonical: true,
      })
      .toDER('hex')}`
  }

  public verify = (message: string | Buffer, sig: string | Buffer) => {
    const msg = typeof message === 'string' ? hexToBytes(message) : message
    const signature = typeof sig === 'string' ? hexToBytes(sig) : sig
    return this.key.verify(msg, signature as any)
  }

  public signRecoverable = (message: string | Uint8Array): string => {
    const msg = typeof message === 'string' ? hexToBytes(message) : message
    const { r, s, recoveryParam } = this.key.sign(msg, {
      canonical: true,
    })
    if (recoveryParam === null) throw new Error('Fail to sign the message')
    const fmtR = r.toString(16).padStart(64, '0')
    const fmtS = s.toString(16).padStart(64, '0')
    return `0x${fmtR}${fmtS}0${recoveryParam}`
  }
}

export default ECPair
