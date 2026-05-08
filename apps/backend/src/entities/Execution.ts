import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Workflow } from "./Workflow";

@Entity()
export class Execution {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Workflow)
  workflow: Workflow;

  @Column({ default: "running" })
  status: string; // running, success, error, waiting

  @Column("jsonb", { nullable: true })
  data: any; // Input/Output data for each node

  @Column({ nullable: true })
  error: string;

  @Column({ type: "timestamp", nullable: true })
  startedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  finishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
