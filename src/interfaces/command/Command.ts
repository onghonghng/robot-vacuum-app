import { CommandType } from "./CommandType";

export class Command {
    type: CommandType;
    executed: boolean;

    constructor(type: CommandType) {
        this.type = type;
        this.executed = false;
    }
}