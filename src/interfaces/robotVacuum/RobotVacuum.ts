import { Direction } from "../direction/Direction";
import { Position } from "../position/Position";

export interface RobotVacuum {
    position: Position,
    direction: Direction
}