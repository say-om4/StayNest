<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"]);

$stmt = $conn->prepare("DELETE FROM pgs WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "PG Deleted Successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Delete Failed"
    ]);
}

$stmt->close();
$conn->close();

?>