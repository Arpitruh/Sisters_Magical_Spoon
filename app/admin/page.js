"use client";
import { useEffect, useState } from "react";

const LISTS = { PLANS: ["name", "price", "note"], BOXES: ["name", "price", "items"] };
const api = (m, body) => fetch("/api/admin/content", { method: m, headers: { "Content-Type": "application/json" }, body: body && JSON.stringify(body) });

export default function Admin() {
  const [d, setD] = useState(null);
  const [auth, setAuth] = useState(null);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => { const r = await api("GET"); if (r.ok) { setD(await r.json()); setAuth(true); } else setAuth(false); };
  useEffect(() => { load(); }, []);

  const login = async (e) => {
    e.preventDefault();
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (r.ok) load(); else setMsg((await r.json()).error);
  };
  const save = async () => {
    if (d.GALLERY.some((g) => !g.alt.trim())) return setMsg("Add a short description to every photo.");
    setMsg("Saving...");
    const r = await api("PUT", d);
    setMsg(r.ok ? "Saved. The site is updated." : (await r.json()).error);
  };
  const upload = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    setMsg("Uploading...");
    const fd = new FormData(); fd.append("file", f);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd }); const j = await r.json();
    if (r.ok) { setD({ ...d, GALLERY: [...d.GALLERY, { src: j.url, alt: "" }] }); setMsg("Uploaded. Add a description and save."); } else setMsg(j.error);
    e.target.value = "";
  };
  const set = (k, i, v) => setD({ ...d, [k]: d[k].map((x, j) => (j === i ? v : x)) });
  const del = (k, i) => setD({ ...d, [k]: d[k].filter((_, j) => j !== i) });

  if (auth === null) return <main className="sec">Loading...</main>;
  if (!auth) return (
    <main className="sec">
      <h1>Admin login</h1>
      <form className="check" onSubmit={login}>
        <label htmlFor="pw">Password</label>
        <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
        <button className="btn sm" type="submit">Log in</button>
      </form>
      <p role="alert">{msg}</p>
    </main>
  );

  return (
    <main className="sec admin">
      <h1>Update your website</h1>
      {!d.storage && <p role="alert">Blob storage is not connected, so changes cannot be saved yet. See the README.</p>}

      <h2>Notice banner</h2>
      <p className="muted">Shown at the top of every page. Use it for holidays, closures or offers.</p>
      <label><input type="checkbox" checked={d.NOTICE.on} onChange={(e) => setD({ ...d, NOTICE: { ...d.NOTICE, on: e.target.checked } })} /> Show notice</label>
      <div className="arow"><input aria-label="Notice text" placeholder="Closed on 14 Nov for Diwali. Orders reopen on 16 Nov." maxLength={200} value={d.NOTICE.text} onChange={(e) => setD({ ...d, NOTICE: { ...d.NOTICE, text: e.target.value } })} /></div>
      <div className="arow">
        <label>Show from <input type="date" value={d.NOTICE.from} onChange={(e) => setD({ ...d, NOTICE: { ...d.NOTICE, from: e.target.value } })} /></label>
        <label>Show until <input type="date" value={d.NOTICE.to} onChange={(e) => setD({ ...d, NOTICE: { ...d.NOTICE, to: e.target.value } })} /></label>
      </div>
      <p className="muted">Dates are optional and use India time. Date changes apply within an hour.</p>

      <h2>Weekly menu</h2>
      {d.MENU.map((r, i) => (
        <div className="arow" key={i}>
          <input aria-label="Day" className="s" value={r[0]} onChange={(e) => set("MENU", i, [e.target.value, r[1]])} />
          <input aria-label="Menu" value={r[1]} onChange={(e) => set("MENU", i, [r[0], e.target.value])} />
        </div>
      ))}

      {Object.entries(LISTS).map(([k, fields]) => (
        <section key={k}>
          <h2>{k === "PLANS" ? "Tiffin plans" : "Bulk meal boxes"}</h2>
          {d[k].map((r, i) => (
            <div className="arow" key={i}>
              {fields.map((f) => (<input key={f} aria-label={f} placeholder={f} className={f === "price" ? "s" : ""} value={r[f]} onChange={(e) => set(k, i, { ...r, [f]: e.target.value })} />))}
              <button className="btn ghost sm" onClick={() => del(k, i)}>Remove</button>
            </div>
          ))}
          <button className="btn ghost sm" onClick={() => setD({ ...d, [k]: [...d[k], Object.fromEntries(fields.map((f) => [f, ""]))] })}>Add row</button>
        </section>
      ))}

      <h2>Photos</h2>
      <div className="photos">
        {d.GALLERY.map((g, i) => (
          <figure key={g.src}>
            <img src={g.src} alt={g.alt || "New photo"} />
            <input aria-label="Photo description" placeholder="Describe the photo" value={g.alt} onChange={(e) => set("GALLERY", i, { ...g, alt: e.target.value })} />
            <button className="btn ghost sm" onClick={() => del("GALLERY", i)}>Remove</button>
          </figure>
        ))}
      </div>
      <p><label className="btn sm">Upload photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} hidden /></label></p>

      <p className="stick"><button className="btn" onClick={save}>Save changes</button> <span role="status">{msg}</span></p>
    </main>
  );
}
