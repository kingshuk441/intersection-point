const turf = require("@turf/turf");
const fs = require("fs");
exports.findIntersectingPoints = (req, res) => {
  let allReceivedPoints = req.body.coordinates;
  console.log("coordinates from request body: ", allReceivedPoints);
  const receivedLineString = turf.lineString(allReceivedPoints);
  console.log(receivedLineString);
  console.log("Converted body into Line String: ", receivedLineString);
  let intersectionPoints = [];
  try {
    let sampleFileData = fs.readFileSync("lines.json");
    sampleFileData = JSON.parse(sampleFileData);
    console.log("Data from static lineString file: ", sampleFileData);
    let sampleDataLineStrings = [];
    sampleFileData.forEach((item) => {
      sampleDataLineStrings.push(turf.lineString(item.line.coordinates));
    });
    console.log(
      "Converted each static object into Line String: ",
      sampleDataLineStrings
    );
    sampleDataLineStrings.forEach((item, index) => {
      let intersectingLine = turf.lineIntersect(receivedLineString, item);
      const id = "L" + index;
      console.log(
        "Checking intersection pt: for id: " +
          id +
          " -> " +
          intersectingLine.features[0]
      );
      if (intersectingLine.features.length > 0) {
        intersectionPoints = [
          ...intersectionPoints,
          {
            id: id,
            points: intersectingLine.features[0].geometry.coordinates,
            message: "Intersection points fetched successfully!",
          },
        ];
      }
    });
    console.log("All intersection pts: ", intersectionPoints);
  } catch (error) {
    console.log("Error while reading file: ", error);
  }
  if (intersectionPoints.length > 0) res.status(200).send(intersectionPoints);
  else
    res
      .status(200)
      .send([{ points: [], message: "No intersection point found!" }]);
};
