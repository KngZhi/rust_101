// 填空
fn main() {  
   let mut s = String::from("hello, world");

   let slice1: &str = &s; // 使用两种方法
   assert_eq!(slice1, "hello, world");

   let slice2: String = s[0..5].to_string();
   assert_eq!(slice2, "hello");

   let mut slice3: String = "hello, world".to_string(); 
   slice3.push('!');
   assert_eq!(slice3, "hello, world!");

   println!("Success!")
}
