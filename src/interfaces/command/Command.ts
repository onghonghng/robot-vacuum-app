import { CommandType } from "./CommandType";

export class Command {
    type: CommandType

    constructor(type: CommandType) {
        this.type = type;
    }
}