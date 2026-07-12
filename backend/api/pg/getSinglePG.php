<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require "../../config/database.php";

if (!isset($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "PG ID is required"
    ]);
    exit;
}

$id = intval($_GET['id']);

$stmt = $conn->prepare("SELECT * FROM pgs WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $pg = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "data" => $pg
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "PG Not Found"
    ]);

}

$stmt->close();
$conn->close();

?>