"use client"



type ButtonProps = {
    name : string,
    handleClick : () => void
}

export default function Button({name,handleClick}:ButtonProps) {
    return (
    <button onClick={()=>handleClick()} className="btn btn-square btn-ghost">
        {name}
    </button>
    )
}


