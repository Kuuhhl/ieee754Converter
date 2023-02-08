function int_to_bin(num) {
	console.log('Convert ' + num + ' to decimal:')
	tmp = num
	res = ''
	while (tmp != 0) {
		console.log(tmp + ' : 2 = ' + Math.floor(tmp / 2) + ' R ' + (tmp % 2))
		res = (tmp % 2) + res
		tmp = Math.floor(tmp / 2)
	}
	console.log('Result: ' + res)
	return res
}

function frac_to_bin(num, limit) {
	console.log('Convert ' + num + ' to decimal:')
	res = ''
	for (i = -1; i >= -limit && num != 0; i--) {
		console.log(num + ' / 2^(' + i + ') = ' + num / 2 ** i)
		if (num / 2 ** i >= 1) {
			res += '1'
			num = num - 2 ** i
			console.log('Because it fits in, we add a 1: ' + res)
		} else {
			res += '0'
			console.log("Because it doesn't fit in, we add a 0: " + res)
		}
	}
	console.log('Result: ' + res)
	return res
}

function toBin(number) {
	// extract parts
	let before_comma = number.split('.')[0].replace('-', '')

	if (number[0] === '-') {
		sign = '1'
	} else {
		sign = '0'
	}
	let afterComma = number.split('.')[1]

	// convert before comma to binary
	before_comma_bin = int_to_bin(before_comma)

	console.log('\n')

	afterCommaBin = frac_to_bin('0.' + afterComma, 23 - before_comma_bin.length)

	console.log('\n-> Binary: ' + before_comma_bin + '.' + afterCommaBin + '\n')
	if (sign) {
		console.log('Sign will be 1, as the number is negative.')
	} else {
		console.log('Sign will be 0, as the number is positive.')
	}
	console.log('\n')

	console.log(
		'We will have to move the comma left by ' +
			(before_comma_bin.length - 1) +
			' spaces in order to start our number with "1.". This means, our Exponent is ' +
			(before_comma_bin.length - 1) +
			'.'
	)
	exponent = before_comma_bin.length + 126
	console.log(
		'As the Exponent is represented in Excess-127, we have to add 127:\n' +
			(before_comma_bin.length - 1) +
			' + 127 = ' +
			exponent +
			'.'
	)
	console.log(
		'-> Exponent (filled up with 0-s): ' +
			exponent.toString().padEnd(8, '0')
	)
	mantissa = before_comma_bin + afterCommaBin.slice(1)
	console.log(
		'Our Mantissa is just the numbers after the point, after we moved our point to the left:\n-> Mantissa (filled up with 0-s): ' +
			mantissa.toString().padEnd(23, '0')
	)
	console.log(
		'This means, our final result is: ' +
			sign +
			' ' +
			exponent.toString().padEnd(8, '0') +
			' ' +
			mantissa.toString().padEnd(23, '0')
	)

	return
}

toBin('-9.25')
