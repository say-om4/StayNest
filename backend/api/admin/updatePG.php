<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
UPDATE pgs SET
name=?,
city=?,
address=?,
price=?,
rating=?,
room_type=?,
gender=?,
food=?,
wifi=?,
bathroom=?,
parking=?,
power_backup=?,
image=?,
description=?
WHERE id=?
");

$stmt->bind_param(
    "sssddssiisiissi",
    $data["name"],
    $data["city"],
    $data["address"],
    $data["price"],
    $data["rating"],
    $data["room_type"],
    $data["gender"],
    $data["food"],
    $data["wifi"],
    $data["bathroom"],
    $data["parking"],
    $data["power_backup"],
    $data["image"],
    $data["description"],
    $data["id"]
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "PG Updated Successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Update Failed"
    ]);
}

$stmt->close();
$conn->close();
?>