import { Command } from "./Command";
import { CommandType } from "./CommandType";

export class ReportCommand extends Command {
    constructor() {
        super(CommandType.REPORT);
    }
}