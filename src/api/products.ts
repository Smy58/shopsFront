const url = 'http://localhost:5000'

const getProducts = async (shopId: number, page: number, params: { groupId?: number, searchInput?: string}) => {
    const data = new URLSearchParams();
    data.append('shopId', (shopId + ''))
    data.append('page', (page + ''))
    if (params.groupId) {
        data.append('groupId', (params.groupId + ''))
    }
    if (params.searchInput) {
        data.append('searchInput', (params.searchInput + ''))
    }

    return await fetch(`${url}/shopProducts` + `?${data.toString()}`, {
        method: 'GET',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		}
    })
        .then((res) => res.json())
}

export {
    getProducts
}
