function bir(n) {
	if (n % 7 == 0) {
		console.log(`Birinci task n=${n}  num=${n}`)
	} else if (n % 7 < 3.5) {
		console.log(`Birinci task n=${n}  num=${n - n % 7}`)
	} else {
		console.log(`Birinci task n=${n}  num=${n + 7 - n % 7}`)
	}
}

// bir(22)

function iki(n) {
	// qeyri adi
	let counter = -1;
	if (n < 50) {
		while (n >= 0) {
			n -= 3
			counter++
		}
	}
	console.log(`Ikinci task n=${n} count=${counter}`)
}

function iki_(n) {
	let m = 0
	let count = 0
	if (n < 50) {
		while (m + 3 <= n) {
			count++
			m += 3
		}
	}
	console.log(`Ikinci task_ n=${n} count=${count}`)
}


function uc(n) {
	let count = 0;
	if (n >= 50 && n <= 100) {
		for (let i = 1; i < n; i++) {
			if (i % 5 == 0) {
				count++;
			}
		}
	}
	console.log(`Ucuncu task n=${n} count=${count}`)
}



function dort(num) {
	let n = num;
	let counter = 0;
	if (n > 100) {
		while (n - 8 >= 0) {
			n -= 8;
			counter++
		}
	}
	console.log(`Dorduncu task n=${n}  count=${counter}`)
}

bir(24)
iki(48)
iki_(43)
uc(64)
dort(120)