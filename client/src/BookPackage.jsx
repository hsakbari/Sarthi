import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { differenceInCalendarDays } from 'date-fns';

export function BookPackage({place})
{
    const [arrival, setArrival] = useState('');
    const [departure, setDeparture] = useState('');
    const[noOfPerson,setNoOfPerson]=useState("");
    const[name,setName]=useState("");
    const[mobile,setMobile]=useState("");
    const[redirect,setRedirect]=useState("");
    const user=useContext(UserContext);

    useEffect(() => {
        if (user) {
          setName(user.name);
        }
      }, [user]);

    let numberOfDays =0;
    if(arrival && departure)
    {
        numberOfDays = differenceInCalendarDays(new Date(departure), new Date(arrival));
    }

    async function bookThisPlace(){
        const response =await axios.post('/bookings',{arrival,departure,noOfPerson,name,mobile,
            place:place._id,
            price:numberOfDays*place.price,
            });

            const bookingId=response._id;
            setRedirect(`/account/bookings/${bookingId}`);

            if (redirect) {
                return <Navigate to={redirect} />;
              }
            }              

    return(
    <div className="bg-white shadow p-4 rounded-2xl">
    <div className="text-xl text-center">
    Price : ₹{place.price} / per day
    <div className="border rounded-2xl mt-4">
    <div className="flex">
    <div className="py-3 px-4">
        <label>Arrival:</label>
        <input type="date" value={arrival} onChange={ev=>setArrival(ev.target.value)}/>
    </div>
    <div className="py-3 px-4 border-l">
        <label>Departure:</label>
        <input type="date" value={departure} onChange={ev=>setDeparture(ev.target.value)}/>
    </div>
    </div>
    <div className="py-3 px-4 border-t">
        <label>Number of person</label>
        <input type="number" placeholder="no. of persons" value={noOfPerson} onChange={ev=>setNoOfPerson(ev.target.value)}/>
    </div>
    {numberOfDays>0 && (
        <div className="">
            <div className="py-3 px-4 border-t">
        <label>your full name</label>
        <input type="text" placeholder="your full name" value={name} onChange={ev=>setName(ev.target.value)} />
        <input type="tel" placeholder="mobile Number" value={mobile} onChange={ev=>setMobile(ev.target.value)}/>
    </div>
        </div>
    )}
        </div>
    <button onClick={bookThisPlace} className="primary mt-4">
        Book the package
        {numberOfDays>0 && (
            <span>{numberOfDays*place.price}</span>
        )}
        </button>
    </div>
    </div>);
}