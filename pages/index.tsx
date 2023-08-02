import type { NextPage } from "next";
import axios from "axios";


const Home = () => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
       <h1 className="font-bold">Hello world!!!</h1>
    </div>
  );
};

export const getServerSideProps = async () => {
   const response = await axios.get(`http://localhost:3000/api/post`)

   console.log(response.data.name);
   return {
    props: {}
   }
}

export default Home;

