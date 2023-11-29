import { useEffect, useState } from "react";
import Perks from "../PerksLabels";
import PhotoUploader from "../PhotoUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function PlacesFormPage()
{
    const {id}=useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [days, setDays] = useState('');
    const [price, setPrice]=useState('');
    const [redirect,setRedirect]=useState(false);
    useEffect(()=>{
        if(!id)
        {
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setDays(data.days);
            setPrice(data.price);
        });
    },[id]);
    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }

    function preInput(header) {
        return (
            <>
                {inputHeader(header)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData={title,address,addedPhotos,description,perks,extraInfo,days,price};
        if(id){
            //for update place
            await axios.put('/places',{id,
            ...placeData});

        }else{
            //for new place
            await axios.post('/places',placeData);
        }
        
        setRedirect(true);
    }
    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return(
        <div>
            <AccountNav/>
                    <form onSubmit={savePlace}>
                        {preInput('Title')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                        {preInput('Address')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos')}
                        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                        {preInput('Description')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} placeholder="description of the place" />
                        {preInput('Services or Availabilities')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Info')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="house rules, etc" />
                        {preInput('Days and Prices')}
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Number of days</h3>
                                <input type="text" value={days} onChange={ev => setDays(ev.target.value)} placeholder="for eg... 7" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per day</h3>
                                <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="in (₹)rupees" />
                            </div>
                        </div>
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
    );
}