import { Express } from "express";
import { TaskController } from "./tasks_controller";

export class TaskRoutes {
  private baseEndPoint = "/api/tasks";
  constructor(app: Express) {
    const controller = new TaskController();
    app
      .route(this.baseEndPoint)
      .get(controller.getAllTasksHandler)
      .post(controller.addTaskHandler);

    app
      .route(this.baseEndPoint + "/:id")
      .get(controller.getDetailsHandler)
      .put(controller.updateTaskHandler)
      .delete(controller.deleteTaskHandler);
  }
}
