const url = 'http://localhost:5000'

const getGroups = async () => {
    return await fetch(`${url}/groups`, {
        method: 'GET',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    })
        .then((res) => res.json())
}

export {
    getGroups
}
