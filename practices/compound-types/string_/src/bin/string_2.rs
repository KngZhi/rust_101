
// 使用至少两种方法来修复错误
// 1st Solution
fn main() {
    let s: Box<str> = "hello, world".into();
    greetings(&*s)
}

// 2nd Solution
fn main1() {
    let s: Box<&str> = "hello, world".into();
    greetings(*s)
}

fn greetings(s: &str) {
    println!("{}",s)
}
