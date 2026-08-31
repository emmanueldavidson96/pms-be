import { Express } from "express";
import { CommentController } from "./comments_controller";

export class CommentRoutes {
  private baseEndPoint = "/api/comments";
  constructor(app: Express) {
    const controller = new CommentController();

    app
      .route(this.baseEndPoint)
      .get(controller.getAllCommentHandler)
      .post(controller.addCommentHandler);

    app
      .route(this.baseEndPoint + "/:id")
      .get(controller.getCommentDetailHandler)
      .put(controller.updateCommentHandler)
      .delete(controller.deleteCommentHandler);
  }
}
