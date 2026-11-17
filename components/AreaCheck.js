"use client";
import { useState } from "react";
import { wa } from "../lib/site";

export default function AreaCheck() {
  const [pin, setPin] = useState("");
  const go = (e) => { e.preventDefault(); window.open(wa(`Hi, do you deliver to pincode ${pin}?`), "_blank", "noopener"); };
  return (
    <form className="check" onSubmit={go}>
      <label htmlFor="pin">Check my area</label>
      <input id="pin" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="6-digit pincode" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
      <button className="btn sm" type="submit">Check on WhatsApp</button>
    </form>
  );
}
