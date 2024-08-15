import { signupUserParams, updateUserParams, updateUserPasswordParams } from "src/types/user"

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

const signupUser = async (params: signupUserParams) => {
    return await fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify(params)
    })
    .then((res) => res.json())
}

const updateUserInfo = async (params: updateUserParams, userId: number) => {
    return await fetch(`${url}/clients/${userId}`, {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify(params)
    })
    .then((res) => res.json())
}

const updateUserPassword = async (params: updateUserPasswordParams, userId: number) => {
    return await fetch(`${url}/clients/${userId}/password`, {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify(params)
    })
    .then((res) => res.json())
}

export {
    loginUser,
    signupUser,
    updateUserInfo,
    updateUserPassword
}
