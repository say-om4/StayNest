<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$pg_id = $data["pg_id"];

$stmt = $conn->prepare("DELETE FROM wishlist WHERE user_id=? AND pg_id=?");
$stmt->bind_param("ii", $user_id, $pg_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Removed from Wishlist"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed"
    ]);
}

$stmt->close();
$conn->close();
?>