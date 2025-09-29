import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-[100vw] h-[100dvh]">
      <nav className="absolute"
        style={{
          top: '15px', left: '15px', background: "#f3f3f3",
          borderRadius: '100vw',
          zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
        }}>
        <div className="w-[15px]"></div>
        <Link className="text-slate-400
         hover:text-slate-100 hover:bg-slate-500
          cursor-pointer px-4 py-2"
          style={{ fontSize: '14px' }} to="/">Home</Link>
        <Link className="text-slate-400
         hover:text-slate-100 hover:bg-slate-500
          cursor-pointer px-4 py-2"
          style={{ fontSize: '14px' }} to="/viewer">Viewer 360</Link>
        <Link className="text-slate-400
         hover:text-slate-100 hover:bg-slate-500
          cursor-pointer px-4 py-2"
          style={{ fontSize: '14px' }} to="/gallery">Gallery</Link>
        <div className="w-[15px]"></div>
      </nav>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;