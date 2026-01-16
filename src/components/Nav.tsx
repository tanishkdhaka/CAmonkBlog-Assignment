
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"

function Nav() {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate('/')} className="p-6 flex justify-between items-center gap-3 border-b-2  ">
            {/* LOGO */}
            <div  className="flex gap-3 items-center justify-center cursor-pointer" >

              <div className="bg-primary rounded-sm px-2 py-1.5">  <img src="/hat.svg" className="h-6 w-6" alt="Logo" /></div>
                <h1 className="text-2xl font-semibold font-serif tracking-wider">CA Monk</h1>
            </div>

            {/* MENU */}

            <div className="flex justify-center items-center gap-6 text-gray-600 font-medium">
            {/* tools practice events jobBoard points */}
                <a href="/" className="cursor-pointer ">Home</a>
                <a href="/" className="cursor-pointer ">Practice</a>
                <a href="/" className="cursor-pointer ">Events</a>
                <a href="/" className="cursor-pointer ">Job Board</a>
                <a href="/" className="cursor-pointer ">Points</a>
            </div>


            {/* Action */}

            <div>
            <Button variant="default"><a href="/createBlog">Create Blog</a></Button>
            </div>





    </div>
  )
}

export default Nav 