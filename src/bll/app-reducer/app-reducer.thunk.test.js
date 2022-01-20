import {appAPI} from '../../api/fail-api'
import {initializeApp} from "./app-reducer";

jest.mock('../../api/fail-api')

const appAPIMock = appAPI.me

const res = true
appAPIMock.mockReturnValue(Promise.resolve(res))

const dispatchMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    appAPIMock.mockClear()
})

test('how many fn work in thunk', async () => {

    const thunk = initializeApp()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(2)

})