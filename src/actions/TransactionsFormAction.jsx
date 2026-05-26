export const CreateTransactionAction = (previousState, formData) => {
    const client = formData.get('client')
    const amount = formData.get('amount')
    const status = formData.get('status')

    if(!client){
        return {success: false, error: "O cliente é obrigatório"}
    }
    if(client.length <= 3){
        return {success: false, error: "O nome do cliente precisa ter no mínimo 3 caracteres"}
    }
    if(!amount){
        return {success: false, error: "O valor é obrigatório"}
    }
    if(parseFloat(amount) <= 0){
        return {success: false, error: "O valor precisa ser maior que zero"}
    }

    await new Promise( resolve =>  setTimeout(resolve, 2000))

    return {
        success: true,
        error: null,
        newData: {
            id: Date.now(),
            client,
            amount: Math.floor(Math.random() * 1000),
            date: new Date().toLocaleDateString(),
            status
        }
    }

}