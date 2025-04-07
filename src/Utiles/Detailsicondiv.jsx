import React from 'react'

const Detailsicondiv = ({ img, icon, Icondata }) => {
    return (
        <>
            <span className="rounded-full shadow-[0px_0px_42.5px_0px_#00000033] h-14 w-14 aspect-square flex justify-center place-items-center">
                {icon ?
                
                    <div className="text-2xl text-[var(--primary-color)]">
                        <Icondata />
                    </div>
                    :
                    <img src={img} alt="" className="h-10 w-10 aspect-square" />
                }
            </span>
        </>
    )
}

export default Detailsicondiv
