import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class updateTaskDto {
    
    @IsEnum(TaskStatus)
    status:TaskStatus;

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;
}