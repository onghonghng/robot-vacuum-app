import { Command } from "./Command";
import { Position } from "../position/Position"
import { Direction } from "../direction/Direction";
import { CommandType } from "./CommandType";

export class PlaceCommand extends Command {
    position: Position;
    direction: Direction;

    constructor(position: Position, direction: Direction) {
        super(CommandType.PLACE);
        this.position = position;
        this.direction = direction;
    }
}