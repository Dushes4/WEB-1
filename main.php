<?php

function checkSquare($x, $y, $r)
{
    return $x <= 0 && $y >= 0 && $x >= -$r && $y <= $r;
}
function checkTriangle($x, $y, $r)
{
    return $x >= 0 && $y <= 0 && 0.5 * $x - $r / 2 <= $y;
}
function checkCircle($x, $y, $r)
{
    return $x <= 0 && $y <= 0 && $x*$x + $y*$y < ($r/2) * ($r/2);
}
function checkArea($x, $y, $r)
{
    return checkTriangle($x, $y, $r) || checkSquare($x, $y, $r) || checkCircle($x, $y, $r);
}

$startTime = microtime(true);

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];
$inArea = checkArea($x, $y, $r);

$finishTime = (new DateTime()) -> format("Y-m-d H:i:s");
$scriptTime = (microtime(true) - $startTime);

echo json_encode(array(
    "x" => $x, "y" => $y, "r" => $r,
    "inArea" => $inArea,
    "finishTime" => $finishTime,
    "scriptTime" => $scriptTime
));

