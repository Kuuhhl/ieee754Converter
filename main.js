function int_to_bin(num) {
	text_result = 'Convert ' + num + ' to decimal:\n'
	tmp = num
	res = ''
	while (tmp != 0) {
		text_result +=
			tmp + ' : 2 = ' + Math.floor(tmp / 2) + ' R ' + (tmp % 2) + '\n'
		res = (tmp % 2) + res
		tmp = Math.floor(tmp / 2)
	}
	text_result += 'Result: ' + res
	return { result: res, text: text_result }
}

function frac_to_bin(num, limit) {
	text_result = 'Convert ' + num + ' to decimal:\n'
	res = ''
	if (num == 0) {
		text_result += '0.0 is 0 in binary.'
		return { result: '0', text: text_result }
	}

	for (i = -1; i >= -limit && num != 0; i--) {
		text_result += num + ' / 2^(' + i + ') = ' + num / 2 ** i + '\n'
		if (num / 2 ** i >= 1) {
			res += '1'
			num = num - 2 ** i
			text_result += 'Because it fits in, we add a 1: ' + res + '\n'
		} else {
			res += '0'
			text_result +=
				"Because it doesn't fit in, we add a 0: " + res + '\n'
		}
	}
	text_result += 'Result: ' + res
	return { result: res, text: text_result }
}

function toBin(number) {
	steps = []

	// step 1: look at sign
	if (number[0] === '-') {
		sign = '1'
		stepDescription = 'Sign will be 1, as the number is negative.'
	} else {
		sign = '0'
		stepDescription = 'Sign will be 0, as the number is positive.'
	}
	steps.push(stepDescription)

	// step 2: convert number before comma to binary
	let before_comma = number.toString().split('.')[0].replace('-', '')

	stepDescription = 'Convert the number before comma to binary:\n'
	before_comma_bin = int_to_bin(before_comma)
	stepDescription += '\n' + before_comma_bin.text
	before_comma_bin = before_comma_bin.result

	steps.push(stepDescription)

	// step 3: convert number after comma to binary
	let afterComma = number.split('.')[1]
	stepDescription = 'Convert number after comma to binary:\n'
	afterCommaBin = frac_to_bin('0.' + afterComma, 23 - before_comma_bin.length)
	stepDescription += afterCommaBin.text
	afterCommaBin = afterCommaBin.result

	steps.push(stepDescription)

	// step 4: calculate exponent
	stepDescription = 'Calculate Exponent\n'

	stepDescription +=
		'We will have to move the comma left by ' +
		(before_comma_bin.length - 1) +
		' spaces in order to start our number with "1.". This means, our Exponent is ' +
		(before_comma_bin.length - 1) +
		'.\n'
	stepDescription +=
		'As the Exponent is represented in Excess-127, we have to add 127:\n' +
		(before_comma_bin.length - 1) +
		' + 127 = ' +
		before_comma_bin.length +
		126 +
		'.\n'
	steps.push(stepDescription)

	// step 5: convert exponent to binary
	stepDescription = 'Convert Exponent to binary:\n'
	exponentBin = int_to_bin(before_comma_bin.length + 126)
	stepDescription += exponentBin.text
	exponentBin = exponentBin.result

	stepDescription +=
		'\n-> Exponent (filled up with 0-s): ' +
		exponentBin.toString().padEnd(8, '0')
	steps.push(stepDescription)

	// step 6: get mantissa
	mantissa = (before_comma_bin + afterCommaBin).slice(1)
	stepDescription =
		'Our Mantissa is just the numbers after the point, after we moved our point to the left:\n-> Mantissa (filled up with 0-s): ' +
		mantissa.toString().padEnd(23, '0') +
		'\n'
	result =
		sign +
		' ' +
		exponentBin.toString().padEnd(8, '0') +
		' ' +
		mantissa.toString().padEnd(23, '0')

	stepDescription += 'This means, our final result is: ' + result
	steps.push(stepDescription)
	return { result: result, steps: steps }
}

function conv() {
	// get input number from form
	userInput = document.getElementById('srcNumber')

	// test if input is valid
	if (!userInput.value.toString().match(/^-{0,1}\d+(\.\d+){0,1}$/)) {
		alert('Bad input!')
		userInput.value = ''
		return false
	}

	solutionDiv = document.getElementById('solution')
	solutionDiv.innerHTML = ''

	stepsToConvert = toBin(userInput.value)
	console.log(stepsToConvert)

	solutionList = document.createElement('ol')

	for (i = 0; i < stepsToConvert.steps.length; i++) {
		// create a new list item
		solutionListItem = document.createElement('li')

		// fill list item with steps
		solutionListItem.innerHTML = stepsToConvert.steps[i]
			.split('\n')
			.join('<br>')

		// add item to list
		solutionList.appendChild(solutionListItem)
	}
	solutionDiv.appendChild(solutionList)
}
