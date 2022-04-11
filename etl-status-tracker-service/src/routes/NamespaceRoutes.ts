import { body } from "express-validator";
import { NamespaceController } from "../controllers/NamespaceController";
import { Routes } from "../routes";

/**
 * NamespaceInfo
 * @typedef {object} NamespaceInfo
 * @property {string} namespace.required - The namespace name
 */
export const NamespaceRoutes: Routes = {
  controller: NamespaceController,
  routes: [
    /**
   * POST /namespaces
   * @tags NamespaceInfo
   * @summary Creates a new live data namespace
   * @param {NamespaceInfo} request.body.required - NamespaceInfo
   * @return {object} 200 - Created namespace
   * @security BearerAuth
   */
    {
      method: "post",
      route: "/namespaces",
      action: "createNamespace",
      middleware: [],
      validations: [
        body('namespace').exists().not().isEmpty(),
      ],
    },
  ]
}