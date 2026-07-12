<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

$user_id = $_GET["user_id"];

$stmt = $conn->prepare("
SELECT p.*
FROM wishlist w
INNER JOIN pgs p ON w.pg_id = p.id
WHERE w.user_id=?
ORDER BY w.id DESC
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