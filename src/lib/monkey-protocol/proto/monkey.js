/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const oceanchat = $root.oceanchat = (() => {

    /**
     * Namespace oceanchat.
     * @exports oceanchat
     * @namespace
     */
    const oceanchat = {};

    oceanchat.monkey = (function() {

        /**
         * Namespace monkey.
         * @memberof oceanchat
         * @namespace
         */
        const monkey = {};

        monkey.MsgUp = (function() {

            /**
             * Properties of a MsgUp.
             * @typedef {Object} oceanchat.monkey.MsgUp.$Properties
             * @property {string|null} [clientMsgId] MsgUp clientMsgId
             * @property {string|null} [groupId] MsgUp groupId
             * @property {oceanchat.monkey.MsgUp.MsgType|null} [msgType] MsgUp msgType
             * @property {string|null} [content] MsgUp content
             * @property {string|null} [url] MsgUp url
             * @property {number|null} [width] MsgUp width
             * @property {number|null} [height] MsgUp height
             * @property {number|Long|null} [size] MsgUp size
             * @property {string|null} [format] MsgUp format
             * @property {number|null} [duration] MsgUp duration
             * @property {string|null} [fileName] MsgUp fileName
             * @property {string|null} [extension] MsgUp extension
             * @property {string|null} [thumbnailUrl] MsgUp thumbnailUrl
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a MsgUp.
             * @memberof oceanchat.monkey
             * @interface IMsgUp
             * @augments oceanchat.monkey.MsgUp.$Properties
             * @deprecated Use oceanchat.monkey.MsgUp.$Properties instead.
             */

            /**
             * Shape of a MsgUp.
             * @typedef {oceanchat.monkey.MsgUp.$Properties} oceanchat.monkey.MsgUp.$Shape
             */

            /**
             * Constructs a new MsgUp.
             * @memberof oceanchat.monkey
             * @classdesc Represents a MsgUp.
             * @constructor
             * @param {oceanchat.monkey.MsgUp.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function MsgUp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgUp clientMsgId.
             * @member {string} clientMsgId
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.clientMsgId = "";

            /**
             * MsgUp groupId.
             * @member {string} groupId
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.groupId = "";

            /**
             * MsgUp msgType.
             * @member {oceanchat.monkey.MsgUp.MsgType} msgType
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.msgType = 0;

            /**
             * MsgUp content.
             * @member {string} content
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.content = "";

            /**
             * MsgUp url.
             * @member {string} url
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.url = "";

            /**
             * MsgUp width.
             * @member {number} width
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.width = 0;

            /**
             * MsgUp height.
             * @member {number} height
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.height = 0;

            /**
             * MsgUp size.
             * @member {number|Long} size
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MsgUp format.
             * @member {string} format
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.format = "";

            /**
             * MsgUp duration.
             * @member {number} duration
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.duration = 0;

            /**
             * MsgUp fileName.
             * @member {string} fileName
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.fileName = "";

            /**
             * MsgUp extension.
             * @member {string} extension
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.extension = "";

            /**
             * MsgUp thumbnailUrl.
             * @member {string} thumbnailUrl
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             */
            MsgUp.prototype.thumbnailUrl = "";

            /**
             * Creates a new MsgUp instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {oceanchat.monkey.MsgUp.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.MsgUp} MsgUp instance
             * @type {{
             *   (properties: oceanchat.monkey.MsgUp.$Shape): oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape;
             *   (properties?: oceanchat.monkey.MsgUp.$Properties): oceanchat.monkey.MsgUp;
             * }}
             */
            MsgUp.create = function create(properties) {
                return new MsgUp(properties);
            };

            /**
             * Encodes the specified MsgUp message. Does not implicitly {@link oceanchat.monkey.MsgUp.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {oceanchat.monkey.MsgUp.$Properties} message MsgUp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgUp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.clientMsgId != null && Object.hasOwnProperty.call(message, "clientMsgId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientMsgId);
                if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.groupId);
                if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.msgType);
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.content);
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.url);
                if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.width);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.height);
                if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int64(message.size);
                if (message.format != null && Object.hasOwnProperty.call(message, "format"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.format);
                if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.duration);
                if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.fileName);
                if (message.extension != null && Object.hasOwnProperty.call(message, "extension"))
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.extension);
                if (message.thumbnailUrl != null && Object.hasOwnProperty.call(message, "thumbnailUrl"))
                    writer.uint32(/* id 13, wireType 2 =*/106).string(message.thumbnailUrl);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified MsgUp message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgUp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {oceanchat.monkey.MsgUp.$Properties} message MsgUp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgUp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgUp message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape} MsgUp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgUp.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.MsgUp(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.clientMsgId = value;
                            else
                                delete message.clientMsgId;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.groupId = value;
                            else
                                delete message.groupId;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.msgType = value;
                            else
                                delete message.msgType;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.content = value;
                            else
                                delete message.content;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.url = value;
                            else
                                delete message.url;
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.width = value;
                            else
                                delete message.width;
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.height = value;
                            else
                                delete message.height;
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.size = value;
                            else
                                delete message.size;
                            continue;
                        }
                    case 9: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.format = value;
                            else
                                delete message.format;
                            continue;
                        }
                    case 10: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.duration = value;
                            else
                                delete message.duration;
                            continue;
                        }
                    case 11: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.fileName = value;
                            else
                                delete message.fileName;
                            continue;
                        }
                    case 12: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.extension = value;
                            else
                                delete message.extension;
                            continue;
                        }
                    case 13: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.thumbnailUrl = value;
                            else
                                delete message.thumbnailUrl;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes a MsgUp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape} MsgUp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgUp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgUp message.
             * @function verify
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgUp.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.clientMsgId != null && message.hasOwnProperty("clientMsgId"))
                    if (!$util.isString(message.clientMsgId))
                        return "clientMsgId: string expected";
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    if (!$util.isString(message.groupId))
                        return "groupId: string expected";
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    switch (message.msgType) {
                    default:
                        return "msgType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                if (message.url != null && message.hasOwnProperty("url"))
                    if (!$util.isString(message.url))
                        return "url: string expected";
                if (message.width != null && message.hasOwnProperty("width"))
                    if (!$util.isInteger(message.width))
                        return "width: integer expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height))
                        return "height: integer expected";
                if (message.size != null && message.hasOwnProperty("size"))
                    if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                        return "size: integer|Long expected";
                if (message.format != null && message.hasOwnProperty("format"))
                    if (!$util.isString(message.format))
                        return "format: string expected";
                if (message.duration != null && message.hasOwnProperty("duration"))
                    if (!$util.isInteger(message.duration))
                        return "duration: integer expected";
                if (message.fileName != null && message.hasOwnProperty("fileName"))
                    if (!$util.isString(message.fileName))
                        return "fileName: string expected";
                if (message.extension != null && message.hasOwnProperty("extension"))
                    if (!$util.isString(message.extension))
                        return "extension: string expected";
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl"))
                    if (!$util.isString(message.thumbnailUrl))
                        return "thumbnailUrl: string expected";
                return null;
            };

            /**
             * Creates a MsgUp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.MsgUp} MsgUp
             */
            MsgUp.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.MsgUp)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.MsgUp();
                if (object.clientMsgId != null)
                    if (typeof object.clientMsgId !== "string" || object.clientMsgId.length)
                        message.clientMsgId = String(object.clientMsgId);
                if (object.groupId != null)
                    if (typeof object.groupId !== "string" || object.groupId.length)
                        message.groupId = String(object.groupId);
                if (object.msgType !== 0 && (typeof object.msgType !== "string" || $root.oceanchat.monkey.MsgUp.MsgType[object.msgType] !== 0))
                    switch (object.msgType) {
                    default:
                        if (typeof object.msgType === "number") {
                            message.msgType = object.msgType;
                            break;
                        }
                        break;
                    case "TEXT":
                    case 0:
                        message.msgType = 0;
                        break;
                    case "IMAGE":
                    case 1:
                        message.msgType = 1;
                        break;
                    case "AUDIO":
                    case 2:
                        message.msgType = 2;
                        break;
                    case "FILE":
                    case 3:
                        message.msgType = 3;
                        break;
                    }
                if (object.content != null)
                    if (typeof object.content !== "string" || object.content.length)
                        message.content = String(object.content);
                if (object.url != null)
                    if (typeof object.url !== "string" || object.url.length)
                        message.url = String(object.url);
                if (object.width != null)
                    if (Number(object.width) !== 0)
                        message.width = object.width | 0;
                if (object.height != null)
                    if (Number(object.height) !== 0)
                        message.height = object.height | 0;
                if (object.size != null)
                    if (typeof object.size === "object" ? object.size.low || object.size.high : Number(object.size) !== 0)
                        if ($util.Long)
                            (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                        else if (typeof object.size === "string")
                            message.size = parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                if (object.format != null)
                    if (typeof object.format !== "string" || object.format.length)
                        message.format = String(object.format);
                if (object.duration != null)
                    if (Number(object.duration) !== 0)
                        message.duration = object.duration | 0;
                if (object.fileName != null)
                    if (typeof object.fileName !== "string" || object.fileName.length)
                        message.fileName = String(object.fileName);
                if (object.extension != null)
                    if (typeof object.extension !== "string" || object.extension.length)
                        message.extension = String(object.extension);
                if (object.thumbnailUrl != null)
                    if (typeof object.thumbnailUrl !== "string" || object.thumbnailUrl.length)
                        message.thumbnailUrl = String(object.thumbnailUrl);
                return message;
            };

            /**
             * Creates a plain object from a MsgUp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {oceanchat.monkey.MsgUp} message MsgUp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgUp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.clientMsgId = "";
                    object.groupId = "";
                    object.msgType = options.enums === String ? "TEXT" : 0;
                    object.content = "";
                    object.url = "";
                    object.width = 0;
                    object.height = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.size = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.format = "";
                    object.duration = 0;
                    object.fileName = "";
                    object.extension = "";
                    object.thumbnailUrl = "";
                }
                if (message.clientMsgId != null && message.hasOwnProperty("clientMsgId"))
                    object.clientMsgId = message.clientMsgId;
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    object.groupId = message.groupId;
                if (message.msgType != null && message.hasOwnProperty("msgType"))
                    object.msgType = options.enums === String ? $root.oceanchat.monkey.MsgUp.MsgType[message.msgType] === undefined ? message.msgType : $root.oceanchat.monkey.MsgUp.MsgType[message.msgType] : message.msgType;
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.width != null && message.hasOwnProperty("width"))
                    object.width = message.width;
                if (message.height != null && message.hasOwnProperty("height"))
                    object.height = message.height;
                if (message.size != null && message.hasOwnProperty("size"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.size = typeof message.size === "number" ? BigInt(message.size) : $util.Long.fromBits(message.size.low >>> 0, message.size.high >>> 0, false).toBigInt();
                    else if (typeof message.size === "number")
                        object.size = options.longs === String ? String(message.size) : message.size;
                    else
                        object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                if (message.format != null && message.hasOwnProperty("format"))
                    object.format = message.format;
                if (message.duration != null && message.hasOwnProperty("duration"))
                    object.duration = message.duration;
                if (message.fileName != null && message.hasOwnProperty("fileName"))
                    object.fileName = message.fileName;
                if (message.extension != null && message.hasOwnProperty("extension"))
                    object.extension = message.extension;
                if (message.thumbnailUrl != null && message.hasOwnProperty("thumbnailUrl"))
                    object.thumbnailUrl = message.thumbnailUrl;
                return object;
            };

            /**
             * Converts this MsgUp to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.MsgUp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgUp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for MsgUp
             * @function getTypeUrl
             * @memberof oceanchat.monkey.MsgUp
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            MsgUp.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.MsgUp";
            };

            /**
             * MsgType enum.
             * @name oceanchat.monkey.MsgUp.MsgType
             * @enum {number}
             * @property {number} TEXT=0 TEXT value
             * @property {number} IMAGE=1 IMAGE value
             * @property {number} AUDIO=2 AUDIO value
             * @property {number} FILE=3 FILE value
             */
            MsgUp.MsgType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "TEXT"] = 0;
                values[valuesById[1] = "IMAGE"] = 1;
                values[valuesById[2] = "AUDIO"] = 2;
                values[valuesById[3] = "FILE"] = 3;
                return values;
            })();

            return MsgUp;
        })();

        monkey.MsgUpAck = (function() {

            /**
             * Properties of a MsgUpAck.
             * @typedef {Object} oceanchat.monkey.MsgUpAck.$Properties
             * @property {string|null} [clientMsgId] MsgUpAck clientMsgId
             * @property {number|Long|null} [syncSeqId] MsgUpAck syncSeqId
             * @property {boolean|null} [success] MsgUpAck success
             * @property {string|null} [errorMessage] MsgUpAck errorMessage
             * @property {number|Long|null} [serverTimestamp] MsgUpAck serverTimestamp
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a MsgUpAck.
             * @memberof oceanchat.monkey
             * @interface IMsgUpAck
             * @augments oceanchat.monkey.MsgUpAck.$Properties
             * @deprecated Use oceanchat.monkey.MsgUpAck.$Properties instead.
             */

            /**
             * Shape of a MsgUpAck.
             * @typedef {oceanchat.monkey.MsgUpAck.$Properties} oceanchat.monkey.MsgUpAck.$Shape
             */

            /**
             * Constructs a new MsgUpAck.
             * @memberof oceanchat.monkey
             * @classdesc Represents a MsgUpAck.
             * @constructor
             * @param {oceanchat.monkey.MsgUpAck.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function MsgUpAck(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgUpAck clientMsgId.
             * @member {string} clientMsgId
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             */
            MsgUpAck.prototype.clientMsgId = "";

            /**
             * MsgUpAck syncSeqId.
             * @member {number|Long} syncSeqId
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             */
            MsgUpAck.prototype.syncSeqId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * MsgUpAck success.
             * @member {boolean} success
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             */
            MsgUpAck.prototype.success = false;

            /**
             * MsgUpAck errorMessage.
             * @member {string} errorMessage
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             */
            MsgUpAck.prototype.errorMessage = "";

            /**
             * MsgUpAck serverTimestamp.
             * @member {number|Long} serverTimestamp
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             */
            MsgUpAck.prototype.serverTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new MsgUpAck instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {oceanchat.monkey.MsgUpAck.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.MsgUpAck} MsgUpAck instance
             * @type {{
             *   (properties: oceanchat.monkey.MsgUpAck.$Shape): oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape;
             *   (properties?: oceanchat.monkey.MsgUpAck.$Properties): oceanchat.monkey.MsgUpAck;
             * }}
             */
            MsgUpAck.create = function create(properties) {
                return new MsgUpAck(properties);
            };

            /**
             * Encodes the specified MsgUpAck message. Does not implicitly {@link oceanchat.monkey.MsgUpAck.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {oceanchat.monkey.MsgUpAck.$Properties} message MsgUpAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgUpAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.clientMsgId != null && Object.hasOwnProperty.call(message, "clientMsgId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientMsgId);
                if (message.syncSeqId != null && Object.hasOwnProperty.call(message, "syncSeqId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.syncSeqId);
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.success);
                if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.errorMessage);
                if (message.serverTimestamp != null && Object.hasOwnProperty.call(message, "serverTimestamp"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.serverTimestamp);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified MsgUpAck message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgUpAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {oceanchat.monkey.MsgUpAck.$Properties} message MsgUpAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgUpAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgUpAck message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape} MsgUpAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgUpAck.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.MsgUpAck(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.clientMsgId = value;
                            else
                                delete message.clientMsgId;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                message.syncSeqId = value;
                            else
                                delete message.syncSeqId;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.bool())
                                message.success = value;
                            else
                                delete message.success;
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.errorMessage = value;
                            else
                                delete message.errorMessage;
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.serverTimestamp = value;
                            else
                                delete message.serverTimestamp;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes a MsgUpAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape} MsgUpAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgUpAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgUpAck message.
             * @function verify
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgUpAck.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.clientMsgId != null && message.hasOwnProperty("clientMsgId"))
                    if (!$util.isString(message.clientMsgId))
                        return "clientMsgId: string expected";
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (!$util.isInteger(message.syncSeqId) && !(message.syncSeqId && $util.isInteger(message.syncSeqId.low) && $util.isInteger(message.syncSeqId.high)))
                        return "syncSeqId: integer|Long expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                if (message.serverTimestamp != null && message.hasOwnProperty("serverTimestamp"))
                    if (!$util.isInteger(message.serverTimestamp) && !(message.serverTimestamp && $util.isInteger(message.serverTimestamp.low) && $util.isInteger(message.serverTimestamp.high)))
                        return "serverTimestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a MsgUpAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.MsgUpAck} MsgUpAck
             */
            MsgUpAck.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.MsgUpAck)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.MsgUpAck();
                if (object.clientMsgId != null)
                    if (typeof object.clientMsgId !== "string" || object.clientMsgId.length)
                        message.clientMsgId = String(object.clientMsgId);
                if (object.syncSeqId != null)
                    if (typeof object.syncSeqId === "object" ? object.syncSeqId.low || object.syncSeqId.high : Number(object.syncSeqId) !== 0)
                        if ($util.Long)
                            (message.syncSeqId = $util.Long.fromValue(object.syncSeqId)).unsigned = true;
                        else if (typeof object.syncSeqId === "string")
                            message.syncSeqId = parseInt(object.syncSeqId, 10);
                        else if (typeof object.syncSeqId === "number")
                            message.syncSeqId = object.syncSeqId;
                        else if (typeof object.syncSeqId === "object")
                            message.syncSeqId = new $util.LongBits(object.syncSeqId.low >>> 0, object.syncSeqId.high >>> 0).toNumber(true);
                if (object.success != null)
                    if (object.success)
                        message.success = Boolean(object.success);
                if (object.errorMessage != null)
                    if (typeof object.errorMessage !== "string" || object.errorMessage.length)
                        message.errorMessage = String(object.errorMessage);
                if (object.serverTimestamp != null)
                    if (typeof object.serverTimestamp === "object" ? object.serverTimestamp.low || object.serverTimestamp.high : Number(object.serverTimestamp) !== 0)
                        if ($util.Long)
                            (message.serverTimestamp = $util.Long.fromValue(object.serverTimestamp)).unsigned = false;
                        else if (typeof object.serverTimestamp === "string")
                            message.serverTimestamp = parseInt(object.serverTimestamp, 10);
                        else if (typeof object.serverTimestamp === "number")
                            message.serverTimestamp = object.serverTimestamp;
                        else if (typeof object.serverTimestamp === "object")
                            message.serverTimestamp = new $util.LongBits(object.serverTimestamp.low >>> 0, object.serverTimestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a MsgUpAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {oceanchat.monkey.MsgUpAck} message MsgUpAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgUpAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.clientMsgId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.syncSeqId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.syncSeqId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.success = false;
                    object.errorMessage = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.serverTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.serverTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.clientMsgId != null && message.hasOwnProperty("clientMsgId"))
                    object.clientMsgId = message.clientMsgId;
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.syncSeqId = typeof message.syncSeqId === "number" ? BigInt(message.syncSeqId) : $util.Long.fromBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0, true).toBigInt();
                    else if (typeof message.syncSeqId === "number")
                        object.syncSeqId = options.longs === String ? String(message.syncSeqId) : message.syncSeqId;
                    else
                        object.syncSeqId = options.longs === String ? $util.Long.prototype.toString.call(message.syncSeqId) : options.longs === Number ? new $util.LongBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0).toNumber(true) : message.syncSeqId;
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                if (message.serverTimestamp != null && message.hasOwnProperty("serverTimestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.serverTimestamp = typeof message.serverTimestamp === "number" ? BigInt(message.serverTimestamp) : $util.Long.fromBits(message.serverTimestamp.low >>> 0, message.serverTimestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.serverTimestamp === "number")
                        object.serverTimestamp = options.longs === String ? String(message.serverTimestamp) : message.serverTimestamp;
                    else
                        object.serverTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.serverTimestamp) : options.longs === Number ? new $util.LongBits(message.serverTimestamp.low >>> 0, message.serverTimestamp.high >>> 0).toNumber() : message.serverTimestamp;
                return object;
            };

            /**
             * Converts this MsgUpAck to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.MsgUpAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgUpAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for MsgUpAck
             * @function getTypeUrl
             * @memberof oceanchat.monkey.MsgUpAck
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            MsgUpAck.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.MsgUpAck";
            };

            return MsgUpAck;
        })();

        monkey.MsgNotify = (function() {

            /**
             * Properties of a MsgNotify.
             * @typedef {Object} oceanchat.monkey.MsgNotify.$Properties
             * @property {string|null} [groupId] MsgNotify groupId
             * @property {number|Long|null} [syncSeqId] MsgNotify syncSeqId
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a MsgNotify.
             * @memberof oceanchat.monkey
             * @interface IMsgNotify
             * @augments oceanchat.monkey.MsgNotify.$Properties
             * @deprecated Use oceanchat.monkey.MsgNotify.$Properties instead.
             */

            /**
             * Shape of a MsgNotify.
             * @typedef {oceanchat.monkey.MsgNotify.$Properties} oceanchat.monkey.MsgNotify.$Shape
             */

            /**
             * Constructs a new MsgNotify.
             * @memberof oceanchat.monkey
             * @classdesc Represents a MsgNotify.
             * @constructor
             * @param {oceanchat.monkey.MsgNotify.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function MsgNotify(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MsgNotify groupId.
             * @member {string} groupId
             * @memberof oceanchat.monkey.MsgNotify
             * @instance
             */
            MsgNotify.prototype.groupId = "";

            /**
             * MsgNotify syncSeqId.
             * @member {number|Long} syncSeqId
             * @memberof oceanchat.monkey.MsgNotify
             * @instance
             */
            MsgNotify.prototype.syncSeqId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new MsgNotify instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {oceanchat.monkey.MsgNotify.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.MsgNotify} MsgNotify instance
             * @type {{
             *   (properties: oceanchat.monkey.MsgNotify.$Shape): oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape;
             *   (properties?: oceanchat.monkey.MsgNotify.$Properties): oceanchat.monkey.MsgNotify;
             * }}
             */
            MsgNotify.create = function create(properties) {
                return new MsgNotify(properties);
            };

            /**
             * Encodes the specified MsgNotify message. Does not implicitly {@link oceanchat.monkey.MsgNotify.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {oceanchat.monkey.MsgNotify.$Properties} message MsgNotify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgNotify.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
                if (message.syncSeqId != null && Object.hasOwnProperty.call(message, "syncSeqId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.syncSeqId);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified MsgNotify message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgNotify.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {oceanchat.monkey.MsgNotify.$Properties} message MsgNotify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgNotify.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MsgNotify message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape} MsgNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgNotify.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.MsgNotify(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.groupId = value;
                            else
                                delete message.groupId;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                message.syncSeqId = value;
                            else
                                delete message.syncSeqId;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes a MsgNotify message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape} MsgNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgNotify.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MsgNotify message.
             * @function verify
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MsgNotify.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    if (!$util.isString(message.groupId))
                        return "groupId: string expected";
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (!$util.isInteger(message.syncSeqId) && !(message.syncSeqId && $util.isInteger(message.syncSeqId.low) && $util.isInteger(message.syncSeqId.high)))
                        return "syncSeqId: integer|Long expected";
                return null;
            };

            /**
             * Creates a MsgNotify message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.MsgNotify} MsgNotify
             */
            MsgNotify.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.MsgNotify)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.MsgNotify();
                if (object.groupId != null)
                    if (typeof object.groupId !== "string" || object.groupId.length)
                        message.groupId = String(object.groupId);
                if (object.syncSeqId != null)
                    if (typeof object.syncSeqId === "object" ? object.syncSeqId.low || object.syncSeqId.high : Number(object.syncSeqId) !== 0)
                        if ($util.Long)
                            (message.syncSeqId = $util.Long.fromValue(object.syncSeqId)).unsigned = true;
                        else if (typeof object.syncSeqId === "string")
                            message.syncSeqId = parseInt(object.syncSeqId, 10);
                        else if (typeof object.syncSeqId === "number")
                            message.syncSeqId = object.syncSeqId;
                        else if (typeof object.syncSeqId === "object")
                            message.syncSeqId = new $util.LongBits(object.syncSeqId.low >>> 0, object.syncSeqId.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a MsgNotify message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {oceanchat.monkey.MsgNotify} message MsgNotify
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MsgNotify.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.groupId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.syncSeqId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.syncSeqId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    object.groupId = message.groupId;
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.syncSeqId = typeof message.syncSeqId === "number" ? BigInt(message.syncSeqId) : $util.Long.fromBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0, true).toBigInt();
                    else if (typeof message.syncSeqId === "number")
                        object.syncSeqId = options.longs === String ? String(message.syncSeqId) : message.syncSeqId;
                    else
                        object.syncSeqId = options.longs === String ? $util.Long.prototype.toString.call(message.syncSeqId) : options.longs === Number ? new $util.LongBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0).toNumber(true) : message.syncSeqId;
                return object;
            };

            /**
             * Converts this MsgNotify to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.MsgNotify
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MsgNotify.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for MsgNotify
             * @function getTypeUrl
             * @memberof oceanchat.monkey.MsgNotify
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            MsgNotify.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.MsgNotify";
            };

            return MsgNotify;
        })();

        monkey.AuthReq = (function() {

            /**
             * Properties of an AuthReq.
             * @typedef {Object} oceanchat.monkey.AuthReq.$Properties
             * @property {string|null} [deviceType] AuthReq deviceType
             * @property {string|null} [deviceId] AuthReq deviceId
             * @property {string|null} [jwt] AuthReq jwt
             * @property {Array.<number>|null} [supportedVersions] AuthReq supportedVersions
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an AuthReq.
             * @memberof oceanchat.monkey
             * @interface IAuthReq
             * @augments oceanchat.monkey.AuthReq.$Properties
             * @deprecated Use oceanchat.monkey.AuthReq.$Properties instead.
             */

            /**
             * Shape of an AuthReq.
             * @typedef {oceanchat.monkey.AuthReq.$Properties} oceanchat.monkey.AuthReq.$Shape
             */

            /**
             * Constructs a new AuthReq.
             * @memberof oceanchat.monkey
             * @classdesc Represents an AuthReq.
             * @constructor
             * @param {oceanchat.monkey.AuthReq.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function AuthReq(properties) {
                this.supportedVersions = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AuthReq deviceType.
             * @member {string} deviceType
             * @memberof oceanchat.monkey.AuthReq
             * @instance
             */
            AuthReq.prototype.deviceType = "";

            /**
             * AuthReq deviceId.
             * @member {string} deviceId
             * @memberof oceanchat.monkey.AuthReq
             * @instance
             */
            AuthReq.prototype.deviceId = "";

            /**
             * AuthReq jwt.
             * @member {string} jwt
             * @memberof oceanchat.monkey.AuthReq
             * @instance
             */
            AuthReq.prototype.jwt = "";

            /**
             * AuthReq supportedVersions.
             * @member {Array.<number>} supportedVersions
             * @memberof oceanchat.monkey.AuthReq
             * @instance
             */
            AuthReq.prototype.supportedVersions = $util.emptyArray;

            /**
             * Creates a new AuthReq instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {oceanchat.monkey.AuthReq.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.AuthReq} AuthReq instance
             * @type {{
             *   (properties: oceanchat.monkey.AuthReq.$Shape): oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape;
             *   (properties?: oceanchat.monkey.AuthReq.$Properties): oceanchat.monkey.AuthReq;
             * }}
             */
            AuthReq.create = function create(properties) {
                return new AuthReq(properties);
            };

            /**
             * Encodes the specified AuthReq message. Does not implicitly {@link oceanchat.monkey.AuthReq.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {oceanchat.monkey.AuthReq.$Properties} message AuthReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceType != null && Object.hasOwnProperty.call(message, "deviceType"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceType);
                if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceId);
                if (message.jwt != null && Object.hasOwnProperty.call(message, "jwt"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.jwt);
                if (message.supportedVersions != null && message.supportedVersions.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.supportedVersions.length; ++i)
                        writer.int32(message.supportedVersions[i]);
                    writer.ldelim();
                }
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified AuthReq message, length delimited. Does not implicitly {@link oceanchat.monkey.AuthReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {oceanchat.monkey.AuthReq.$Properties} message AuthReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AuthReq message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape} AuthReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthReq.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.AuthReq(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.deviceType = value;
                            else
                                delete message.deviceType;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.deviceId = value;
                            else
                                delete message.deviceId;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.jwt = value;
                            else
                                delete message.jwt;
                            continue;
                        }
                    case 4: {
                            if (wireType === 2) {
                                if (!(message.supportedVersions && message.supportedVersions.length))
                                    message.supportedVersions = [];
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.supportedVersions.push(reader.int32());
                                continue;
                            }
                            if (wireType !== 0)
                                break;
                            if (!(message.supportedVersions && message.supportedVersions.length))
                                message.supportedVersions = [];
                            message.supportedVersions.push(reader.int32());
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes an AuthReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape} AuthReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AuthReq message.
             * @function verify
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthReq.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    if (!$util.isString(message.deviceType))
                        return "deviceType: string expected";
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isString(message.deviceId))
                        return "deviceId: string expected";
                if (message.jwt != null && message.hasOwnProperty("jwt"))
                    if (!$util.isString(message.jwt))
                        return "jwt: string expected";
                if (message.supportedVersions != null && message.hasOwnProperty("supportedVersions")) {
                    if (!Array.isArray(message.supportedVersions))
                        return "supportedVersions: array expected";
                    for (let i = 0; i < message.supportedVersions.length; ++i)
                        if (!$util.isInteger(message.supportedVersions[i]))
                            return "supportedVersions: integer[] expected";
                }
                return null;
            };

            /**
             * Creates an AuthReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.AuthReq} AuthReq
             */
            AuthReq.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.AuthReq)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.AuthReq();
                if (object.deviceType != null)
                    if (typeof object.deviceType !== "string" || object.deviceType.length)
                        message.deviceType = String(object.deviceType);
                if (object.deviceId != null)
                    if (typeof object.deviceId !== "string" || object.deviceId.length)
                        message.deviceId = String(object.deviceId);
                if (object.jwt != null)
                    if (typeof object.jwt !== "string" || object.jwt.length)
                        message.jwt = String(object.jwt);
                if (object.supportedVersions) {
                    if (!Array.isArray(object.supportedVersions))
                        throw TypeError(".oceanchat.monkey.AuthReq.supportedVersions: array expected");
                    message.supportedVersions = Array(object.supportedVersions.length);
                    for (let i = 0; i < object.supportedVersions.length; ++i)
                        message.supportedVersions[i] = object.supportedVersions[i] | 0;
                }
                return message;
            };

            /**
             * Creates a plain object from an AuthReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {oceanchat.monkey.AuthReq} message AuthReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.supportedVersions = [];
                if (options.defaults) {
                    object.deviceType = "";
                    object.deviceId = "";
                    object.jwt = "";
                }
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    object.deviceType = message.deviceType;
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    object.deviceId = message.deviceId;
                if (message.jwt != null && message.hasOwnProperty("jwt"))
                    object.jwt = message.jwt;
                if (message.supportedVersions && message.supportedVersions.length) {
                    object.supportedVersions = Array(message.supportedVersions.length);
                    for (let j = 0; j < message.supportedVersions.length; ++j)
                        object.supportedVersions[j] = message.supportedVersions[j];
                }
                return object;
            };

            /**
             * Converts this AuthReq to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.AuthReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for AuthReq
             * @function getTypeUrl
             * @memberof oceanchat.monkey.AuthReq
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            AuthReq.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.AuthReq";
            };

            return AuthReq;
        })();

        monkey.AuthAck = (function() {

            /**
             * Properties of an AuthAck.
             * @typedef {Object} oceanchat.monkey.AuthAck.$Properties
             * @property {string|null} [userId] AuthAck userId
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an AuthAck.
             * @memberof oceanchat.monkey
             * @interface IAuthAck
             * @augments oceanchat.monkey.AuthAck.$Properties
             * @deprecated Use oceanchat.monkey.AuthAck.$Properties instead.
             */

            /**
             * Shape of an AuthAck.
             * @typedef {oceanchat.monkey.AuthAck.$Properties} oceanchat.monkey.AuthAck.$Shape
             */

            /**
             * Constructs a new AuthAck.
             * @memberof oceanchat.monkey
             * @classdesc Represents an AuthAck.
             * @constructor
             * @param {oceanchat.monkey.AuthAck.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function AuthAck(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AuthAck userId.
             * @member {string} userId
             * @memberof oceanchat.monkey.AuthAck
             * @instance
             */
            AuthAck.prototype.userId = "";

            /**
             * Creates a new AuthAck instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {oceanchat.monkey.AuthAck.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.AuthAck} AuthAck instance
             * @type {{
             *   (properties: oceanchat.monkey.AuthAck.$Shape): oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape;
             *   (properties?: oceanchat.monkey.AuthAck.$Properties): oceanchat.monkey.AuthAck;
             * }}
             */
            AuthAck.create = function create(properties) {
                return new AuthAck(properties);
            };

            /**
             * Encodes the specified AuthAck message. Does not implicitly {@link oceanchat.monkey.AuthAck.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {oceanchat.monkey.AuthAck.$Properties} message AuthAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified AuthAck message, length delimited. Does not implicitly {@link oceanchat.monkey.AuthAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {oceanchat.monkey.AuthAck.$Properties} message AuthAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AuthAck message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape} AuthAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthAck.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.AuthAck(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.userId = value;
                            else
                                delete message.userId;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes an AuthAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape} AuthAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AuthAck message.
             * @function verify
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthAck.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isString(message.userId))
                        return "userId: string expected";
                return null;
            };

            /**
             * Creates an AuthAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.AuthAck} AuthAck
             */
            AuthAck.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.AuthAck)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.AuthAck();
                if (object.userId != null)
                    if (typeof object.userId !== "string" || object.userId.length)
                        message.userId = String(object.userId);
                return message;
            };

            /**
             * Creates a plain object from an AuthAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {oceanchat.monkey.AuthAck} message AuthAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.userId = "";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                return object;
            };

            /**
             * Converts this AuthAck to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.AuthAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for AuthAck
             * @function getTypeUrl
             * @memberof oceanchat.monkey.AuthAck
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            AuthAck.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.AuthAck";
            };

            return AuthAck;
        })();

        monkey.ReadReceipt = (function() {

            /**
             * Properties of a ReadReceipt.
             * @typedef {Object} oceanchat.monkey.ReadReceipt.$Properties
             * @property {string|null} [groupId] ReadReceipt groupId
             * @property {number|Long|null} [syncSeqId] ReadReceipt syncSeqId
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a ReadReceipt.
             * @memberof oceanchat.monkey
             * @interface IReadReceipt
             * @augments oceanchat.monkey.ReadReceipt.$Properties
             * @deprecated Use oceanchat.monkey.ReadReceipt.$Properties instead.
             */

            /**
             * Shape of a ReadReceipt.
             * @typedef {oceanchat.monkey.ReadReceipt.$Properties} oceanchat.monkey.ReadReceipt.$Shape
             */

            /**
             * Constructs a new ReadReceipt.
             * @memberof oceanchat.monkey
             * @classdesc Represents a ReadReceipt.
             * @constructor
             * @param {oceanchat.monkey.ReadReceipt.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function ReadReceipt(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ReadReceipt groupId.
             * @member {string} groupId
             * @memberof oceanchat.monkey.ReadReceipt
             * @instance
             */
            ReadReceipt.prototype.groupId = "";

            /**
             * ReadReceipt syncSeqId.
             * @member {number|Long} syncSeqId
             * @memberof oceanchat.monkey.ReadReceipt
             * @instance
             */
            ReadReceipt.prototype.syncSeqId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new ReadReceipt instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {oceanchat.monkey.ReadReceipt.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.ReadReceipt} ReadReceipt instance
             * @type {{
             *   (properties: oceanchat.monkey.ReadReceipt.$Shape): oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape;
             *   (properties?: oceanchat.monkey.ReadReceipt.$Properties): oceanchat.monkey.ReadReceipt;
             * }}
             */
            ReadReceipt.create = function create(properties) {
                return new ReadReceipt(properties);
            };

            /**
             * Encodes the specified ReadReceipt message. Does not implicitly {@link oceanchat.monkey.ReadReceipt.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {oceanchat.monkey.ReadReceipt.$Properties} message ReadReceipt message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadReceipt.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
                if (message.syncSeqId != null && Object.hasOwnProperty.call(message, "syncSeqId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.syncSeqId);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ReadReceipt message, length delimited. Does not implicitly {@link oceanchat.monkey.ReadReceipt.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {oceanchat.monkey.ReadReceipt.$Properties} message ReadReceipt message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ReadReceipt.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ReadReceipt message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape} ReadReceipt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadReceipt.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.ReadReceipt(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.groupId = value;
                            else
                                delete message.groupId;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                message.syncSeqId = value;
                            else
                                delete message.syncSeqId;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes a ReadReceipt message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape} ReadReceipt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ReadReceipt.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ReadReceipt message.
             * @function verify
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ReadReceipt.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    if (!$util.isString(message.groupId))
                        return "groupId: string expected";
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (!$util.isInteger(message.syncSeqId) && !(message.syncSeqId && $util.isInteger(message.syncSeqId.low) && $util.isInteger(message.syncSeqId.high)))
                        return "syncSeqId: integer|Long expected";
                return null;
            };

            /**
             * Creates a ReadReceipt message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.ReadReceipt} ReadReceipt
             */
            ReadReceipt.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.ReadReceipt)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.ReadReceipt();
                if (object.groupId != null)
                    if (typeof object.groupId !== "string" || object.groupId.length)
                        message.groupId = String(object.groupId);
                if (object.syncSeqId != null)
                    if (typeof object.syncSeqId === "object" ? object.syncSeqId.low || object.syncSeqId.high : Number(object.syncSeqId) !== 0)
                        if ($util.Long)
                            (message.syncSeqId = $util.Long.fromValue(object.syncSeqId)).unsigned = true;
                        else if (typeof object.syncSeqId === "string")
                            message.syncSeqId = parseInt(object.syncSeqId, 10);
                        else if (typeof object.syncSeqId === "number")
                            message.syncSeqId = object.syncSeqId;
                        else if (typeof object.syncSeqId === "object")
                            message.syncSeqId = new $util.LongBits(object.syncSeqId.low >>> 0, object.syncSeqId.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a ReadReceipt message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {oceanchat.monkey.ReadReceipt} message ReadReceipt
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ReadReceipt.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.groupId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.syncSeqId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.syncSeqId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    object.groupId = message.groupId;
                if (message.syncSeqId != null && message.hasOwnProperty("syncSeqId"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.syncSeqId = typeof message.syncSeqId === "number" ? BigInt(message.syncSeqId) : $util.Long.fromBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0, true).toBigInt();
                    else if (typeof message.syncSeqId === "number")
                        object.syncSeqId = options.longs === String ? String(message.syncSeqId) : message.syncSeqId;
                    else
                        object.syncSeqId = options.longs === String ? $util.Long.prototype.toString.call(message.syncSeqId) : options.longs === Number ? new $util.LongBits(message.syncSeqId.low >>> 0, message.syncSeqId.high >>> 0).toNumber(true) : message.syncSeqId;
                return object;
            };

            /**
             * Converts this ReadReceipt to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.ReadReceipt
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ReadReceipt.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ReadReceipt
             * @function getTypeUrl
             * @memberof oceanchat.monkey.ReadReceipt
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ReadReceipt.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.ReadReceipt";
            };

            return ReadReceipt;
        })();

        monkey.ExceptionAck = (function() {

            /**
             * Properties of an ExceptionAck.
             * @typedef {Object} oceanchat.monkey.ExceptionAck.$Properties
             * @property {number|null} [errorCode] ExceptionAck errorCode
             * @property {string|null} [message] ExceptionAck message
             * @property {string|null} [timestamp] ExceptionAck timestamp
             * @property {Array.<number>|null} [serverSupportedVersions] ExceptionAck serverSupportedVersions
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an ExceptionAck.
             * @memberof oceanchat.monkey
             * @interface IExceptionAck
             * @augments oceanchat.monkey.ExceptionAck.$Properties
             * @deprecated Use oceanchat.monkey.ExceptionAck.$Properties instead.
             */

            /**
             * Shape of an ExceptionAck.
             * @typedef {oceanchat.monkey.ExceptionAck.$Properties} oceanchat.monkey.ExceptionAck.$Shape
             */

            /**
             * Constructs a new ExceptionAck.
             * @memberof oceanchat.monkey
             * @classdesc Represents an ExceptionAck.
             * @constructor
             * @param {oceanchat.monkey.ExceptionAck.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function ExceptionAck(properties) {
                this.serverSupportedVersions = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExceptionAck errorCode.
             * @member {number} errorCode
             * @memberof oceanchat.monkey.ExceptionAck
             * @instance
             */
            ExceptionAck.prototype.errorCode = 0;

            /**
             * ExceptionAck message.
             * @member {string} message
             * @memberof oceanchat.monkey.ExceptionAck
             * @instance
             */
            ExceptionAck.prototype.message = "";

            /**
             * ExceptionAck timestamp.
             * @member {string} timestamp
             * @memberof oceanchat.monkey.ExceptionAck
             * @instance
             */
            ExceptionAck.prototype.timestamp = "";

            /**
             * ExceptionAck serverSupportedVersions.
             * @member {Array.<number>} serverSupportedVersions
             * @memberof oceanchat.monkey.ExceptionAck
             * @instance
             */
            ExceptionAck.prototype.serverSupportedVersions = $util.emptyArray;

            /**
             * Creates a new ExceptionAck instance using the specified properties.
             * @function create
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {oceanchat.monkey.ExceptionAck.$Properties=} [properties] Properties to set
             * @returns {oceanchat.monkey.ExceptionAck} ExceptionAck instance
             * @type {{
             *   (properties: oceanchat.monkey.ExceptionAck.$Shape): oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape;
             *   (properties?: oceanchat.monkey.ExceptionAck.$Properties): oceanchat.monkey.ExceptionAck;
             * }}
             */
            ExceptionAck.create = function create(properties) {
                return new ExceptionAck(properties);
            };

            /**
             * Encodes the specified ExceptionAck message. Does not implicitly {@link oceanchat.monkey.ExceptionAck.verify|verify} messages.
             * @function encode
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {oceanchat.monkey.ExceptionAck.$Properties} message ExceptionAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExceptionAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.errorCode != null && Object.hasOwnProperty.call(message, "errorCode"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.errorCode);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.timestamp);
                if (message.serverSupportedVersions != null && message.serverSupportedVersions.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (let i = 0; i < message.serverSupportedVersions.length; ++i)
                        writer.int32(message.serverSupportedVersions[i]);
                    writer.ldelim();
                }
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ExceptionAck message, length delimited. Does not implicitly {@link oceanchat.monkey.ExceptionAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {oceanchat.monkey.ExceptionAck.$Properties} message ExceptionAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExceptionAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExceptionAck message from the specified reader or buffer.
             * @function decode
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape} ExceptionAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExceptionAck.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.oceanchat.monkey.ExceptionAck(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.errorCode = value;
                            else
                                delete message.errorCode;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.message = value;
                            else
                                delete message.message;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.string()).length)
                                message.timestamp = value;
                            else
                                delete message.timestamp;
                            continue;
                        }
                    case 4: {
                            if (wireType === 2) {
                                if (!(message.serverSupportedVersions && message.serverSupportedVersions.length))
                                    message.serverSupportedVersions = [];
                                let end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.serverSupportedVersions.push(reader.int32());
                                continue;
                            }
                            if (wireType !== 0)
                                break;
                            if (!(message.serverSupportedVersions && message.serverSupportedVersions.length))
                                message.serverSupportedVersions = [];
                            message.serverSupportedVersions.push(reader.int32());
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            /**
             * Decodes an ExceptionAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape} ExceptionAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExceptionAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExceptionAck message.
             * @function verify
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExceptionAck.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    if (!$util.isInteger(message.errorCode))
                        return "errorCode: integer expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isString(message.timestamp))
                        return "timestamp: string expected";
                if (message.serverSupportedVersions != null && message.hasOwnProperty("serverSupportedVersions")) {
                    if (!Array.isArray(message.serverSupportedVersions))
                        return "serverSupportedVersions: array expected";
                    for (let i = 0; i < message.serverSupportedVersions.length; ++i)
                        if (!$util.isInteger(message.serverSupportedVersions[i]))
                            return "serverSupportedVersions: integer[] expected";
                }
                return null;
            };

            /**
             * Creates an ExceptionAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {oceanchat.monkey.ExceptionAck} ExceptionAck
             */
            ExceptionAck.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.oceanchat.monkey.ExceptionAck)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.oceanchat.monkey.ExceptionAck();
                if (object.errorCode != null)
                    if (Number(object.errorCode) !== 0)
                        message.errorCode = object.errorCode | 0;
                if (object.message != null)
                    if (typeof object.message !== "string" || object.message.length)
                        message.message = String(object.message);
                if (object.timestamp != null)
                    if (typeof object.timestamp !== "string" || object.timestamp.length)
                        message.timestamp = String(object.timestamp);
                if (object.serverSupportedVersions) {
                    if (!Array.isArray(object.serverSupportedVersions))
                        throw TypeError(".oceanchat.monkey.ExceptionAck.serverSupportedVersions: array expected");
                    message.serverSupportedVersions = Array(object.serverSupportedVersions.length);
                    for (let i = 0; i < object.serverSupportedVersions.length; ++i)
                        message.serverSupportedVersions[i] = object.serverSupportedVersions[i] | 0;
                }
                return message;
            };

            /**
             * Creates a plain object from an ExceptionAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {oceanchat.monkey.ExceptionAck} message ExceptionAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExceptionAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.serverSupportedVersions = [];
                if (options.defaults) {
                    object.errorCode = 0;
                    object.message = "";
                    object.timestamp = "";
                }
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    object.errorCode = message.errorCode;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = message.timestamp;
                if (message.serverSupportedVersions && message.serverSupportedVersions.length) {
                    object.serverSupportedVersions = Array(message.serverSupportedVersions.length);
                    for (let j = 0; j < message.serverSupportedVersions.length; ++j)
                        object.serverSupportedVersions[j] = message.serverSupportedVersions[j];
                }
                return object;
            };

            /**
             * Converts this ExceptionAck to JSON.
             * @function toJSON
             * @memberof oceanchat.monkey.ExceptionAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExceptionAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ExceptionAck
             * @function getTypeUrl
             * @memberof oceanchat.monkey.ExceptionAck
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ExceptionAck.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/oceanchat.monkey.ExceptionAck";
            };

            return ExceptionAck;
        })();

        return monkey;
    })();

    return oceanchat;
})();

export {
  $root as default
};
