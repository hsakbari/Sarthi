import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [number,setNumber]=useState('');
    const [password,setPassword]=useState('');
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                number,
                password,
            });
            alert('Registration successful. Now you can log in');
        }
        catch(e){
            alert('Registration failed. Please try again later');
        }
        
    }
    
    return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text" placeholder="Your Full Name" value={name} onChange={ev=>setName(ev.target.value)}/>
            <input type="email" placeholder="Email Address" value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type="number" placeholder="Phone Number" value={number} onChange={ev=>setNumber(ev.target.value)}/>
            <input type="password" placeholder="Create Password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <button className="primary">Register</button>
            <div className="text-center py-2">Already a user? <Link className="underline text-black" to={'/login'}>Login</Link>
            </div>
        </form>
        </div>
    </div>
    );
}