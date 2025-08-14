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

  // Use angles to skip some math
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // Move the coordinate system to the middle of the canvas
  translate(WIDTH / 2, HEIGHT / 2);

  // Draw the background grid
  noFill();
  stroke(100, 100, 100);
  circle(0, 0, 100);
  circle(0, 0, 200);
  circle(0, 0, 300);
  line(0, -HEIGHT / 2, 0, HEIGHT / 2);
  line(-WIDTH / 2, 0, WIDTH / 2, 0);

  // Iterate over our data
  for (i = 0; i < table.getRowCount(); i++) {
    // Get the row and table
    let table_row = table.getRow(i);
    let img_altitude = table_row.getNum("altitude");
    let img_width = table_row.getNum("image_width");
    let img_height = table_row.getNum("image_height");
    let first_color = table_row.getString("color_1");

    // Use the data to drive our drawing!
    let rotation_angle = map(img_altitude, -10, 100, 0, 360);
    let offset_from_center = map(img_width, 0, 5000, 0, 250);
    let circle_radius = map(img_height, 0, 10000, 0, 200);

    // Start drawing with a specific set of styles
    push();
    rotate(rotation_angle);

    fill(first_color);
    stroke(255);
    circle(0, offset_from_center, circle_radius);

    pop();
  }
}
