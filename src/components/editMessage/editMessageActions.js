export const editMessage = (id, message) => ({
    type: 'EDIT_MESSAGE',
    payload: {
        id,
        message
    }
})