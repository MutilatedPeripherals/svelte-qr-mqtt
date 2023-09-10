export class MqttPayload {
    private _message: string;
    private _timestamp: string;

    constructor(message: string) {
        this._message = message;
        this._timestamp = new Date().toISOString();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }

    static fromJson(json: { message: string, timestamp: string }): MqttPayload {
        const messageObj = new MqttPayload(json.message);
        messageObj._timestamp = json.timestamp; // Optionally set the timestamp from the JSON object
        return messageObj;
    }

    toJson(): { message: string; timestamp: string } {
        return {
            message: this._message,
            timestamp: this._timestamp,
        };
    }
}