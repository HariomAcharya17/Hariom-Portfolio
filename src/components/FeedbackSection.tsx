import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function FeedbackSection({ lightMode }: any) {

const [name,setName] = useState("");
const [message,setMessage] = useState("");
const [rating,setRating] = useState(0);
const [feedback,setFeedback] = useState<any[]>([]);
const [activeCard,setActiveCard] = useState<number | null>(null);
const [toast,setToast] = useState(false);


/* FETCH */

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


/* SUBMIT */

const submitFeedback = async () => {

if(!name || !message || rating===0){
alert("Please complete all fields");
return;
}

const { error } = await supabase
.from("feedback")
.insert([
{ name, rating, message, approved:false }
]);

if(error){
alert("Submission failed");
return;
}

// 🔥 Apple Toast Trigger
setToast(true);
setTimeout(()=>setToast(false),2500);

setName("");
setMessage("");
setRating(0);

};



return(

<section className="py-32 relative">

{/* 🔥 APPLE TOAST */}
<AnimatePresence>
{toast && (
<motion.div
initial={{ y: -120, opacity: 0 }}
animate={{ y: 40, opacity: 1 }}
exit={{ y: -120, opacity: 0 }}
transition={{ type:"spring", stiffness:180, damping:18 }}

className="fixed top-0 left-0 w-full flex justify-center z-[9999] pointer-events-none"
>

  <div
    className={`px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border ${
      lightMode
        ? "bg-white/90 text-black border-gray-200"
        : "bg-black/80 text-white border-white/10"
    }`}
  >
    Message Sent 🚀
  </div>

</motion.div>
)}
</AnimatePresence>


<div className="container mx-auto px-6 grid md:grid-cols-2 gap-20">

{/* LEFT */}

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

{/* STARS */}
<div className="flex gap-3 mb-8">
{[1,2,3,4,5].map((star)=>(
<button
key={star}
onClick={()=>setRating(star)}
className={`text-3xl ${
rating>=star
? "text-yellow-400 scale-110"
: "text-gray-400 hover:text-yellow-300"
}`}
>
★
</button>
))}
</div>

<button
onClick={submitFeedback}
className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-lg text-white"
>
Submit Feedback
</button>

</div>


{/* RIGHT */}

<div className="relative flex justify-center items-center h-[420px] overflow-hidden">

<div className="relative w-[320px] h-[260px]">

{feedback.slice(0,6).map((fb,i)=>{

const colors=[
{top:"#ffb3ba",body:"#fff0f1"},   // light pink
{top:"#ffccd5",body:"#fff5f7"},   // light red
{top:"#d0bfff",body:"#f3efff"},   // light purple
{top:"#bde0fe",body:"#eef7ff"},   // light blue
{top:"#fff1a8",body:"#fffde7"},   // light yellow
{top:"#caffbf",body:"#f3fff1"},   // light green
{top:"#ffe0b2",body:"#fff6eb"}    // light orange
];
const rotate=[-6,-3,2,5,-4];
const isOpen = activeCard === i;

return(

<motion.div
key={i}
onClick={()=>setActiveCard(isOpen ? null : i)}
animate={
isOpen
? { y:-20, scale:1.08, rotate:0 }
: { y:i*26, scale:1, rotate:rotate[i%5] }
}
transition={{ type:"spring", stiffness:220, damping:20 }}
style={{zIndex:isOpen ? 100 : 10-i}}
className="absolute w-[280px] rounded-2xl shadow-xl cursor-pointer"
>

<div style={{background:colors[i%5].body}} className="rounded-2xl">

{/* Apple dots */}
<div
style={{background:colors[i%5].top}}
className="h-9 flex items-center gap-2 px-3"
>
<span className="w-3 h-3 rounded-full bg-red-500"/>
<span className="w-3 h-3 rounded-full bg-yellow-400"/>
<span className="w-3 h-3 rounded-full bg-green-500"/>
</div>

<div className="p-5">

<div className="text-yellow-500 mb-2">
{"★".repeat(fb.rating)}
</div>

<p className="text-sm text-gray-800 mb-3">
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