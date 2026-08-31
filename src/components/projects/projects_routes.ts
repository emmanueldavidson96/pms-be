import { Express } from "express";
import { ProjectController } from "./projects_controller";

export class ProjectRoutes {
  private baseEndPoint = "/api/projects";
  constructor(app: Express) {
    const controller = new ProjectController();

    app
      .route(this.baseEndPoint)
      .get(controller.getAllProjectsHandler)
      .post(controller.addProjectHandler);

    app
      .route(this.baseEndPoint + "/:id")
      .get(controller.getDetailProjectHandler)
      .put(controller.updateProjectHandler)
      .delete(controller.deleteHandler);
  }
}
