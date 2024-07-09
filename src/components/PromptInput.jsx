import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const baseURL = "http://localhost:4000/user/"
function PropmtInput(){
    const [prompt, setPrompt] = useState('');
    const [answer, setAnswer] = useState('');
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //api call logic   
        setLoader(true) 
        try {
            const response = await axios.post(`${baseURL}ans`,
                {data: prompt}
                );
            console.log(response.data.data); 
            toast("success");
            setAnswer(response.data.data);
            setLoader(false)
        } catch (error) {
            console.log("Errror occurred");
        }
        setPrompt('')
    }

    return (
        <div className="font-bold flex justify-center h-screen items-center rounded-lg">
            <form onSubmit={e => handleSubmit(e)} className="shadow-md bg-white p-10">
                <div className="flex justify-center items-center flex-col gap-7">
                    <h1 className="text-3xl font-semibold">Ask me anything</h1>
                    <input onChange={e => setPrompt(e.target.value)} value={prompt} type="text" placeholder="ask me anything" className="w-full text-xl font-normal border-gray-300 rounded-lg border-2 p-2"/>
                    {loader ? <ClipLoader /> : <button className="text-white w-full bg-blue-700 p-2 rounded-md cursor-pointer">Search</button>}
                </div>
                <div className="font-normal mt-2">
                {answer && <>
                    {answer}</>}
                </div>
            </form>
        </div>
    )
}

export default PropmtInput;