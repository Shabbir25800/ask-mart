import React, {useState} from 'react';
import { motion } from 'framer-motion';
export default function Customer(){
  const [loading, setLoading] = useState(false);
  const products = [
    {id:1,title:'Smartphone X', price:14999},
    {id:2,title:'Wireless Earbuds', price:1999}
  ];
  const buy = ()=>{ setLoading(true); setTimeout(()=> setLoading(false), 1600); }
  return (
    <main>
      <section className="hero">
        <motion.h2 initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.6}}>Shop smarter — aSK mart</motion.h2>
        <p>Secure UPI payments, fast delivery, honest pricing.</p>
        <motion.button whileTap={{scale:0.96}} className="cta">Shop Now</motion.button>
      </section>
      <section className="products">
        {products.map(p=> (
          <div key={p.id} className="card">
            <h3>{p.title}</h3>
            <p>₹{p.price}</p>
            <motion.button onClick={buy} whileTap={{scale:0.96}} className="buy">Buy</motion.button>
          </div>
        ))}
      </section>
      {loading && (
        <div className="overlay">
          <motion.div className="modal" initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}}>
            <div className="spinner" />
            <p>Processing payment…</p>
          </motion.div>
        </div>
      )}
    </main>
  )
}
