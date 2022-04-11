
/* 填空 */
fn main() {
    let v = 3.1415926;

    println!("{:.1$}", v, 4); // same as {:.4} => 3.1416 

    assert_eq!(format!("__", v), "3.14");
    assert_eq!(format!("__", v), "+3.14");
    assert_eq!(format!("__", v), "3");

    println!("Success!")
}
