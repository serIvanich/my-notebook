import {notesAPI} from '../../api/fail-api'
import {getNotes} from "./notes-reducer";

jest.mock('../../api/fail-api')

const notesAPIMock = notesAPI

const res = true
notesAPIMock.getNotes.mockReturnValue(Promise.resolve(res))

const dispatchMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    notesAPIMock.getNotes.mockClear()
})

test('how many fn work in thunk', async () => {

    const thunk = getNotes()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(1)
})