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

$email = trim($data["email"]);
$password = $data["password"];

$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid Email"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user["password"])) {

    unset($user["password"]);

    echo json_encode([
        "success" => true,
        "message" => "Login Successful",
        "user" => $user
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Invalid Password"
    ]);
}

$stmt->close();
$conn->close();

?>