const Validator = require("jsonschema").Validator;
const v = new Validator();
const fs = require("fs");
exports.checkHeaders = (req, res, next) => {
  console.log("Checking Required Headers-------------");
  try {
    let authToken = req.headers.authtoken;
    console.log("Auth token: ", authToken);
    if (authToken) {
      //verification logic if any
      console.log("Auth token Found");
      next();
    } else {
      console.log("No Auth token Found");
      res
        .status(401)
        .json({ message: "Unauthorized. Required Headers missing" });
    }
  } catch (error) {
    console.log(error);
  }
};
const checkSchema = (object) => {
  const Validator = require("jsonschema").Validator;
  const v = new Validator();
  const objSchema = {
    type: "object",
    id: "/obj",
    properties: {
      type: { type: "string" },
      coordinates: { $ref: "/coordinates" },
    },
    required: ["type", "coordinates"],
  };

  const coordinatesSchema = {
    id: "/coordinates",
    type: "array",
    minItems: 2,
    items: { $ref: "/points" },
  };

  const pointsSchema = {
    id: "/points",
    type: "array",
    maxItems: 2,
    minItems: 2,
    items: [{ type: "number" }, { type: "number" }],
  };
  v.addSchema(coordinatesSchema, "/coordinates");
  v.addSchema(pointsSchema, "/points");
  return v.validate(object, objSchema).valid;
};
exports.validateSchema = (req, res, next) => {
  console.log("Validation of Schema----------------");
  const body = req.body;
  console.log("Body received: ", body);
  const bodySchemaCheck = checkSchema(body);
  try {
    let data = fs.readFileSync("lines.json");
    data = JSON.parse(data);
    console.log("Reading data(lineStrings) from file: ", data);
    let staticSchemaCheck = true;
    data.map((item) => {
      staticSchemaCheck = staticSchemaCheck && checkSchema(item.line);
    });
    console.log("static schema check: ", staticSchemaCheck);
    console.log("body schema check: ", bodySchemaCheck);
    if (staticSchemaCheck && bodySchemaCheck) {
      console.log("both Schema Validated");
      next();
    } else {
      console.log("Schema Not Validate");
      res.status(501).json({ message: "Schema Invalid" });
    }
  } catch (error) {
    console.log("Error while reading file: ", error);
  }
};
