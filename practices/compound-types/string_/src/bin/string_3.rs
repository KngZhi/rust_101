
// 填空
fn main() {
    let mut s = "".to_string();
    s.push_str("hello, world");
    s.push('!');

    let x = 13.14_f32.round();

    assert_eq!(s, "hello, world!");
}
