#[derive(Debug, PartialEq, PartialOrd)]
enum IpAddr {
    V4(String),
    V6(String),
}
fn main() {
    // 填空
    let v : Vec<IpAddr>= Vec::from([
        IpAddr::V4(String::from("127.0.0.1")),
        IpAddr::V6(String::from("::1")),
    ]);
    
    // 枚举的比较需要派生 PartialEq 特征
    assert_eq!(v[0], IpAddr::V4("127.0.0.1".to_string()));
    assert_eq!(v[1], IpAddr::V6("::1".to_string()));

    println!("Success!")
}
