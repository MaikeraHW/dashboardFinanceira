import { useActionState, useEffect } from 'react'
import { TransactionsFormAction } from './../../actions/TransactionsFormAction'

export default function TransactionForm({onAddTransaction}) {


    const [state, formAction, isPending] = useActionState(TransactionsFormAction, {
        success: false,
        error: null,
        newData: null
    })

    useEffect(() => {
        if(state.newData){
            onAddTransaction(state.newData)
        }
    }, [state.newData])


    return (
        <div style={{ marginBottom: '2rem' }}>

            <form action={formAction} style={{ display: 'flex', gap: '.5rem', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginTop: '2rem', alignItems: 'center' }}>
                    <p >Adicionar Transacão</p>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Nome do Cliente:</label>
                        <input
                            type="text"
                            name="client"
                            style={{ padding: '6px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Valor (R$):</label>
                        <input
                            type="number"
                            name="amount"
                            style={{ padding: '6px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '4px' }}>Status:</label>
                        <select name="status" style={{ padding: '6px' }}>
                            <option value="Concluído">Concluído</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>
                </div>

                {/* Se tiver erro será visivel aqui */}

                <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>
                    ❌ Erro
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    Adicionar Transação
                </button>
            </form>
        </div>
    )
}