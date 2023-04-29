import { Command } from "./Command";
import { CommandType } from "./CommandType";

export class LeftCommand extends Command {
    constructor() {
        super(CommandType.LEFT);
    }
}