import './App.css'

export default function Legend(props)
{
    return (
        <>
            <div className='grid-container'>
                <div>A L</div>
                <button onClick={()=> props.handleClick(props.id, 50)} className="al_5">50</button>
                <button onClick={()=> props.handleClick(props.id, 0)} className="al_0">0</button>
                <button onClick={()=> props.handleClick(props.id, 20)} className="al_2">20</button>
                <button onClick={()=> props.handleClick(props.id, 0)} className="al_0_2">0</button>
                <div>L</div>
                <button className="l_1">10</button>
                <button className="l_10">100</button>
                <button className="l_1_2">10</button>
                <button className="l_0">0</button>
                <div>T</div>
                <div>1</div>
                <div>10</div>
                <div>1</div>
                <div>0</div>
                <div>T Bed</div>
                <div>-1</div>
                <div>10</div>
                <div>-1</div>
                <div>0</div>
            </div>
        </>
    )
}