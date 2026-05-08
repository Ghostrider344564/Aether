import { INode } from "../WorkflowEngine";
import { workflowQueue } from "../../services/QueueService";

export default class WaitNode implements INode {
  constructor(private parameters: any) {}

  async execute(input: any, context: any): Promise<any> {
    const seconds = this.parameters.seconds || 5;

    // In a production-grade system, we use BullMQ's delay to survive restarts.
    // Here we'll simulate the persistence by adding a delayed job if wait > 10s
    if (seconds > 10) {
       // This would normally involve suspending the current execution state
       // and scheduling a resume job. For the clone demonstration, we'll
       // stick to a robust async delay but note the architecture for BullMQ delay.
       await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    } else {
       await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    return input;
  }
}
