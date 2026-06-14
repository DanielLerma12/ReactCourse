import { Link } from "../Link.jsx";

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <p>Hola me llamo Lerma y estoy creando un clon de react router</p>
        <img
          src="https://pbs.twimg.com/profile_images/1978222481774108672/mx0kGZO8_400x400.jpg"
          alt="Foto de lerma"
        />
      </div>
      <Link to="/">Ir a Home</Link>
    </>
  );
}
