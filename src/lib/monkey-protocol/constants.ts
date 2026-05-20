export const MAGIC_NUMBER = 0x4d4b;
export const CURRENT_VERSION = 0x01;

export enum Cmd {
  AUTH_REQ = 0x01,
  AUTH_ACK = 0x02,
  PING = 0x03,
  PONG = 0x04,
  MSG_UP = 0x05,
  MSG_UP_ACK = 0x06,
  MSG_NOTIFY = 0x08,
  READ_RECEIPT = 0x0b,
  EXCEPTION_ACK = 0x0c,
}

export enum Flags {
  NONE = 0x00,
  REQUIRE_ACK = 0x01,
  COMPRESSED = 0x02,
  ENCRYPTED = 0x04,
  NO_RETRY = 0x08,
}

export enum ErrorCode {
  PROTOCOL_MISMATCH = 426,
  UNAUTHORIZED = 10030, // when accessing a protected resource without valid authentication
}
