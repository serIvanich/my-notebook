import {notesReducer} from "./notes-reducer";

let state

beforeEach(() => {
    state = {
        notes: [
            {
                id: 13,
                title: 'new feature',
                created: '13.01.2022',
                category: 'idea',
                content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
                isArchive: false,

            },
            {
                id: 14,
                title: 'D.D.T.',
                created: '31.12.2021',
                category: 'quote',
                content: 'the other people like other things',
                isArchive: false,

            },
            {
                id: 15,
                title: 'job remember',
                created: '20.01.2022',
                category: 'task',
                content: 'doing three task',
                isArchive: false,

            },
        ]
    }
})

test('note should be added to notes', () => {

    const newNote = {
        id: 22,
        title: 'develop solution',
        created: '11.01.2022',
        category: 'idea',
        content: `have to improve business solutions`,
        isArchive: false,
    }
    const action = {type:'NOTES/ADD-NOTE', note: newNote}

    const newState = notesReducer(state, action)
    expect(newState.notes.length).toBe(4)
    expect(state.notes.length).toBe(3)
    expect(newState.notes[3].id).toBe(22)
})



