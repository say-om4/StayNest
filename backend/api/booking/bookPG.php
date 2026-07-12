<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);
    exit;
}

$user_id = intval($data["user_id"]);
$pg_id = intval($data["pg_id"]);

$check = $conn->prepare("SELECT id FROM bookings WHERE user_id=? AND pg_id=?");
$check->bind_param("ii", $user_id, $pg_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "You have already booked this PG"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO bookings(user_id, pg_id) VALUES(?, ?)");
$stmt->bind_param("ii", $user_id, $pg_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Booking Successful"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Booking Failed"
    ]);
}

$stmt->close();
$conn->close();

?>