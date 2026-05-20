import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace oceanchat. */
export namespace oceanchat {

    /** Namespace monkey. */
    namespace monkey {

        /**
         * Properties of a MsgUp.
         * @deprecated Use oceanchat.monkey.MsgUp.$Properties instead.
         */
        interface IMsgUp extends oceanchat.monkey.MsgUp.$Properties {
        }

        /** Represents a MsgUp. */
        class MsgUp {

            /**
             * Constructs a new MsgUp.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.MsgUp.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** MsgUp clientMsgId. */
            clientMsgId: string;

            /** MsgUp groupId. */
            groupId: string;

            /** MsgUp msgType. */
            msgType: oceanchat.monkey.MsgUp.MsgType;

            /** MsgUp content. */
            content: string;

            /** MsgUp url. */
            url: string;

            /** MsgUp width. */
            width: number;

            /** MsgUp height. */
            height: number;

            /** MsgUp size. */
            size: (number|Long);

            /** MsgUp format. */
            format: string;

            /** MsgUp duration. */
            duration: number;

            /** MsgUp fileName. */
            fileName: string;

            /** MsgUp extension. */
            extension: string;

            /** MsgUp thumbnailUrl. */
            thumbnailUrl: string;

            /**
             * Creates a new MsgUp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MsgUp instance
             */
            static create(properties: oceanchat.monkey.MsgUp.$Shape): oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape;
            static create(properties?: oceanchat.monkey.MsgUp.$Properties): oceanchat.monkey.MsgUp;

            /**
             * Encodes the specified MsgUp message. Does not implicitly {@link oceanchat.monkey.MsgUp.verify|verify} messages.
             * @param message MsgUp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.MsgUp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgUp message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgUp.verify|verify} messages.
             * @param message MsgUp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.MsgUp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgUp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape} MsgUp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape;

            /**
             * Decodes a MsgUp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape} MsgUp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.MsgUp & oceanchat.monkey.MsgUp.$Shape;

            /**
             * Verifies a MsgUp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgUp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgUp
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.MsgUp;

            /**
             * Creates a plain object from a MsgUp message. Also converts values to other types if specified.
             * @param message MsgUp
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.MsgUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgUp to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for MsgUp
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace MsgUp {

            /** Properties of a MsgUp. */
            interface $Properties {

                /** MsgUp clientMsgId */
                clientMsgId?: (string|null);

                /** MsgUp groupId */
                groupId?: (string|null);

                /** MsgUp msgType */
                msgType?: (oceanchat.monkey.MsgUp.MsgType|null);

                /** MsgUp content */
                content?: (string|null);

                /** MsgUp url */
                url?: (string|null);

                /** MsgUp width */
                width?: (number|null);

                /** MsgUp height */
                height?: (number|null);

                /** MsgUp size */
                size?: (number|Long|null);

                /** MsgUp format */
                format?: (string|null);

                /** MsgUp duration */
                duration?: (number|null);

                /** MsgUp fileName */
                fileName?: (string|null);

                /** MsgUp extension */
                extension?: (string|null);

                /** MsgUp thumbnailUrl */
                thumbnailUrl?: (string|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MsgUp. */
            type $Shape = oceanchat.monkey.MsgUp.$Properties;

            /** MsgType enum. */
            enum MsgType {

                /** TEXT value */
                TEXT = 0,

                /** IMAGE value */
                IMAGE = 1,

                /** AUDIO value */
                AUDIO = 2,

                /** FILE value */
                FILE = 3
            }
        }

        /**
         * Properties of a MsgUpAck.
         * @deprecated Use oceanchat.monkey.MsgUpAck.$Properties instead.
         */
        interface IMsgUpAck extends oceanchat.monkey.MsgUpAck.$Properties {
        }

        /** Represents a MsgUpAck. */
        class MsgUpAck {

            /**
             * Constructs a new MsgUpAck.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.MsgUpAck.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** MsgUpAck clientMsgId. */
            clientMsgId: string;

            /** MsgUpAck syncSeqId. */
            syncSeqId: (number|Long);

            /** MsgUpAck success. */
            success: boolean;

            /** MsgUpAck errorMessage. */
            errorMessage: string;

            /** MsgUpAck serverTimestamp. */
            serverTimestamp: (number|Long);

            /**
             * Creates a new MsgUpAck instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MsgUpAck instance
             */
            static create(properties: oceanchat.monkey.MsgUpAck.$Shape): oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape;
            static create(properties?: oceanchat.monkey.MsgUpAck.$Properties): oceanchat.monkey.MsgUpAck;

            /**
             * Encodes the specified MsgUpAck message. Does not implicitly {@link oceanchat.monkey.MsgUpAck.verify|verify} messages.
             * @param message MsgUpAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.MsgUpAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgUpAck message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgUpAck.verify|verify} messages.
             * @param message MsgUpAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.MsgUpAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgUpAck message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape} MsgUpAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape;

            /**
             * Decodes a MsgUpAck message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape} MsgUpAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.MsgUpAck & oceanchat.monkey.MsgUpAck.$Shape;

            /**
             * Verifies a MsgUpAck message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgUpAck message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgUpAck
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.MsgUpAck;

            /**
             * Creates a plain object from a MsgUpAck message. Also converts values to other types if specified.
             * @param message MsgUpAck
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.MsgUpAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgUpAck to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for MsgUpAck
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace MsgUpAck {

            /** Properties of a MsgUpAck. */
            interface $Properties {

                /** MsgUpAck clientMsgId */
                clientMsgId?: (string|null);

                /** MsgUpAck syncSeqId */
                syncSeqId?: (number|Long|null);

                /** MsgUpAck success */
                success?: (boolean|null);

                /** MsgUpAck errorMessage */
                errorMessage?: (string|null);

                /** MsgUpAck serverTimestamp */
                serverTimestamp?: (number|Long|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MsgUpAck. */
            type $Shape = oceanchat.monkey.MsgUpAck.$Properties;
        }

        /**
         * Properties of a MsgNotify.
         * @deprecated Use oceanchat.monkey.MsgNotify.$Properties instead.
         */
        interface IMsgNotify extends oceanchat.monkey.MsgNotify.$Properties {
        }

        /** Represents a MsgNotify. */
        class MsgNotify {

            /**
             * Constructs a new MsgNotify.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.MsgNotify.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** MsgNotify groupId. */
            groupId: string;

            /** MsgNotify syncSeqId. */
            syncSeqId: (number|Long);

            /**
             * Creates a new MsgNotify instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MsgNotify instance
             */
            static create(properties: oceanchat.monkey.MsgNotify.$Shape): oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape;
            static create(properties?: oceanchat.monkey.MsgNotify.$Properties): oceanchat.monkey.MsgNotify;

            /**
             * Encodes the specified MsgNotify message. Does not implicitly {@link oceanchat.monkey.MsgNotify.verify|verify} messages.
             * @param message MsgNotify message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.MsgNotify.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MsgNotify message, length delimited. Does not implicitly {@link oceanchat.monkey.MsgNotify.verify|verify} messages.
             * @param message MsgNotify message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.MsgNotify.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgNotify message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape} MsgNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape;

            /**
             * Decodes a MsgNotify message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape} MsgNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.MsgNotify & oceanchat.monkey.MsgNotify.$Shape;

            /**
             * Verifies a MsgNotify message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MsgNotify message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MsgNotify
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.MsgNotify;

            /**
             * Creates a plain object from a MsgNotify message. Also converts values to other types if specified.
             * @param message MsgNotify
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.MsgNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MsgNotify to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for MsgNotify
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace MsgNotify {

            /** Properties of a MsgNotify. */
            interface $Properties {

                /** MsgNotify groupId */
                groupId?: (string|null);

                /** MsgNotify syncSeqId */
                syncSeqId?: (number|Long|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a MsgNotify. */
            type $Shape = oceanchat.monkey.MsgNotify.$Properties;
        }

        /**
         * Properties of an AuthReq.
         * @deprecated Use oceanchat.monkey.AuthReq.$Properties instead.
         */
        interface IAuthReq extends oceanchat.monkey.AuthReq.$Properties {
        }

        /** Represents an AuthReq. */
        class AuthReq {

            /**
             * Constructs a new AuthReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.AuthReq.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** AuthReq deviceType. */
            deviceType: string;

            /** AuthReq deviceId. */
            deviceId: string;

            /** AuthReq jwt. */
            jwt: string;

            /** AuthReq supportedVersions. */
            supportedVersions: number[];

            /**
             * Creates a new AuthReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthReq instance
             */
            static create(properties: oceanchat.monkey.AuthReq.$Shape): oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape;
            static create(properties?: oceanchat.monkey.AuthReq.$Properties): oceanchat.monkey.AuthReq;

            /**
             * Encodes the specified AuthReq message. Does not implicitly {@link oceanchat.monkey.AuthReq.verify|verify} messages.
             * @param message AuthReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.AuthReq.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AuthReq message, length delimited. Does not implicitly {@link oceanchat.monkey.AuthReq.verify|verify} messages.
             * @param message AuthReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.AuthReq.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AuthReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape} AuthReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape;

            /**
             * Decodes an AuthReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape} AuthReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.AuthReq & oceanchat.monkey.AuthReq.$Shape;

            /**
             * Verifies an AuthReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AuthReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthReq
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.AuthReq;

            /**
             * Creates a plain object from an AuthReq message. Also converts values to other types if specified.
             * @param message AuthReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.AuthReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AuthReq to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for AuthReq
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace AuthReq {

            /** Properties of an AuthReq. */
            interface $Properties {

                /** AuthReq deviceType */
                deviceType?: (string|null);

                /** AuthReq deviceId */
                deviceId?: (string|null);

                /** AuthReq jwt */
                jwt?: (string|null);

                /** AuthReq supportedVersions */
                supportedVersions?: (number[]|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AuthReq. */
            type $Shape = oceanchat.monkey.AuthReq.$Properties;
        }

        /**
         * Properties of an AuthAck.
         * @deprecated Use oceanchat.monkey.AuthAck.$Properties instead.
         */
        interface IAuthAck extends oceanchat.monkey.AuthAck.$Properties {
        }

        /** Represents an AuthAck. */
        class AuthAck {

            /**
             * Constructs a new AuthAck.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.AuthAck.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** AuthAck userId. */
            userId: string;

            /**
             * Creates a new AuthAck instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthAck instance
             */
            static create(properties: oceanchat.monkey.AuthAck.$Shape): oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape;
            static create(properties?: oceanchat.monkey.AuthAck.$Properties): oceanchat.monkey.AuthAck;

            /**
             * Encodes the specified AuthAck message. Does not implicitly {@link oceanchat.monkey.AuthAck.verify|verify} messages.
             * @param message AuthAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.AuthAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AuthAck message, length delimited. Does not implicitly {@link oceanchat.monkey.AuthAck.verify|verify} messages.
             * @param message AuthAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.AuthAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AuthAck message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape} AuthAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape;

            /**
             * Decodes an AuthAck message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape} AuthAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.AuthAck & oceanchat.monkey.AuthAck.$Shape;

            /**
             * Verifies an AuthAck message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AuthAck message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthAck
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.AuthAck;

            /**
             * Creates a plain object from an AuthAck message. Also converts values to other types if specified.
             * @param message AuthAck
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.AuthAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AuthAck to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for AuthAck
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace AuthAck {

            /** Properties of an AuthAck. */
            interface $Properties {

                /** AuthAck userId */
                userId?: (string|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an AuthAck. */
            type $Shape = oceanchat.monkey.AuthAck.$Properties;
        }

        /**
         * Properties of a ReadReceipt.
         * @deprecated Use oceanchat.monkey.ReadReceipt.$Properties instead.
         */
        interface IReadReceipt extends oceanchat.monkey.ReadReceipt.$Properties {
        }

        /** Represents a ReadReceipt. */
        class ReadReceipt {

            /**
             * Constructs a new ReadReceipt.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.ReadReceipt.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** ReadReceipt groupId. */
            groupId: string;

            /** ReadReceipt syncSeqId. */
            syncSeqId: (number|Long);

            /**
             * Creates a new ReadReceipt instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ReadReceipt instance
             */
            static create(properties: oceanchat.monkey.ReadReceipt.$Shape): oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape;
            static create(properties?: oceanchat.monkey.ReadReceipt.$Properties): oceanchat.monkey.ReadReceipt;

            /**
             * Encodes the specified ReadReceipt message. Does not implicitly {@link oceanchat.monkey.ReadReceipt.verify|verify} messages.
             * @param message ReadReceipt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.ReadReceipt.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ReadReceipt message, length delimited. Does not implicitly {@link oceanchat.monkey.ReadReceipt.verify|verify} messages.
             * @param message ReadReceipt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.ReadReceipt.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ReadReceipt message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape} ReadReceipt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape;

            /**
             * Decodes a ReadReceipt message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape} ReadReceipt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.ReadReceipt & oceanchat.monkey.ReadReceipt.$Shape;

            /**
             * Verifies a ReadReceipt message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ReadReceipt message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ReadReceipt
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.ReadReceipt;

            /**
             * Creates a plain object from a ReadReceipt message. Also converts values to other types if specified.
             * @param message ReadReceipt
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.ReadReceipt, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ReadReceipt to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for ReadReceipt
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ReadReceipt {

            /** Properties of a ReadReceipt. */
            interface $Properties {

                /** ReadReceipt groupId */
                groupId?: (string|null);

                /** ReadReceipt syncSeqId */
                syncSeqId?: (number|Long|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ReadReceipt. */
            type $Shape = oceanchat.monkey.ReadReceipt.$Properties;
        }

        /**
         * Properties of an ExceptionAck.
         * @deprecated Use oceanchat.monkey.ExceptionAck.$Properties instead.
         */
        interface IExceptionAck extends oceanchat.monkey.ExceptionAck.$Properties {
        }

        /** Represents an ExceptionAck. */
        class ExceptionAck {

            /**
             * Constructs a new ExceptionAck.
             * @param [properties] Properties to set
             */
            constructor(properties?: oceanchat.monkey.ExceptionAck.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** ExceptionAck errorCode. */
            errorCode: number;

            /** ExceptionAck message. */
            message: string;

            /** ExceptionAck timestamp. */
            timestamp: string;

            /** ExceptionAck serverSupportedVersions. */
            serverSupportedVersions: number[];

            /**
             * Creates a new ExceptionAck instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExceptionAck instance
             */
            static create(properties: oceanchat.monkey.ExceptionAck.$Shape): oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape;
            static create(properties?: oceanchat.monkey.ExceptionAck.$Properties): oceanchat.monkey.ExceptionAck;

            /**
             * Encodes the specified ExceptionAck message. Does not implicitly {@link oceanchat.monkey.ExceptionAck.verify|verify} messages.
             * @param message ExceptionAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: oceanchat.monkey.ExceptionAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExceptionAck message, length delimited. Does not implicitly {@link oceanchat.monkey.ExceptionAck.verify|verify} messages.
             * @param message ExceptionAck message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: oceanchat.monkey.ExceptionAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExceptionAck message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape} ExceptionAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape;

            /**
             * Decodes an ExceptionAck message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape} ExceptionAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): oceanchat.monkey.ExceptionAck & oceanchat.monkey.ExceptionAck.$Shape;

            /**
             * Verifies an ExceptionAck message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExceptionAck message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExceptionAck
             */
            static fromObject(object: { [k: string]: any }): oceanchat.monkey.ExceptionAck;

            /**
             * Creates a plain object from an ExceptionAck message. Also converts values to other types if specified.
             * @param message ExceptionAck
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: oceanchat.monkey.ExceptionAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExceptionAck to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for ExceptionAck
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExceptionAck {

            /** Properties of an ExceptionAck. */
            interface $Properties {

                /** ExceptionAck errorCode */
                errorCode?: (number|null);

                /** ExceptionAck message */
                message?: (string|null);

                /** ExceptionAck timestamp */
                timestamp?: (string|null);

                /** ExceptionAck serverSupportedVersions */
                serverSupportedVersions?: (number[]|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an ExceptionAck. */
            type $Shape = oceanchat.monkey.ExceptionAck.$Properties;
        }
    }
}
