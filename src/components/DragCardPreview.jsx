import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./DragCard";

export function DraggableCardDemo() {
  const items = [
    {
      title: "HTML",
      image:
        "https://imgs.search.brave.com/9amJBleXPqMl_S8KhXNp-AfRKT-uDn_yKz97NMAPiRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGhpd2lzZS5j/b20vbmV3LWFzc2V0/cy9odG1sLndlYnA_/dz0xMjAwJnE9OTAm/YXV0bz1mb3JtYXQ",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "CSS",
      image:
        "https://imgs.search.brave.com/gw1Io5ERiAK5LkHwbv-V_MJgMAqYVOBj1_s5JFmNhK8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWNzcy1hbHQtbG9n/by1pY29uLXN2Zy1k/b3dubG9hZC1wbmct/Mjk0NDgxMS5wbmc_/Zj13ZWJwJnc9MTI4",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Javascript",
      image:
        "https://imgs.search.brave.com/4t9YQfbfRwsfFFzQUZWfbYl3QzCn-TUGjKCOXIpifr4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L2phdmFzY3JpcHQt/cG5nL2pzLWxvZ28t/cG5nLTUucG5n",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "node.js",
      image:
        "https://imgs.search.brave.com/CnhMVsaOcdNqG9yXJc6reDgL8mWiho0J_ka56dME2II/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI3LzIvbm9kZS1q/cy1sb2dvLXBuZ19z/ZWVrbG9nby0yNzM3/NDkucG5n",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "express.js",
      image:
        "https://imgs.search.brave.com/xQg67AOyd66TA98I_Aj0FNJFjjiWpp2bzn0tG4yPCBI/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9leHByZXNz/LWpzLWljb24tc3Zn/LWRvd25sb2FkLXBu/Zy05MjAwNjcwLnBu/Zz9mPXdlYnAmdz0x/Mjg",
      className: "absolute top-20 right-[35%] w-92  rotate-[2deg]",
    },
    {
      title: "React.js",
      image:
        "https://imgs.search.brave.com/zEJV_fI6CXTLHoqHOAJWUdpFRlwRASyN4W-rYPxo6CM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9w/bGFzdGljaW5lLzEy/MDAvcmVhY3QuanBn",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "mongoDB",
      image:
        "https://imgs.search.brave.com/-UhMAUIB50O8l30_PutSK8abSIm2aki2jgn5ud-rcR4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzEvbW9uZ29k/Yi1pY29uLWxvZ28t/cG5nX3NlZWtsb2dv/LTUwMzI3NC5wbmc",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },{
      title:"python",
      image:"https://imgs.search.brave.com/t9Bar_acPPwiD484z37Fc90Xf-MGHmpn-c6nZYd1AX8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E4L2M5/LzM0L2E4YzkzNGE2/YmQyNDNkZTZlNjNh/YWYwNzJjNjkwMTNj/LmpwZw",
      className : "absolute top-24 left-[45%] rotate-[-7deg]"
    }
  ];
  return (
    <DraggableCardContainer
      className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p
        className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        You spoiled it! Now I will Have to rearrange them!
      </p>
      {items.map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-3xl" />
          <h3
            className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
