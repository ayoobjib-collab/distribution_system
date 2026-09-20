
function Show({ cats, products }) {

    return (
        <>

            {products.data.map((p) => (
                <div key={p.id}>{p.name}</div>
            ))
            }

        </>
    )
}

export default Show;