<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

$sql = "SELECT * FROM pgs ORDER BY id DESC";

$result = $conn->query($sql);

$pgs = [];

while ($row = $result->fetch_assoc()) {
    $pgs[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $pgs
]);

$conn->close();

?>