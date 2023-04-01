


export default function RecButt({
    text = 'Recipes',
    onClick = () => {
        console.log('Click');
    }

}){
    return(
        <>
            <div onClick={onClick} className='w-24 text-center cursor-pointer p-3 font-bold m-2 rounded-md bg-primary hover:bg-violet-500 transition-all  text-neutral  btn btn-primary'>{text}</div>
        </>
    )
}