
<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require "../../config/database.php";

$name = $_POST["name"];
$city = $_POST["city"];
$address = $_POST["address"];
$price = $_POST["price"];
$rating = $_POST["rating"];
$room_type = $_POST["room_type"];
$gender = $_POST["gender"];
$food = $_POST["food"];
$wifi = $_POST["wifi"];
$bathroom = $_POST["bathroom"];
$parking = $_POST["parking"];
$power_backup = $_POST["power_backup"];
$description = $_POST["description"];

/* Upload Image */

$imageName = time() . "_" . basename($_FILES["image"]["name"]);

$targetPath = "../../uploads/" . $imageName;

if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {

    echo json_encode([
        "success" => false,
        "message" => "Image Upload Failed"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO pgs
(name, city, address, price, rating, room_type, gender, food, wifi, bathroom, parking, power_backup, image, description)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

$stmt->bind_param(
    "sssddssiisiiss",
    $name,
    $city,
    $address,
    $price,
    $rating,
    $room_type,
    $gender,
    $food,
    $wifi,
    $bathroom,
    $parking,
    $power_backup,
    $imageName,
    $description
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "PG Added Successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Database Error"
    ]);

}

$stmt->close();
$conn->close();

?>

