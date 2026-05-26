function Reports(){

    const processData = () => {
         return Array.from({length: 100000}, (_, i) => ({
             id: i,
             value: parseInt(Math.random() * 1000),
         }))
     }

    return (
        <div>
            <h1>Relatório 2:</h1>
            {processData().map( item => <p key={item.id}> {item.id} - {item.value} </p>)}
           
        </div>
    )
}

export default Reports