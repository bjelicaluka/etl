fn main() {
    let mut a: i128 = 1;
    let mut vec: Vec<i128> = Vec::new();
    vec.push(a);

    change_val(&mut a);

    for e in vec {
        println!("{}", e)
    }

    println!("Hello, world! {}", a);

    for a in [1, 2, 3] {
        println!("{}", a);
    }

    change_val(&mut a);

    if a <= test(2) {
        println!("ASD");
    } else if a == 1 {
        println!("BSDF");
    } else {
        println!("ELSE");
    }
}

fn test(n: i128) -> i128 {
    return n + 2;
}

fn change_val(n: &mut i128) {
    *n = 20;
}
