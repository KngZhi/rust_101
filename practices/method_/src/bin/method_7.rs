#[derive(Debug)]
enum TrafficLightColor {
    Red,
    Yellow,
    Green,
}

// 为 TrafficLightColor 实现所需的方法
impl TrafficLightColor {
    fn color(&self) -> String {
        match *self {
            Self::Red => "red".to_string(),
            Self::Yellow => "yellow".to_string(),
            Self::Green => "green".to_string(),
        }
    }
}

fn main() {
    let c = TrafficLightColor::Yellow;

    assert_eq!(c.color(), "yellow");
    // XXX:String 和 &str 可以进行相等比较
    assert_eq!("yellow".to_string(), "yellow");
    // XXX: `==` 的实现原理也是通过 `partialEq` 嘛？
    assert!("yellow".to_string() == "yellow");
    if "yellow".to_string() == "yellow" {
        print!("hello world")
        "a".to_owned()
    }

    println!("{:?}", c);
}
