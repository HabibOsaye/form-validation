const setupForm = () => {
	const input = document.querySelectorAll('.label__input')
	const modal = document.querySelector('.modal')
	const form = document.querySelector('#form')
	const username = document.querySelector('#username')
	const email = document.querySelector('#email')
	const password = document.querySelector('#password')
	const confirmPassword = document.querySelector('#confirm-password')
	const submitButton = form.querySelector('.btn')
	const toggleButton = form.querySelector('.toggle-view')

	const valid = {
		username: false,
		email: false,
		password: false,
		confirm_password: false,
	}

	input.forEach((element) => {
		const label = element.parentElement.querySelector(`.label__placeholder`)
		element.addEventListener(`focus`, function () {
			label.classList.add(`active`)
		})

		element.addEventListener(`input`, function () {
			label.classList.add(`active`)

			/* Removes error set from setErrorCaution() */
			const errorId = `error-invalid-submit-${element.name}`
			const labelError = document.querySelector(`#${errorId}`)
			if (labelError) removeError(element, errorId)
		})

		element.addEventListener(`blur`, () => {
			if (element.value == null || element.value.length === 0) {
				label.classList.remove(`active`)
			}
		})
	})

	toggleButton.addEventListener('click', () => {
		if (password.type === 'password') {
			password.type = 'text'
			toggleButton.ariaLabel = 'Hide password'
			toggleButton.innerHTML = `
      <svg class="icon icon-md" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" role="presentation">
          <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
          <path
          d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z" />
      </svg>`
		} else {
			password.type = 'password'
			toggleButton.ariaLabel = 'Show password'
			toggleButton.innerHTML = `
      <svg class="icon icon-md" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" role="presentation" >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
          d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>`
		}
	})

	const displayToggleView = (element) => {
		const parent = element.parentElement
		const toggleView = parent.querySelector(`.toggle-view`)
		const labelIcon = parent.querySelector(`.label-icon`)

		if (toggleView) {
			toggleView.style.opacity = '0'
			setTimeout(() => {
				labelIcon.classList.remove('active')
				toggleView.style.opacity = '1'
			}, 1500)
		}
	}

	const fail = (element) => {
		valid[element.name] = false
		/* console.log(`${element.name} has been set to:`, false); */

		element.parentElement.classList.remove(`success`)
		element.parentElement.classList.add(`error`)

		const labelIcon = element.parentElement.querySelector(`.label-icon`)
		labelIcon.classList.remove(`active`)

		submitButtonState(submitButton, isValidSubmit)
	}

	const pass = (element) => {
		valid[element.name] = true
		/* console.log(`${element.name} has been set to:`, true); */

		element.parentElement.classList.remove('error')
		element.parentElement.classList.add('success')

		const labelIcon = element.parentElement.querySelector(`.label-icon`)
		if (!labelIcon.classList.contains('active')) {
			labelIcon.classList.add('active')
		}

		submitButtonState(submitButton, isValidSubmit)

		/* Displaying toggle-view */
		displayToggleView(element)
	}

	const submitButtonState = (button, condition) => {
		const button_label = button.querySelector(`.btn-label`)
		if (condition()) {
			button_label.innerText = 'Continue'
			button.classList.add(`ready`)
		} else {
			button_label.innerText = 'Create profile'
			button.classList.remove(`ready`)
		}
	}

	const setError = (element, id, message) => {
		/* Sets valid[element.name]: false */
		fail(element)

		let helperMessage = document.querySelector(`#${id}`)
		if (message) {
			if (helperMessage) {
				return
			} else {
				element.parentElement.insertAdjacentHTML(
					`afterend`,
					` <span id="${id}" class="error-label" aria-live="polite" >
          <svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="presentation" >
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          ${message}
        </span>`
				)
			}
		}
	}

	const setCaution = (element) => {
		const labelWrapper = element.parentElement
		if (!valid[element.name]) {
			labelWrapper.classList.add(`caution`)

			setTimeout(() => {
				labelWrapper.classList.remove(`caution`)
			}, 400)
		}
	}

	const removeError = (element, id) => {
		let helperMessage = document.querySelector(`#${id}`)
		if (helperMessage) {
			helperMessage.remove()
		} else {
			return
		}
	}

	const isNull = (value) => {
		value = value.trim()
		if (value.indexOf(`@`) === 0 && value.length === 1) {
			return true
		}
		if (value.length === 0 || !value) {
			return true
		}
	}

	const hasNumbspace = (value) => {
		if (value.includes(` `)) {
			return true
		}
	}

	const isValidEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return !re.test(String(email).toLowerCase())
	}

	const isValidSubmit = () => {
		const copy = Object.values(valid)
		return copy.every((key) => {
			return key === true
		})
	}

	const matchChar = (value) => {
		let filter =
			'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@'
		for (let item of value) {
			if (!filter.includes(item)) {
				return true
			}
		}
	}

	const tooShort = (value, min = 8) => {
		if (value.length <= min) {
			return true
		}
	}

	const tooLong = (value, max = 16) => {
		value = value.trim()
		if (value.length > max) {
			return true
		}
	}

	const autoPrefix = (value) => {
		let copy = value
		let newCopy = ``

		if (copy === `@`) return copy

		for (let i = 0; i < copy.length; i++) {
			if (copy[i] !== `@`) {
				newCopy += copy[i]
			}
		}

		return `@` + newCopy
	}

	username.addEventListener(`input`, function () {
		/* Adds @ to start of string */
		this.value = autoPrefix(username.value)

		let value = this.value

		if (isNull(value)) {
			setError(
				username,
				`error-no-username`,
				`You need to enter your username.`
			)
			removeError(username, `error-numbspace-username`)
			removeError(username, `error-strict-char-username`)
			return
		} else {
			removeError(username, `error-no-username`)
		}

		/* Has space */
		if (hasNumbspace(value)) {
			setError(
				username,
				`error-numbspace-username`,
				`You can't include spaces.`
			)
			return
		} else {
			removeError(username, `error-numbspace-username`)
		}

		/* checks for match char in string filter */
		if (matchChar(value)) {
			setError(
				username,
				`error-strict-char-username`,
				`Can only have alphabets, numbers or underscores.`
			)
			return
		} else {
			removeError(username, `error-strict-char-username`)
		}

		/* Too long. Accounts for prefix placement */
		if (tooLong(value, 40)) {
			setError(username, `error-too-long-username`, `Username is too long.`)
			return
		} else {
			removeError(username, `error-too-long-username`)
		}
		/* Sets valid.username: true */
		pass(username)
	})

	email.addEventListener(`input`, function () {
		let value = this.value

		/* Null check */
		if (isNull(value)) {
			setError(email, `error-no-email`, `You need to enter an email.`)
			removeError(email, `error-invalid-email`)
			return
		} else {
			removeError(email, `error-no-email`)
		}

		/* Regex email validity */
		if (isValidEmail(value) && value) {
			setError(email, `error-invalid-email`, `Not a valid email.`)
			return
		} else {
			removeError(email, `error-invalid-email`)
		}
		/* Sets valid.email: true */
		pass(email)
	})

	password.addEventListener(`input`, function () {
		let value = this.value
		toggleButton.style.opacity = '1'

		/* Null check */
		if (isNull(value)) {
			setError(password, `error-no-password`, `You need to enter a password.`)
			removeError(password, `error-too-short-password`)

			/* Updates confirmPassword fail */
			if (!isNull(confirmPassword.value)) {
				setError(
					confirmPassword,
					`error-no-existing-password`,
					`You do not have a password.`
				)
				removeError(confirmPassword, `error-not-equal-password`)
			}
			return
		} else {
			removeError(password, `error-no-password`)
		}

		/* Has space */
		if (hasNumbspace(value)) {
			setError(
				password,
				`error-numbspace-password`,
				`You can't include spaces.`
			)
			return
		} else {
			removeError(password, `error-numbspace-password`)
		}

		/* Too short */
		if (tooShort(value)) {
			setError(password, `error-too-short-password`, `Password is too short.`)

			/* Updates confirmPassword fail */
			removeError(confirmPassword, `error-no-existing-password`)
			if (value !== confirmPassword.value && !isNull(confirmPassword.value)) {
				setError(
					confirmPassword,
					`error-not-equal-password`,
					`Passwords do not match.`
				)
				return
			}
			removeError(confirmPassword, `error-not-equal-password`)
			return
		} else {
			removeError(password, `error-too-short-password`)
		}

		if (tooLong(value)) {
			setError(password, `error-too-long-password`, `Password is too long.`)

			/* Updates confirmPassword fail */
			if (!isNull(confirmPassword.value)) {
				setError(confirmPassword, `error-too-long-previous-password`)
			}
			return
		} else {
			removeError(password, `error-too-long-password`)
			removeError(confirmPassword, `error-too-long-previous-password`)
		}

		/* Sets valid.password: true */
		pass(password)

		/* Updates confirmPassword fail */
		if (value !== confirmPassword.value && !isNull(confirmPassword.value)) {
			setError(
				confirmPassword,
				`error-not-equal-password`,
				`Passwords do not match.`
			)
			removeError(confirmPassword, `error-no-existing-password`)
			return
		} else if (value === confirmPassword.value) {
			removeError(confirmPassword, `error-not-equal-password`)
			removeError(confirmPassword, `error-no-existing-password`)
			/* Sets valid.confirm_password: true */
			pass(confirmPassword)
		}
	})

	confirmPassword.addEventListener(`input`, function () {
		let value = this.value

		/* Null check */
		if (isNull(value)) {
			setError(
				confirmPassword,
				`error-no-confirm-password`,
				`You need to confirm your password.`
			)
			removeError(confirmPassword, `error-no-existing-password`)
			removeError(confirmPassword, `error-not-equal-password`)
			return
		} else {
			removeError(confirmPassword, `error-no-confirm-password`)
		}

		/* Password null check */
		if (isNull(password.value)) {
			setError(
				confirmPassword,
				`error-no-existing-password`,
				`You do not have a password.`
			)
			removeError(confirmPassword, `error-not-equal-password`)
			return
		} else {
			removeError(confirmPassword, `error-no-existing-password`)
		}

		/* Matches initial password */
		if (value !== password.value) {
			setError(
				confirmPassword,
				`error-not-equal-password`,
				`Passwords do not match.`
			)
			return
		} else {
			removeError(confirmPassword, `error-no-existing-password`)
			removeError(confirmPassword, `error-not-equal-password`)
		}

		/* Updates confirmPassword fail if password is too long */
		if (tooLong(password.value)) {
			setError(confirmPassword, `error-too-long-previous-password`)
			return
		}

		/* Sets valid.confirm_password: true */
		pass(confirmPassword)
	})

	const displayLoader = (element) => {
		element.style.display = 'none'
		modal.classList.add(`collapse`)
		modal.style.height = '400px'
		modal.style.width = '400px'
		modal.insertAdjacentHTML(
			`afterbegin`,
			`	
    <svg version="1.1" class="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
    y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <path fill="currentColor"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50"
        repeatCount="indefinite" />
      </path>
    </svg>`
		)

		setTimeout(() => {
			location.reload()
		}, 3500)
	}

	const setErrorCaution = (element) => {
		const errorId = `error-invalid-submit-${element.name}`
		const labelError = document.querySelector(`#${errorId}`)
		const parentError = element.parentElement.classList.contains(`error`)

		if (!labelError && element.value === '' && !parentError) {
			setError(element, errorId, `Cannot leave required field blank.`)
			setCaution(element)
		} else if (element.value === '' || !valid[element.name]) {
			setCaution(element)
		}
	}

	form.addEventListener(`submit`, (e) => {
		e.preventDefault()

		if (isValidSubmit()) {
			const data = {}
			input.forEach((item) => {
				if (item.name !== 'confirm_password') {
					if (item.name === 'username') {
						/* Removes @ prefix in username */
						data[item.name] = item.value.slice(1).trim()
					} else if (item.name === 'email') {
						data[item.name] = item.value.trim().toLowerCase()
					} else {
						data[item.name] = item.value.trim()
					}
				}
			})
			displayLoader(form)
			console.log(data)
		} else {
			input.forEach((element) => {
				/* Sets caution on field if isValidSubmit() = false */
				setErrorCaution(element)
			})
		}
	})
}

document.addEventListener('DOMContentLoaded', setupForm)
