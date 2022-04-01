
// 使用两种方法来解决错误，不要新增代码行
// Sol 1
fn main() {
    let s =  "hello, world".to_string();
    let s1: String = s;
}
// Sol 1
fn main1() {
    let s =  "hello, world".clone();
    let s1: &str = s;
}
