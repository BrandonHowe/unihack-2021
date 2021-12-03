import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../assets/logo.png";
import knowledge from "../../assets/knowledge.png";
import microscope from "../../assets/microscope.png";

function LandingPageModule({ name, image, description, url }: { name: string, url: string, image: string, description: string }) {
    return <div className="landingPageModule">
        <h2 className="landingPageModuleName">{name}</h2>
        <div className="landingPageModuleRow">
            <img src={image} />
            <div className="landingPageModuleDesc">
                <p>{description}</p>
                <Link className="landingPageModuleDescLink" to={url} style={{ textAlign: "right" }}>Check out now</Link>
            </div>
        </div>
    </div>
}

export default function LandingPage() {
    return <div className="landingPage">
        <div className="landingPageLogo">
            <img src={logo} alt="Logo" />
        </div>
        <h5>Discovr what knowledge you are missing and put it all together. No more barriers or secrets. The knowledge tree of the world is in your hands.</h5>
        <div className="landingPageCheckOutButton">Check out our subjects</div>
        <h5>Or check out our modules directly...</h5>
        <div className="landingPageModuleRow">
            <LandingPageModule image={knowledge} name="Mathematics" description="Full curriculum available right now, from Algebra and Geometry to Matrices and Calculus." url="/" />
            <LandingPageModule image={microscope} name="Biology" description="Full curriculum available right now, from environmental biology to full body anatomy." url="/" />
            <LandingPageModule image={knowledge} name="Physics" description="Full curriculum available right now, from kinematics to rotational motion." url="/" />
        </div>
    </div>
}