import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function FeedbackSection({ lightMode }: any) {

const [name,setName] = useState("");
const [message,setMessage] = useState("");
const [rating,setRating] = useState(0);
const [feedback,setFeedback] = useState<any[]>([]);
const [activeCard,setActiveCard] = useState<number | null>(null);



/* FETCH APPROVED FEEDBACK */

useEffect(()=>{

const loadFeedback = async () => {

const { data } = await supabase
.from("feedback")
.select("*")
.eq("approved",true)
.order("created_at",{ascending:false});

if(data) setFeedback(data);

};

loadFeedback();

},[]);



/* SUBMIT FEEDBACK */

const submitFeedback = async () => {

if(!name || !message || rating===0){
alert("Please complete all fields");
return;
}

const { error } = await supabase
.from("feedback")
.insert([
{
name,
rating,
message,
approved:false
}
]);

if(error){
console.log(error);
alert("Submission failed");
return;
}

alert("Feedback submitted for approval");

setName("");
setMessage("");
setRating(0);

};



return(

<section className="py-32">

<div className="container mx-auto px-6 grid md:grid-cols-2 gap-20">


{/* LEFT SIDE FORM */}

<div>

<h2 className={`text-4xl mb-10 ${lightMode ? "text-black" : "text-white"}`}>
Leave Feedback
</h2>

<input
placeholder="Your name"
value={name}
onChange={(e)=>setName(e.target.value)}
className={`w-full mb-4 p-3 rounded-lg border ${
lightMode
? "bg-gray-100 border-gray-300 text-black"
: "bg-[#161b22] border-[#30363d] text-white"
}`}
/>

<textarea
placeholder="Your feedback"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className={`w-full mb-6 p-3 rounded-lg border ${
lightMode
? "bg-gray-100 border-gray-300 text-black"
: "bg-[#161b22] border-[#30363d] text-white"
}`}
/>


{/* STAR RATING */}

<div className="flex gap-3 mb-8">

{[1,2,3,4,5].map((star)=>(
<button
key={star}
onClick={()=>setRating(star)}
className={`text-3xl transition cursor-pointer ${
rating>=star
? "text-yellow-400 scale-110"
: "text-gray-400 hover:text-yellow-300"
}`}
>
★
</button>
))}

</div>



{/* SUBMIT BUTTON */}

<button
onClick={submitFeedback}
className="bg-purple-500 hover:bg-purple-600 transition px-8 py-3 rounded-lg text-white cursor-pointer"
>
Submit Feedback
</button>

</div>



{/* RIGHT SIDE WALLET STACK */}

<div className="relative flex justify-center items-center h-[420px] overflow-hidden">

<div className="relative w-[320px] h-[260px]">

{feedback.slice(0,6).map((fb,i)=>{

const colors=[
{top:"rgb(255,160,175)",body:"rgba(255,182,193,0.9)"},
{top:"rgb(150,130,200)",body:"rgba(177,156,217,0.9)"},
{top:"rgb(240,240,170)",body:"rgba(255,255,224,0.9)"},
{top:"#9ED6A1",body:"#C8E6C9"},
{top:"#F4B183",body:"#FED8B1"}
];

const rotate=[-6,-3,2,5,-4];

const isOpen = activeCard === i;

return(

<motion.div
key={i}

onClick={()=>{
setActiveCard(isOpen ? null : i)
}}

animate={
isOpen
?{
y:-20,
scale:1.08,
rotate:0
}
:{
y:i*26,
scale:1,
rotate:rotate[i%5]
}
}

transition={{
type:"spring",
stiffness:220,
damping:20
}}

style={{zIndex:isOpen ? 100 : 10-i}}

className="absolute w-[280px] rounded-2xl shadow-xl overflow-hidden cursor-pointer"
>

<div style={{background:colors[i%5].body}} className="rounded-2xl">

{/* Apple dots */}
<div
style={{background:colors[i%5].top}}
className="h-9 flex items-center gap-2 px-3"
>
<span className="w-3 h-3 rounded-full bg-red-500"></span>
<span className="w-3 h-3 rounded-full bg-yellow-400"></span>
<span className="w-3 h-3 rounded-full bg-green-500"></span>
</div>

<div className="p-5">

<div className="text-yellow-500 mb-2">
{"★".repeat(fb.rating)}
</div>

<p className="text-sm text-gray-800 mb-3 leading-relaxed">
{fb.message}
</p>

<p className="text-xs text-gray-600">
— {fb.name}
</p>

</div>

</div>

</motion.div>

)

})}

</div>

</div>

</div>

</section>

);

}