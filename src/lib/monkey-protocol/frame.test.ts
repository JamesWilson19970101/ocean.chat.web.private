import { describe, it, expect } from 'vitest';

import { Cmd, Flags, CURRENT_VERSION } from './constants';
import { FrameEncoder, FrameDecoder, MonkeyFrame } from './frame';

describe('Monkey Protocol Frame Encoder/Decoder', () => {
  it('should correctly encode and decode a frame without payload', () => {
    const frame: MonkeyFrame = {
      version: CURRENT_VERSION,
      cmd: Cmd.PING,
      flags: Flags.NONE,
      reqId: 0,
      length: 0,
      payload: new Uint8Array(),
    };

    const encoded = FrameEncoder.encode(frame);
    expect(encoded.length).toBe(12);

    const decoded = FrameDecoder.decode(encoded);
    expect(decoded.version).toBe(CURRENT_VERSION);
    expect(decoded.cmd).toBe(Cmd.PING);
    expect(decoded.flags).toBe(Flags.NONE);
    expect(decoded.reqId).toBe(0);
    expect(decoded.payload.length).toBe(0);
  });

  it('should correctly encode and decode a frame with payload and flags', () => {
    const payload = new TextEncoder().encode('hello world');
    const frame: MonkeyFrame = {
      version: 2,
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK | Flags.COMPRESSED,
      reqId: 16777215, // Max 24-bit integer
      length: payload.length,
      payload,
    };

    const encoded = FrameEncoder.encode(frame);
    expect(encoded.length).toBe(12 + payload.length);

    const decoded = FrameDecoder.decode(encoded);
    expect(decoded.version).toBe(2);
    expect(decoded.cmd).toBe(Cmd.MSG_UP);
    expect(decoded.flags).toBe(Flags.REQUIRE_ACK | Flags.COMPRESSED);
    expect(decoded.reqId).toBe(16777215);
    expect(new TextDecoder().decode(decoded.payload)).toBe('hello world');
  });

  it('should throw error for invalid magic number', () => {
    const buffer = new Uint8Array(12);
    // Write invalid magic number
    buffer[0] = 0x12;
    buffer[1] = 0x34;

    expect(() => FrameDecoder.decode(buffer)).toThrowError(
      /Invalid Magic Number/,
    );
  });

  it('should throw error for incomplete buffer', () => {
    const buffer = new Uint8Array(10);
    expect(() => FrameDecoder.decode(buffer)).toThrowError(/Buffer too small/);
  });

  it('should throw error for incomplete payload', () => {
    const frame: MonkeyFrame = {
      version: CURRENT_VERSION,
      cmd: Cmd.AUTH_REQ,
      flags: Flags.NONE,
      reqId: 1,
      length: 10,
      payload: new Uint8Array(10), // length 10
    };

    const encoded = FrameEncoder.encode(frame);
    // Slice off the last byte
    const incomplete = encoded.slice(0, encoded.length - 1);

    expect(() => FrameDecoder.decode(incomplete)).toThrowError(
      /Incomplete payload/,
    );
  });
});
