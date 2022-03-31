use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    // 实现 fmt 方法
}

fn main() {
    let origin = Point { x: 0, y: 0 };
    // 填空
    assert_eq!(origin.__, "The point is (0, 0)");
    assert_eq!(format!(__), "The point is (0, 0)");

    println!("Success!")
}
