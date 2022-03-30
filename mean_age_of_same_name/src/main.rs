#![warn(unused_variables)]
use std::collections::BTreeMap;
use std::env;
use std::fs;


struct Person {
    id: String,
    name: String,
    age: String,
}

fn csv_to_persons(csv: String) -> Vec<Person> {
    let out: Vec<Person> = csv
        .lines()
        .map(|line| {
            let parts: Vec<&str> = line.split(',').collect();

            Person { id: parts[0].to_string(), name: parts[1].to_string(), age: parts[2].to_string() }
        })
        .collect();

    out
}

fn aggregate_person_with_ages(persons: Vec<Person>) -> Vec<(String, i32)> {
    let mut hash_map: BTreeMap<String, Vec<i32>> = BTreeMap::new();
    for Person { id, name, age } in persons {
        if hash_map.contains_key(&name) {
            hash_map.get_mut(&name).unwrap().push(age.parse().unwrap());

        } else {
            let ages = Vec::from([age.parse().unwrap()]);
            hash_map.insert(name, ages);
        }
    }

    let mut result: Vec<(String, i32)> = Vec::new();
    for key in hash_map.keys() {
        let ages = hash_map.get(key).unwrap();
        let total: i32 = ages.iter().sum();
        let len: i32 = ages.len().try_into().unwrap();
        let avg = total.checked_div(len).unwrap();
        result.push((key.to_string(), avg));
    }

    result
}

fn main() {
    // --snip--
    let args: Vec<String> = env::args().collect();

    // let query = &args[1];
    let filename = &args[2];

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    // Read Lines from csv
    // turn lines into Person Struct
    let persons = csv_to_persons(contents);
    // group Vec<Person> into Hashmap<Person.name, Vec<String>>
    let result = aggregate_person_with_ages(persons);
    // find mean value of each Person.name and write to files
    for person in result {
        println!("({},{})", person.0, person.1);
    }

    // println!("With text:\n{}", contents);
}
