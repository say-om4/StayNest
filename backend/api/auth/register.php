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

$full_name = trim($data["full_name"]);
$email = trim($data["email"]);
$phone = trim($data["phone"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$check = $conn->prepare("SELECT id FROM users WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email Already Exists"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users(full_name,email,phone,password) VALUES(?,?,?,?)");
$stmt->bind_param("ssss", $full_name, $email, $phone, $password);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Registration Successful"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Registration Failed"
    ]);

}

$stmt->close();
$conn->close();

?>