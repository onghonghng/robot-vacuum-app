import { Command } from "./Command";
import { CommandType } from "./CommandType";

export class RightCommand extends Command {
    constructor() {
        super(CommandType.RIGHT);
    }
}