
function Footer() {
  return (
    <footer className="bg-amber-50/10 w-screen text-center relative pt-10 pb-10 bottom-0">
             <p className="text-white font-medium">© {new Date().getFullYear()} Rishi. Crafted with <span className="text-red-500">♥</span> and React.</p>
      </footer>
  )
}

export default Footer