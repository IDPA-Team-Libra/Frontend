/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
/**
 * Chat message component.
 *
 * Multiple message types are available through a `type` property, such as
 * - text - simple text message
 * - file - could be a file preview or a file icon
 * if multiple files are provided grouped files are shown
 * - quote - quotes a message with specific quote styles
 * - map - shows a google map picture by provided [latitude] and [longitude] properties
 *
 * @stacked-example(Available Types, chat/chat-message-types-showcase.component)
 *
 * Message with attached files:
 * ```html
 * <nb-chat-message
 *   type="file"
 *   [files]="[ { url: '...' } ]"
 *   message="Hello world!">
 * </nb-chat-message>
 * ```
 *
 * Map message:
 * ```html
 * <nb-chat-message
 *   type="map"
 *   [latitude]="53.914"
 *   [longitude]="27.59"
 *   message="Here I am">
 * </nb-chat-message>
 * ```
 *
 * @styles
 *
 * chat-message-background:
 * chat-message-text-color:
 * chat-message-reply-background-color:
 * chat-message-reply-text-color:
 * chat-message-avatar-background-color:
 * chat-message-sender-text-color:
 * chat-message-quote-background-color:
 * chat-message-quote-text-color:
 * chat-message-file-text-color:
 * chat-message-file-background-color:
 */
export declare class NbChatMessageComponent {
    protected domSanitizer: DomSanitizer;
    readonly flyInOut: boolean;
    readonly notReply: boolean;
    avatarStyle: SafeStyle;
    /**
     * Determines if a message is a reply
     */
    reply: boolean;
    protected _reply: boolean;
    /**
     * Message sender
     * @type {string}
     */
    message: string;
    /**
     * Message sender
     * @type {string}
     */
    sender: string;
    /**
     * Message send date
     * @type {Date}
     */
    date: Date;
    /**
     * Array of files `{ url: 'file url', icon: 'file icon class' }`
     * @type {string}
     */
    files: {
        url: string;
        icon: string;
    }[];
    /**
     * Quoted message text
     * @type {string}
     */
    quote: string;
    /**
     * Map latitude
     * @type {number}
     */
    latitude: number;
    /**
     * Map longitude
     * @type {number}
     */
    longitude: number;
    /**
     * Message send avatar
     * @type {string}
     */
    avatar: string;
    /**
     * Message type, available options `text|file|map|quote`
     * @type {string}
     */
    type: string;
    constructor(domSanitizer: DomSanitizer);
    getInitials(): string;
}
