
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
    // ！！！不同的类型为什么也是相同的，底层是啥？
    assert_eq!("yellow".to_string(), "yellow");

    println!("{:?}",c);
}
