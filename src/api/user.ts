const url = 'http://localhost:5000'

const loginUser = async (params: { login: string, password: string}) => {
    return await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify(params)
    })
        .then((res) => res.json())

}

export {
    loginUser
}
