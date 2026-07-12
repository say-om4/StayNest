<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$pg_id = $data["pg_id"];

// Already exists?
$check = $conn->prepare("SELECT id FROM wishlist WHERE user_id=? AND pg_id=?");
$check->bind_param("ii", $user_id, $pg_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Already in Wishlist"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO wishlist(user_id, pg_id) VALUES(?,?)");
$stmt->bind_param("ii", $user_id, $pg_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Added to Wishlist"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed"
    ]);
}

$stmt->close();
$conn->close();