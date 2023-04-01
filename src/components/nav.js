import RecButt from './button';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';


export default function NavBar({}){
    const { data: session, status } = useSession();
    const router = useRouter();
    return(
        <>
            <nav className='flex nav flex-row justify-between drop-shadow-sm items-center p-3    bg-base-100'>
                <div className='flex flex-row items-center'>
                    <img className='mr-2 w-10 h-10' src='/favicon.png' alt='logo'/>
                    <h1 className='text-2xl font-bold text-neutral'>Cooked</h1>
                </div>
                <div className='flex flex-row items-center'>
                    {/* <RecButt text='Recipes' onClick={() => {
                        console.log('Recipes');
                    }}/> */}
                    
                    {session ? (
                        <>
                        <Image onClick={()=>router.push("/profile")} className='rounded-full hover:scale-90 transition-all' src={session.user.image} width={50} height={50}/>
                        </>
                    ) : (
                        <RecButt text='Sign In' onClick={() => signIn()}/>
                    )}
                        
                    

                   
                </div>
            </nav>
        </>
    )
}