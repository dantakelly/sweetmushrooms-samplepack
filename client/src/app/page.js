"use client"

import Image from "next/image"
import Link from "next/link"
import styler from "./style.css"
import { useState } from "react"

import packCover from "./Sweet Mushrooms - Sample Pack - Art - Demo Version.png"
import axios from "axios"

export default function Main() { 

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const SubmitForm = (event) => { 
    event.preventDefault(); 

    try {
      axios.post('https://sweetmushrooms-samplepack-server.vercel.app/api/form', { 
        name: name,
        email: email,
      })
      .then(function (response) { 
        console.log("Success", response.data);
        setName("")
        setEmail("")
        
        setTimeout(() => {
          alert("Check your email");
         }, 0);
      })
    } catch(error) {
      console.error(error)
      console.log(error)
    }
  }

  return(<>
    <div id="parent-container-all">
        <div id="BACKGROUND"></div>

        <div id="content-container">

            <div className="info">
                <h1>Sweet Mushrooms Sample Pack - Demo</h1>
                <p>The Sweet Mushrooms Sample pack will be one of the best and most exciting sound pack projects I've ever created. 
                   While the pack is still in development, as I want to ensure a high-quality product, I’d like to share some freebies 
                   with you all. Enjoyyy!"
                </p>
            </div>

            <div className="the-form-section">
            <div className="pack-image">
                <Image src={packCover} width={999} height={999} alt="Sample Pack Demo Image" />
            </div>
              <form onSubmit={SubmitForm}> 
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                  <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                  <button type="submit">Get Demo</button>
                </form>
          </div>
        <p style={{color: "white", fontSize: "8px"}}>By signing up for your free demo, you agree to receive updates on upcoming sound-packs from Cultertraz.</p>
    </div>
</div>
  </>)
}