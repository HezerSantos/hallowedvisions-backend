import { body } from "express-validator";

export const validateWorkExperienceBody = [
  body("workExperienceItem")
    .exists({ values: "null" })
    .withMessage("workExperienceItem is required")
    .isObject()
    .withMessage("workExperienceItem must be an object"),

  body("workExperienceItem.name")
    .exists({ values: "null" })
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .notEmpty()
    .withMessage("name cannot be empty"),

  body("workExperienceItem.imageKey")
    .exists({ values: "null" })
    .withMessage("imageKey is required")
    .isString()
    .withMessage("imageKey must be a string")
    .trim()
    .notEmpty()
    .withMessage("imageKey cannot be empty"),

  body("workExperienceItem.workExperienceItemEntries")
    .exists({ values: "null" })
    .withMessage("workExperienceItemEntries is required")
    .isArray({ min: 1 })
    .withMessage("workExperienceItemEntries must be a non-empty array"),

  body("workExperienceItem.workExperienceItemEntries.*.position")
    .exists({ values: "null" })
    .withMessage("position is required")
    .isString()
    .withMessage("position must be a string")
    .trim()
    .notEmpty()
    .withMessage("position cannot be empty"),

  body("workExperienceItem.workExperienceItemEntries.*.type")
    .exists({ values: "null" })
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string")
    .trim()
    .notEmpty()
    .withMessage("type cannot be empty"),

  body("workExperienceItem.workExperienceItemEntries.*.location")
    .exists({ values: "null" })
    .withMessage("location is required")
    .isString()
    .withMessage("location cannot be empty")
    .trim()
    .notEmpty()
    .withMessage("location cannot be empty"),

  body("workExperienceItem.workExperienceItemEntries.*.remote")
    .exists({ values: "null" })
    .withMessage("remote is required")
    .isBoolean({ strict: true })
    .withMessage("remote must be a boolean"),

  body("workExperienceItem.workExperienceItemEntries.*.startPeriod")
    .exists({ values: "null" })
    .withMessage("startPeriod is required")
    .isInt({ min: 0 })
    .withMessage("startPeriod must be a non-negative integer"),

  body("workExperienceItem.workExperienceItemEntries.*.endPeriod")
    .exists()
    .withMessage("endPeriod is required")
    .custom(
      (value) =>
        value === null ||
        (typeof value === "number" && Number.isInteger(value) && value >= 0),
    )
    .withMessage("endPeriod must be a non-negative integer or null"),

  body("workExperienceItem.workExperienceItemEntries.*.orderNumber")
    .exists({ values: "null" })
    .withMessage("orderNumber is required")
    .isInt({ min: 0 })
    .withMessage("orderNumber must be a 0-indexed non-negative integer"),

  body("workExperienceItem.workExperienceItemEntries.*.bullets")
    .exists({ values: "null" })
    .withMessage("bullets is required")
    .isArray({ min: 1 })
    .withMessage("bullets must be a non-empty array"),

  body("workExperienceItem.workExperienceItemEntries.*.bullets.*.text")
    .exists({ values: "null" })
    .withMessage("bullet text is required")
    .isString()
    .withMessage("bullet text must be a string")
    .trim()
    .notEmpty()
    .withMessage("bullet text cannot be empty"),

  body("workExperienceItem.workExperienceItemEntries.*.bullets.*.order")
    .exists({ values: "null" })
    .withMessage("bullet order is required")
    .isInt({ min: 0 })
    .withMessage("bullet order must be a 0-indexed non-negative integer"),
];

export default validateWorkExperienceBody;
