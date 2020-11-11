export const type = 'UPDATE_VECCONVERSACIONES'

const updateVecconversaciones = (vecConversaciones, vecContactos) => {
	return {
		type,
		payload: {
			vecConversaciones,
			vecContactos,
		},
	}
}

export default updateVecconversaciones
