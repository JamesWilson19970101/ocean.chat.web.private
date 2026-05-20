import { Cmd, MAGIC_NUMBER } from './constants';

export interface MonkeyFrame {
  version: number;
  cmd: Cmd;
  flags: number;
  reqId: number; // 24-bit unsigned integer
  length: number;
  payload: Uint8Array;
}

export class FrameEncoder {
  /**
   * Encodes a MonkeyFrame into a Uint8Array suitable for WebSocket transmission.
   * Uses Big Endian (Network Byte Order) for all multi-byte integers.
   */
  static encode(frame: MonkeyFrame): Uint8Array {
    const payloadLen = frame.payload.length;
    // Header is strictly 12 bytes
    const buffer = new ArrayBuffer(12 + payloadLen);
    const view = new DataView(buffer);
    const u8 = new Uint8Array(buffer);

    view.setUint16(0, MAGIC_NUMBER, false);
    view.setUint8(2, frame.version);
    view.setUint8(3, frame.cmd);
    view.setUint8(4, frame.flags);

    // 24-bit ReqId (Big Endian)
    view.setUint8(5, (frame.reqId >> 16) & 0xff);
    view.setUint8(6, (frame.reqId >> 8) & 0xff);
    view.setUint8(7, frame.reqId & 0xff);

    // 32-bit Payload Length (Big Endian)
    view.setUint32(8, payloadLen, false);

    // Set Payload
    if (payloadLen > 0) {
      u8.set(frame.payload, 12);
    }

    return u8;
  }
}

export class FrameDecoder {
  /**
   * Decodes a WebSocket binary message into a MonkeyFrame.
   * Uses Big Endian (Network Byte Order) for all multi-byte integers.
   */
  static decode(buffer: ArrayBuffer | Uint8Array): MonkeyFrame {
    const u8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    const view = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

    if (view.byteLength < 12) {
      throw new Error(
        'Buffer too small for Monkey Protocol Header (min 12 bytes)',
      );
    }

    const magic = view.getUint16(0, false);
    if (magic !== MAGIC_NUMBER) {
      throw new Error(`Invalid Magic Number: 0x${magic.toString(16)}`);
    }

    const version = view.getUint8(2);
    const cmd = view.getUint8(3);
    const flags = view.getUint8(4);

    const reqId =
      (view.getUint8(5) << 16) | (view.getUint8(6) << 8) | view.getUint8(7);
    const payloadLen = view.getUint32(8, false);

    if (view.byteLength < 12 + payloadLen) {
      throw new Error(
        'Incomplete payload: buffer smaller than length defined in header',
      );
    }

    // Extract payload with zero-copy view if possible, or copy if needed
    const payload = new Uint8Array(u8.buffer, u8.byteOffset + 12, payloadLen);

    return {
      version,
      cmd,
      flags,
      reqId,
      length: payloadLen,
      payload,
    };
  }
}
