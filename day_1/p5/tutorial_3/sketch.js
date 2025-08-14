// A demonstration polar drawing!
// Set up some basics that we will re-use to orient the drawing
const WIDTH = 400;
const HEIGHT = 400;

let table;

function preload() {
  // Load our data!
  table = loadTable("example_data.csv", "csv", "header");
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);

  // Use angles to skip some math
  angleMode(DEGREES);
}

function draw() {

  // Move the coordinate system to the middle of the canvas
  translate(WIDTH / 2, HEIGHT / 2);
  
  // Rotate to start at the top
  rotate(180);

  // Draw the background grid
  noFill();
  stroke(100, 100, 100);
  circle(0, 0, 100);
  circle(0, 0, 200);
  circle(0, 0, 300);
  line(0, -HEIGHT / 2, 0, HEIGHT / 2);
  line(-WIDTH / 2, 0, WIDTH / 2, 0);
  
  rotation_angle = frameCount % 360

  // Iterate over our data
  for (i = 0; i < table.getRowCount(); i++) {
    // Get the row and table
    let table_row = table.getRow(i);
    let img_altitude = table_row.getNum("altitude");
    let img_latitude = table_row.getNum("latitude");
    let img_longitude = table_row.getNum("longitude");
    let color_code = table_row.getString("color_9");

    // Use the data to drive our drawing!
    let max_rotation_angle = map(img_latitude, 20, 40, 0, 360);
    let offset_from_center = map(img_altitude, -10, 100, 50, 250);
    let circle_radius = map(img_longitude, -100, 200, 10, 50);
    
    if (rotation_angle <= max_rotation_angle) {
    // Start drawing with a specific set of styles
    push();
    rotate(rotation_angle);

    fill(color_code + '05');
    noStroke();
    circle(0, offset_from_center, circle_radius);

    pop();
    }
  }
}
