<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

if (!isset($_GET["user_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "User ID Required"
    ]);
    exit;
}

$user_id = intval($_GET["user_id"]);

$stmt = $conn->prepare("
SELECT
    bookings.id AS booking_id,
    bookings.booking_date,
    pgs.*
FROM bookings
INNER JOIN pgs
ON bookings.pg_id = pgs.id
WHERE bookings.user_id = ?
ORDER BY bookings.booking_date DESC
");

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $data
]);

$stmt->close();
$conn->close();

?>