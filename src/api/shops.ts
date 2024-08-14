const url = 'http://localhost:5000'

const getShops = async () => {
    return await fetch(`${url}/shops`, {
        method: 'GET',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    })
        .then((res) => res.json())
}

export {
    getShops
}
