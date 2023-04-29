import { Command } from "./Command";
import { CommandType } from "./CommandType";

export class MoveCommand extends Command {
    constructor() {
        super(CommandType.MOVE);
    }
}