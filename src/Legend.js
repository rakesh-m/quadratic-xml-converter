import './App.css'

export default function Legend(props)
{
    return (
        <>
            <div className='grid-container'>
                <div>A L</div>
                <div onClick={()=> props.handleClick(props.id, 50)}>50</div>
                <div onClick={()=> props.handleClick(props.id, 0)}>0</div>
                <div onClick={()=> props.handleClick(props.id, 20)}>20</div>
                <div onClick={()=> props.handleClick(props.id, 0)}>0</div>
                <div>L</div>
                <div onClick={()=> props.handleClick(props.id, 10)}>10</div>
                <div onClick={()=> props.handleClick(props.id, 100)}>100</div>
                <div onClick={()=> props.handleClick(props.id, 10)}>10</div>
                <div onClick={()=> props.handleClick(props.id, 0)}>0</div>
                <div>T</div>
                <div onClick={()=> props.handleClick(props.id, 10)}>10</div>
                <div onClick={()=> props.handleClick(props.id, 100)}>100</div>
                <div onClick={()=> props.handleClick(props.id, 10)}>10</div>
                <div onClick={()=> props.handleClick(props.id, 0)}>0</div>
                <div>T L</div>
                <div onClick={()=> props.handleClick(props.id, -10)}>-10</div>
                <div onClick={()=> props.handleClick(props.id, 100)}>100</div>
                <div onClick={()=> props.handleClick(props.id, -10)}>-10</div>
                <div onClick={()=> props.handleClick(props.id, 0)}>0</div>
            </div>
        </>
    )
}